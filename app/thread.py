from openai import OpenAI

# Enter your Assistant ID here.
ASSISTANT_ID = "asst_xUFTSLQfNd4xexpw1SlVLEta"

# Make sure your API key is set as an environment variable.
client = OpenAI(api_key="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")

# Create a thread
thread = client.beta.threads.create()