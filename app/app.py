import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from openai import OpenAI
from input import handle_interaction
from thread import thread,client,ASSISTANT_ID
from fastapi.responses import JSONResponse
app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/", tags=["test"])
def greet():
    return {"hello": "world"}


@app.post("/userchatinput")
def get_input(user_input: dict):
    l = list(user_input.values())
    print("Received input:", str(l[0]))
    user = str(l[0])
    response = handle_interaction(str(l[0]), thread, client, ASSISTANT_ID)
    return JSONResponse(content={"response": response})











