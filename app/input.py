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

    return user_input

def handle_interaction(user_input, thread, client, ASSISTANT_ID, eid=None):
    new_parse = parse_date_expressions(user_input)
    #new_parse=add_day_to_parsed_input(parsed_input)
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

        #expenses_dict = json.loads(json_part)  # Convert JSON string to dictionary
        #expenses_collection.insert_one(expenses_dict)  # Insert into MongoDB

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
