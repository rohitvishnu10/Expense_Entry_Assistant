from pymongo import MongoClient

connection_str = "mongodb://localhost:27017"
dbclient = MongoClient(connection_str)
empdatabase = dbclient["expensetracker"]
employeedata = empdatabase["employee"]  # to store employee data
expenses_collection=empdatabase["expenses"]
admindata=empdatabase["cadmin"]