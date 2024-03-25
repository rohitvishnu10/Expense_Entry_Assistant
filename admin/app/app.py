import uvicorn
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from openai import OpenAI
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

class LoginRequest(BaseModel):
    username: str
    password: str

@app.post("/login")
def login(login_request:LoginRequest):
    global eid
    data=admindata.find_one({"aid":login_request.username})
    if data is None:
        raise HTTPException(status_code=401, detail="User not found")
    if data["pwd"]==login_request.password:
        eid=login_request.username
        return {"success":True}
    raise HTTPException(status_code=401, detail="Invalid credentials")

@app.get("/employees_count/{aid}")
async def get_employees_count(aid: str):
    # Querying the cadmin collection to find the cid for the given aid
    admin_info = admindata.find_one({"aid": aid})
    if admin_info is None:
        raise HTTPException(status_code=404, detail="Admin not found")

    cid = admin_info["cid"]

    # Counting the number of employees with the fetched cid inside the employee table
    employees_count = employeedata.count_documents({"companyid": cid})

    return { "employees_count": employees_count}

@app.get("/expenses_count/{aid}")
async def get_expenses_count(aid: str):
    # Querying the cadmin collection to find the cid for the given aid
    admin_info = admindata.find_one({"aid": aid})
    if admin_info is None:
        raise HTTPException(status_code=404, detail="Admin not found")

    cid = admin_info["cid"]

    # Querying the employee collection to find eids associated with the cid
    eids = [emp["eid"] for emp in employeedata.find({"companyid": cid}, {"eid": 1, "_id": 0})]

    expenses_count_per_eid = {}
    for eid in eids:
        # Counting the number of expenses with the fetched eid where accepted is false
        expenses_count = expenses_collection.count_documents({"eid": eid, "accepted": False})
        expenses_count_per_eid[eid] = expenses_count

    return {"expenses_count_per_eid": expenses_count_per_eid}

@app.get("/total_expenses_count/{aid}")
async def get_total_expenses_count(aid: str):
    # Querying the cadmin collection to find the cid for the given aid
    admin_info = admindata.find_one({"aid": aid})
    if admin_info is None:
        raise HTTPException(status_code=404, detail="Admin not found")

    cid = admin_info["cid"]

    # Querying the employee collection to find eids associated with the cid
    eids = [emp["eid"] for emp in employeedata.find({"companyid": cid}, {"eid": 1, "_id": 0})]

    total_expenses_count = 0
    for eid in eids:
        # Counting the number of expenses with the fetched eid where accepted is false
        expenses_count = expenses_collection.count_documents({"eid": eid, "accepted": False})
        total_expenses_count += expenses_count

    return {"total_expenses_count": total_expenses_count}

@app.post("/add_employee/")
async def add_employee(eid: str, ename: str,pwd: str, department: str,aid:str):
    # Check if the employee with the provided eid already exists
    existing_employee = employeedata.find_one({"eid": eid})
    if existing_employee:
        raise HTTPException(status_code=400, detail="Employee with the provided eid already exists.")

    cdata=admindata.find_one({"aid": aid})
    cid=cdata["cid"]
    # Define the employee document
    employee_document = {
        "eid": eid,
        "ename": ename,
        "companyid": cid,
        "pwd": pwd,
        "department": department
    }

    # Insert the employee document into the collection
    employeedata.insert_one(employee_document)

    return {"message": "Employee added successfully."}
