import os
import sys

sys.path.insert(1,'/Users/apalmer/Desktop/Development Studio/WebApps/ReactApplications/React-Project/WebApplications/credit-crunch/back_end/Classes')

from database import Database

# Required third party packages
from flask import Flask, flash, jsonify, redirect, request, session, url_for, abort
import uuid
# from flask_session import Session
import json
import pprint

from random import randint
from datetime import datetime

# Local dependencies
# from sys.path.append('../Classes.database.py') import Database



app = Flask(__name__)

# This function handles user registration and returns a response
@app.route('/api/signup', methods=['POST'])
def user_Signup():
    # Get User's Data
    response = None
    if request.method == 'POST':
        payload = request.get_json(force = True)
        firstName = payload.get('first')
        lastName = payload.get('last')
        email = payload.get('email')
        password = payload.get('password')
        tokenReq = payload.get('returnSecureToken')
        # Create User's GUID
        user_GUID = str(uuid.uuid4())

        # Initialize Database
        db = Database()

        #Validate (Check if user's email is already in use)
        validate_UserEmai = user_EmailValidate(email)

        if validate_UserEmai:
            response = 'Email already exists'
            return response

        else:
            # Add User's Data To The Database
            query = ("INSERT INTO Users(user_firstName, user_lastName, user_email, user_password, user_GUID, user_status) VALUES (%s, %s, %s, %s, %s, %s)")

            # Error with entering Guid in database
            data = (firstName, lastName, email, password, user_GUID, 'A')
        
            # Database Response Message 
            db_response = db.inputToDatabase(query, data)
            
            print(db_response)

            # Grab the user_ID that the user receives
            user_Id = get_UserId(email)

            # Create User's Token To Return
            if tokenReq == True:
                #UUID 5 takes 2 arguments namespace dns and the string u want to hash
                user_token = str(uuid.uuid5(uuid.NAMESPACE_DNS, email))

            # Client Response Information
            responseData = {
                'token': user_token,
                'message': db_response,
                'result': 'User added Successfully',
                'localId': user_Id,
                'expiresIn': 900
            }

            response = json.dumps(responseData, default=str)
             
    return response

# This function handles user logins and returns a response
@app.route('/api/login', methods=['POST'])
def user_Login():
    # Get User's Data
    response = None
    if request.method == 'POST':
        payload = request.get_json(force = True)
        email = payload.get('email')
        password = payload.get('password')
        tokenReq = payload.get('returnSecureToken')

        check_UserExsist = user_EmailValidate(email)
        if not check_UserExsist:
            response = "Some of your information isn't correct. Please try again."

        elif check_UserExsist:
            user_Info = get_UserInfo(email)
            if user_Info[4] != password:
                response = "Some of your information isn't correct. Please try again."
            else:
                # Create User's Token To Return
                if tokenReq == True:
                    #UUID 5 takes 2 arguments namespace dns and the string u want to hash
                    user_token = str(uuid.uuid5(uuid.NAMESPACE_DNS, email))

            # Client Response Information
            responseData = {
                'token': user_token,
                'result': 'User Logged in Successfully',
                'localId': user_Info[0],
                'expiresIn': 900
            }
            response = json.dumps(responseData, default=str)

    return response

# This function checks to see if User's email is already in use
def user_EmailValidate(email):
    db = Database()

    # Check If User Already Exsist
    validate_userQuery = ('SELECT * FROM Users WHERE user_email = "{}"').format(email)
   
    validate_user = db.selectOneFromDatabase(validate_userQuery)
    
    #Test to see if user exsist 
    userExsist = None

    # Return true if user already has the email in database
    if validate_user[0] is not None:
        userExsist = True

    # Return false if email is not being used in database
    elif validate_user[0] is None:
        userExsist = False

    return userExsist
        
# This function checks to see if User's email is already in use and returns the userId
def get_UserId(email):
    db = Database()

    # Check If User Already Exsist
    validate_userQuery = ('SELECT * FROM Users WHERE user_email = "{}"').format(email)
   
    validate_user = db.selectOneFromDatabase(validate_userQuery)
    
    #Test to see if user exsist 
    userId = validate_user[0][0]

    return userId

# This function returns the users information
def get_UserInfo(email):
    db = Database()

    # Check If User Already Exsist
    validate_UserQuery = ('SELECT * FROM Users WHERE user_email = "{}"').format(email)

    validate_User = db.selectOneFromDatabase(validate_UserQuery)

     #Test to see if user exsist 
    userId = validate_User[0]

    return userId

###################------POST METHODS To Get users info on Page load-----###################
@app.route('/income', methods=['POST'])
def get_Income():
    if request.method == 'POST':
        payload = request.get_json(force = True)
        user_Id = payload

    db = Database()

    responseRecurrData = [
        {
            'Id' : 1,
            'Description': 'Add Insurance',
            'Category': 'Income',
            'Current_Amount': '150.50',
            'Current_Goal': '3000.00',
            'Status': 'Active',
            'Recurrence': 'Daily',
            'Start': '',
            'End': ''
        }, 
        {
            'Id' : 2,
            'Description': 'Salary',
            'Category': 'Income',
            'Current_Amount': '560.50',
            'Current_Goal': '3000.00',
            'Status': 'Active',
            'Recurrence': 'Monthly',
            'Start': '',
            'End': ''
        }, 
        {
            'Id' : 55,
            'Description': 'Salary',
            'Category': 'Income',
            'Current_Amount': '10000.00',
            'Current_Goal': '10000.00',
            'Status': 'Completed',
            'Recurrence': 'Monthly',
            'Start': '',
            'End': ''
        }
    ]

    responseData = [
        { 'Income': 
            [
                {
                    'Description': 'Lorem Ipsum',
                    'Amount': '1750.39',
                    'Currency': 'USD',
                    'Category': 'Income',
                    'Date' : '01-Mar-21'
                },
                {  
                    'Description': 'Payment',
                    'Amount': '2.00',
                    'Currency': 'USD',
                    'Category': 'Income',
                    'Date' : '03-Mar-21'
                },
                { 
                    'Description': 'Sales',
                    'Amount': '80.00',
                    'Currency': 'USD',
                    'Category': 'Income',
                    'Date' : '15-Mar-21'
                },
                {
                    'Description': 'Sales',
                    'Amount': '80.00',
                    'Currency': 'USD',
                    'Category': 'Income',
                    'Date' : '29-Mar-21'
                },
                {
                    'Description': 'Sales',
                    'Amount': '2500.00',
                    'Currency': 'USD',
                    'Category': 'Income',
                    'Date' : '29-Mar-21'
                },
                {
                    'Description': 'Sales',
                    'Amount': '150.60',
                    'Currency': 'USD',
                    'Category': 'Income',
                    'Date' : '29-Mar-21'
                }
            ]
        },
        {
            'Recurrence': responseRecurrData
        }
        
    ]

    # print(responseData)

    incomeResponse = json.dumps(responseData, default=str)
    pprint.pprint(incomeResponse)
    # ['Salary', '1500.00', 'USD', 'Income'],['Payment', '2.00','CAD','Income']

    return incomeResponse

@app.route('/transactionAdded', methods=['POST'])
def add_Transaction():
    # Information is pull from the gathered from the front end
    if request.method == 'POST':
        payload = request.get_json(force = True)
        description = payload['description']
        currency = payload['currency']
        amount = payload['amount']
        category = payload['category']
        userId = payload['userId']

        print(payload)
        print(description)
        
    # Initalizing the Database
    db = Database()

    # Build the SQL query for inserting the data in the database
    query = """ INSERT INTO {category} (user_GUID, {category_lowered}_name, {category_lowered}_amount, {category_lowered}_currency, {category_lowered}_status) VALUES (%s, %s, %s, %s, 'A') """.format(category = category, category_lowered = category.lower())
    
    #Storing the data in a list
    data = (userId, description, amount, currency)
   
    # Calling the method that inputs elements into database and return the results to the user.This takes two arguments the query and the data itself.
    results = db.inputToDatabase(query, data)

    print(results)

    return 'hello'



if __name__ == '__main__':
    app.run(debug=True)