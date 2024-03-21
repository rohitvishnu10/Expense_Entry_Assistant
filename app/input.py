import json
from openai import OpenAI
import time
from thread import thread, client, ASSISTANT_ID
from schemas import  *


def handle_interaction(user_input, thread, client, ASSISTANT_ID, eid=None):
    # Add user's message to the existing thread
    client.beta.threads.messages.create(thread_id=thread.id, role="user", content=user_input)

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
