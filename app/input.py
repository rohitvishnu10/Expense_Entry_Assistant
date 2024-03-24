import json
from openai import OpenAI
import time
from thread import thread, client, ASSISTANT_ID
from schemas import  *
import dateutil.parser
import datetime
import re
from dateutil.relativedelta import relativedelta

def parse_date_expressions(user_input):
    # Regular expression pattern to match relative date expressions like "X days/weeks/months/years back"
    relative_date_pattern = r"(\d+)\s+(day|week|month|year)s?\s+back"

    # Search for relative date expressions in the input
    match = re.search(relative_date_pattern, user_input)
    if match:
        # Extract the numerical value and the unit of time
        value = int(match.group(1))
        unit = match.group(2)

        # Calculate the date based on the relative expression
        if unit == "day":
            parsed_date = datetime.datetime.now() - relativedelta(days=value)
        elif unit == "week":
            parsed_date = datetime.datetime.now() - relativedelta(weeks=value)
        elif unit == "month":
            parsed_date = datetime.datetime.now() - relativedelta(months=value)
        elif unit == "year":
            parsed_date = datetime.datetime.now() - relativedelta(years=value)

        # Convert parsed date to string in dd-mm-yyyy format
        parsed_input = parsed_date.strftime("%d-%m-%Y")

        # Replace the relative date expression with the parsed date in the input
        user_input = re.sub(relative_date_pattern, parsed_input, user_input)

    # Handle "yesterday" and "today" expressions
    if "yesterday" in user_input:
        parsed_date = datetime.datetime.now() - relativedelta(days=1)
        parsed_input = parsed_date.strftime("%d-%m-%Y")
        user_input = user_input.replace("yesterday", parsed_input)
    elif "today" in user_input:
        parsed_date = datetime.datetime.now()
        parsed_input = parsed_date.strftime("%d-%m-%Y")
        user_input = user_input.replace("today", parsed_input)

    # Parse natural language date expressions
    try:
        # Handle date expressions like "9th Jan 2023" and convert them to "9-01-2023"
        user_input = re.sub(r"(\d+)(st|nd|rd|th)\s+(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+(\d{4})", r"\1-\3-\4", user_input)

        parsed_date = dateutil.parser.parse(user_input, fuzzy=True)
        # Convert parsed date to string in dd-mm-yyyy format
        parsed_input = parsed_date.strftime("%d-%m-%Y")
    except ValueError:
        # If parsing fails, return the original input
        parsed_input = user_input

    return parsed_input


def add_day_to_parsed_input(parsed_input):
    # Define a list of days of the week
    days_of_week = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

    # Define a regular expression pattern to match dates in the format dd-mm-yyyy
    date_pattern = r"\b\d{1,2}-\d{1,2}-\d{4}\b"

    # Find all occurrences of dates in the parsed input
    dates_found = re.findall(date_pattern, parsed_input)

    # Iterate through each date found
    for date_str in dates_found:
        # Parse the date string
        parsed_date = dateutil.parser.parse(date_str, dayfirst=True)

        # Get the day of the week from the parsed date
        day_of_week = days_of_week[parsed_date.weekday()]

        # Construct the new string with the day of the week added
        updated_date_str = f"{date_str} on {day_of_week}"

        # Replace the date in the parsed input with the updated date string
        parsed_input = parsed_input.replace(date_str, updated_date_str)

    return parsed_input


def handle_interaction(user_input, thread, client, ASSISTANT_ID, eid=None):
    parsed_input = parse_date_expressions(user_input)
    new_parse=add_day_to_parsed_input(parsed_input)
    # Add user's message to the existing thread
    client.beta.threads.messages.create(thread_id=thread.id, role="user", content=new_parse)

    # Submit the thread to the assistant (as a new run).
    run = client.beta.threads.runs.create(thread_id=thread.id, assistant_id=ASSISTANT_ID)

    # Wait for run to complete.
    while run.status != "completed":
        run = client.beta.threads.runs.retrieve(thread_id=thread.id, run_id=run.id)
        time.sleep(1)

    # Get the latest message from the thread.
    message_response = client.beta.threads.messages.list(thread_id=thread.id)
    messages = message_response.data

    # Print the chatbot response.
    latest_message = messages[0]
    chatbot_response = latest_message.content[0].text.value

    # Extract JSON part from chatbot response
    json_part=""
    json_start = chatbot_response.find("{")
    if json_start != -1:
        json_end = chatbot_response.rfind("}")
        json_part = chatbot_response[json_start:json_end + 1]
        print(json_part)

        # Modify the JSON part to add eid attribute
        if eid is not None:
            expenses = json.loads(json_part)["expenses"]
            for expense in expenses:
                expense["eid"] = eid
                expenses_collection.insert_one(expense)  # Insert each expense item individually

        expenses_dict = json.loads(json_part)  # Convert JSON string to dictionary
        expenses_collection.insert_one(expenses_dict)  # Insert into MongoDB

    chatbot_response = chatbot_response.replace("JSON Format:", "")
    chatbot_response = chatbot_response.replace(json_part, "")
    print(chatbot_response)
    print(new_parse)
    return chatbot_response


def passresponse(json_part):
    return json_part
# Usage example:
# while True:
#     user_input = input("User: ")  # Prompting user for input
#     if not user_input:
#         break
#
#     response = handle_interaction(user_input, thread, client, ASSISTANT_ID)
#     print(response)
