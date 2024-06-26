import uvicorn
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from openai import OpenAI
from fastapi.responses import JSONResponse
from pymongo import MongoClient
from pydantic import BaseModel
from  schemas import *
from bson import ObjectId



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

@app.post("/adminlogin")
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
        expenses_count = expenses_collection.count_documents({"eid": eid, "accepted": "false"})
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
        expenses_count = expenses_collection.count_documents({"eid": eid, "accepted": "false"})
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


@app.get("/department_spending/{aid}")
async def get_department_spending(aid: str):
    #  Retrieve companyid using aid from cadmin collection
    admin_info = admindata.find_one({"aid": aid})
    if not admin_info:
        return {"error": "Admin not found"}

    companyid = admin_info["cid"]

    # Retrieve unique department names for the given companyid
    departments = employeedata.distinct("department", {"companyid": companyid})

    #  Calculate total spending for each department
    department_spending = []
    for department in departments:
        department_expenses = expenses_collection.aggregate([
            {"$match": {"accepted": "true", "eid": {"$in": [employee["eid"] for employee in employeedata.find({"companyid": companyid, "department": department})]}}},
            {"$group": {"_id": "$category", "total_amount": {"$sum": "$amount"}}}
        ])

        department_data = {"department": department}
        for expense in department_expenses:
            department_data[expense["_id"]] = expense["total_amount"]

        department_spending.append(department_data)

    return department_spending

@app.get("/cat_spending/{aid}")
async def get_department_spending(aid: str):
    try:
        # Retrieve companyid using aid from cadmin collection
        admin_info = admindata.find_one({"aid": aid})
        if not admin_info:
            return {"error": "Admin not found"}

        companyid = admin_info["cid"]

        #  Retrieve all employees working under the companyid
        employees = employeedata.find({"companyid": companyid}, {"eid": 1})

        unique_categories = expenses_collection.distinct("category")

        # Calculate category-wise spending for each employee
        category_totals = {category.lower(): 0 for category in unique_categories}
        for employee in employees:
            eid = employee["eid"]
            employee_expenses = expenses_collection.find({"eid": eid, "accepted": "true"})
            for expense in employee_expenses:
                category = expense["category"].lower()
                amount = expense["amount"]
                category_totals[category] += amount

        return category_totals

    except Exception as e:
        return {"error": str(e)}
    

@app.get("/cat_count/{aid}")
async def count_unique_categories(aid: str):
    try:
        # Retrieve admin data using aid
        admin_data = admindata.find_one({"aid": aid})
        if not admin_data:
            raise HTTPException(status_code=404, detail="Admin not found")
        
        # Extract company ID (cid) from admin data
        company_id = admin_data["cid"]
        
        # Find all employees under the company ID
        employees = employeedata.find({"companyid": company_id}, {"eid": 1})
        
        # Initialize a dictionary to store the count of unique categories
        category_count = {}
        
        # Iterate over each employee
        for employee in employees:
            eid = employee["eid"]
            
            # Find expenses for the current employee
            employee_expenses = expenses_collection.find({"eid": eid})
            
            # Iterate over each expense and count unique categories
            for expense in employee_expenses:
                category = expense["category"]
                
                # Increment category count or initialize to 1 if not present
                category_count[category] = category_count.get(category, 0) + 1
        
        return len(category_count)
    
    except Exception as e:
        return {"error": str(e)}
    
@app.get("/cats_bar/{aid}")
async def catsbar(aid: str):
    try:
        # Retrieve admin data using aid
        admin_data = admindata.find_one({"aid": aid})
        if not admin_data:
            raise HTTPException(status_code=404, detail="Admin not found")
        
        # Extract company ID (cid) from admin data
        company_id = admin_data["cid"]
        
        # Find all employees under the company ID
        employees = employeedata.find({"companyid": company_id}, {"eid": 1})
        
        # Initialize a dictionary to store the count of unique categories
        category_count = {}
        
        # Iterate over each employee
        for employee in employees:
            eid = employee["eid"]
            
            # Find expenses for the current employee
            employee_expenses = expenses_collection.find({"eid": eid})
            
            # Iterate over each expense and count unique categories
            for expense in employee_expenses:
                category = expense["category"]
                
                # Increment category count or initialize to 1 if not present
                category_count[category] = category_count.get(category, 0) + 1
        
        return { "categories": list(category_count.keys())}
    
    except Exception as e:
        return {"error": str(e)}


    
@app.get("/pending_requests/{aid}")
async def get_pending_requests(aid: str):
    # Find CID from admin table using AID
    admin_data = admindata.find_one({"aid": aid})
    if not admin_data:
        raise HTTPException(status_code=404, detail="Admin not found")
    cid = admin_data["cid"]

    # Find employees working under CID
    employees = employeedata.find({"companyid": cid})
    employee_emails = [emp["eid"] for emp in employees]

    # Find pending requests for each employee
    pending_requests = []
    for email in employee_emails:
        employee_pending_requests = expenses_collection.find({"eid": email, "accepted": "false"})
        for request in employee_pending_requests:
            # Include all fields from the database
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

    return pending_requests[::-1]

@app.get("/rejected_requests/{aid}")
async def get_rejected_requests(aid: str):
    # Find CID from admin table using AID
    admin_data = admindata.find_one({"aid": aid})
    if not admin_data:
        raise HTTPException(status_code=404, detail="Admin not found")
    cid = admin_data["cid"]

    # Find employees working under CID
    employees = employeedata.find({"companyid": cid})
    employee_emails = [emp["eid"] for emp in employees]

    # Find rejected requests for each employee
    rejected_requests = []
    for email in employee_emails:
        employee_rejected_requests = expenses_collection.find({"eid": email, "accepted": "rejected"})
        for request in employee_rejected_requests:
            # Include all fields from the database
            rejected_requests.append({
                "_id": str(request["_id"]),
                "Employee ID": request["eid"],
                "Status": "Rejected",
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

    return rejected_requests[::-1]

    

@app.get("/accepted_requests/{aid}")
async def get_accepted_requests(aid: str):
    # Find CID from admin table using AID
    admin_data = admindata.find_one({"aid": aid})
    if not admin_data:
        raise HTTPException(status_code=404, detail="Admin not found")
    cid = admin_data["cid"]

    # Find employees working under CID
    employees = employeedata.find({"companyid": cid})
    employee_emails = [emp["eid"] for emp in employees]

    # Find accepted requests for each employee
    accepted_requests = []
    for email in employee_emails:
        employee_accepted_requests = expenses_collection.find({"eid": email, "accepted": "true"})
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

    return accepted_requests[::-1]


@app.put("/approve_request/{request_id}")
async def approve_request(request_id: str):
    try:
        
        request_object_id = ObjectId(request_id)
       
        expenses_collection.update_one({"_id": request_object_id}, {"$set": {"accepted": "true"}})
        return {"message": "Request approved successfully"}
    except Exception as e:
        return {"error": str(e)}
    
@app.put("/reject_request/{request_id}")
async def reject_request(request_id: str):
    try:
        
        request_object_id = ObjectId(request_id)
       
        expenses_collection.update_one({"_id": request_object_id}, {"$set": {"accepted": "rejected"}})
        return {"message": "Request rejected successfully"}
    except Exception as e:
        return {"error": str(e)}
    

    
# @app.get("/get_max_spender/{aid}")
# async def get_max_spender(aid: str):
#     # Fetch corresponding cid from admin table
    
#     admin_doc = admindata.find_one({"aid": aid})
#     if not admin_doc:
#         return {"message": "Admin not found"}

#     cid = admin_doc["cid"]

#     # Find employees working under the cid
    
#     employees = employeedata.find({"companyid": cid})

#     # Calculate total expenses made by each employee where accepted status is true
    
#     expenses = {}
#     for employee in employees:
#         eid = employee["eid"]
#         total_expenses = expenses_collection.aggregate([
#             {"$match": {"eid": eid, "accepted": True}},
#             {"$group": {"_id": "$eid", "total_amount": {"$sum": "$amount"}}}
#         ])
#         total_amount = 0
#         for expense in total_expenses:
#             total_amount = expense["total_amount"]
#         expenses[eid] = total_amount

#     # Find the maximum spender
#     max_spender = max(expenses, key=expenses.get)

#     return {"max_spender": max_spender, "total_expenses": expenses[max_spender]}

# @app.get("/get_min_spender/{aid}")
# async def get_min_spender(aid: str):
#     # Fetch corresponding cid from admin table
    
#     admin_doc = admindata.find_one({"aid": aid})
#     if not admin_doc:
#         return {"message": "Admin not found"}

#     cid = admin_doc["cid"]

#     # Find employees working under the cid
    
#     employees = employeedata.find({"companyid": cid})

#     # Calculate total expenses made by each employee where accepted status is true
    
#     expenses = {}
#     for employee in employees:
#         eid = employee["eid"]
#         total_expenses = expenses_collection.aggregate([
#             {"$match": {"eid": eid, "accepted": True}},
#             {"$group": {"_id": "$eid", "total_amount": {"$sum": "$amount"}}}
#         ])
#         total_amount = 0
#         for expense in total_expenses:
#             total_amount = expense["total_amount"]
#         expenses[eid] = total_amount

#     # Find the minimum spender
#     min_spender = min(expenses, key=expenses.get)

#     return {"min_spender": min_spender, "total_expenses": expenses[min_spender]}
