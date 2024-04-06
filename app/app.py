# import uvicorn
# from fastapi import FastAPI, HTTPException
# from fastapi.middleware.cors import CORSMiddleware
# from openai import OpenAI
# from input import handle_interaction,passresponse
# from thread import thread, client, ASSISTANT_ID
# from fastapi.responses import JSONResponse
# from pymongo import MongoClient
# from pydantic import BaseModel
# from  schemas import *


# app = FastAPI()


# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# eid="null"
# @app.get("/", tags=["test"])
# def greet():
#     return {"hello": "world"}


# @app.post("/userchatinput/{eid}")
# def get_input(user_input: dict, eid: str):
#     l = list(user_input.values())
#     print("Received input:", str(l[0]))
#     user = str(l[0])
#     response = handle_interaction(str(l[0]), thread, client, ASSISTANT_ID, eid=eid)
#     return JSONResponse(content={"response": response})


# class LoginRequest(BaseModel):
#     username: str
#     password: str


# @app.post("/login")
# def login(login_request: LoginRequest):
#     global eid
#     data = employeedata.find_one({"eid": login_request.username})
#     if data is None:
#         raise HTTPException(status_code=401, detail="User not found")
#     if data["pwd"] == login_request.password:
#         eid=login_request.username
#         return {"success": True}
#     raise HTTPException(status_code=401, detail="Invalid credentials")



# @app.get("/accepted_requests/{eid}")
# async def get_accepted_requests(eid: str):
#     # Find accepted requests for the given employee ID
#     employee_accepted_requests = expenses_collection.find({"eid": eid, "accepted": True})
    
#     accepted_requests = []
#     for request in employee_accepted_requests:
#         accepted_requests.append({
#             "_id": str(request["_id"]),
#             "Employee ID": request["eid"],
#             "Status": "Accepted",
#             "Date": request["date"],
#             "Category": request["category"],
#             "category": request["category"],
#             "location": request["location"],
#             "city": request["city"],
#             "amount": request["amount"],
#             "date": request["date"],
#             "day": request["day"],
#             "purpose": request["purpose"],
#             "accepted": request["accepted"],
#             "eid": request["eid"]
#         })

#     return accepted_requests

# from fastapi import HTTPException

# @app.get("/pending_requests/{eid}")
# async def get_pending_requests(eid: str):
#     # Find pending requests for the given employee ID
#     employee_pending_requests = expenses_collection.find({"eid": eid, "accepted": False})
    
#     pending_requests = []
#     for request in employee_pending_requests:
#         pending_requests.append({
#             "_id": str(request["_id"]),
#             "Employee ID": request["eid"],
#             "Status": "Pending",
#             "Date": request["date"],
#             "Category": request["category"],
#             "category": request["category"],
#             "location": request["location"],
#             "city": request["city"],
#             "amount": request["amount"],
#             "date": request["date"],
#             "day": request["day"],
#             "purpose": request["purpose"],
#             "accepted": request["accepted"],
#             "eid": request["eid"]
#         })

#     return pending_requests

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


@app.post("/userchatinput/{eid}")
def get_input(user_input: dict, eid: str):
    l = list(user_input.values())
    print("Received input:", str(l[0]))
    user = str(l[0])
    response = handle_interaction(str(l[0]), thread, client, ASSISTANT_ID, eid=eid)
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



@app.get("/accepted_requests/{eid}")
async def get_accepted_requests(eid: str):
    # Find accepted requests for the given employee ID
    employee_accepted_requests = expenses_collection.find({"eid": eid, "accepted": "true"})
    
    accepted_requests = []
    for request in employee_accepted_requests:
        accepted_requests.append({
            "_id": str(request["_id"]),
            "Employee ID": request["eid"],
            "Status": "Accepted",
            "Date": request["date"],
            "Category": request["category"],
            "category": request["category"],
            "location": request["location"],
            "city": request["city"],
            "amount": request["amount"],
            "date": request["date"],
            "purpose": request["purpose"],
            "accepted": request["accepted"],
            "eid": request["eid"]
        })

    return accepted_requests

from fastapi import HTTPException

@app.get("/pending_requests/{eid}")
async def get_pending_requests(eid: str):
    # Find pending requests for the given employee ID
    employee_pending_requests = expenses_collection.find({"eid": eid, "accepted": "false"})
    
    pending_requests = []
    for request in employee_pending_requests:
        pending_requests.append({
            "_id": str(request["_id"]),
            "Employee ID": request["eid"],
            "Status": "Pending",
            "Date": request["date"],
            "Category": request["category"],
            "category": request["category"],
            "location": request["location"],
            "city": request["city"],
            "amount": request["amount"],
            "date": request["date"],
            "purpose": request["purpose"],
            "accepted": request["accepted"],
            "eid": request["eid"]
        })

    return pending_requests

@app.get("/rejected_requests/{eid}")
async def get_pending_requests(eid: str):
    # Find pending requests for the given employee ID
    employee_rejected_requests = expenses_collection.find({"eid": eid, "accepted": "rejected"})
    
    rejected_requests = []
    for request in employee_rejected_requests:
        rejected_requests.append({
            "_id": str(request["_id"]),
            "Employee ID": request["eid"],
            "Status": "Pending",
            "Date": request["date"],
            "Category": request["category"],
            "category": request["category"],
            "location": request["location"],
            "city": request["city"],
            "amount": request["amount"],
            "date": request["date"],
            "purpose": request["purpose"],
            "accepted": request["accepted"],
            "eid": request["eid"]
        })

    return rejected_requests


@app.get("/last_expenses/{eid}")
async def get_last_expenses(eid: str):
    try:
        expenses = expenses_collection.find({"eid": eid})
        
        last_expenses = []
        for expense in expenses:
            last_expenses.append({
                "_id": str(expense["_id"]),
                "category": expense["category"],
                "location": expense["location"],
                "city": expense["city"],
                "amount": expense["amount"],
                "date": expense["date"],
                "purpose": expense["purpose"],
                "eid": expense["eid"],
                "accepted": expense.get("accepted", None)
            })
        
        return last_expenses[-5:][::-1]  
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))