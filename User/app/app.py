import uvicorn
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from openai import OpenAI
from input import handle_interaction,passresponse
from thread import thread, client, ASSISTANT_ID
from fastapi.responses import JSONResponse
from pymongo import MongoClient
from pydantic import BaseModel
from  schemas import *


app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

eid="null"
@app.get("/", tags=["test"])
def greet():
    return {"hello": "world"}


@app.post("/userchatinput")
def get_input(user_input: dict):
    l = list(user_input.values())
    print("Received input:", str(l[0]))
    user = str(l[0])
    response = handle_interaction(str(l[0]), thread, client, ASSISTANT_ID,eid=eid)
    return JSONResponse(content={"response": response})


class LoginRequest(BaseModel):
    username: str
    password: str


@app.post("/login")
def login(login_request: LoginRequest):
    global eid
    data = employeedata.find_one({"eid": login_request.username})
    if data is None:
        raise HTTPException(status_code=401, detail="User not found")
    if data["pwd"] == login_request.password:
        eid=login_request.username
        return {"success": True}
    raise HTTPException(status_code=401, detail="Invalid credentials")



