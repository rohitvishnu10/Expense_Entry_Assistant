from thread import thread,client,ASSISTANT_ID
from openai import OpenAI


import time

 
def handle_interaction(user_input, thread, client, ASSISTANT_ID):
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
    return latest_message.content[0].text.value


