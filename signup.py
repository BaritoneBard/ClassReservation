import logging
import getopt
import sys
import pymongo
import json
from bson.json_util import dumps
import datetime
import random

# MongoDB information
#TODO: update to match database as needed
DatabaseURI = "mongodb://127.0.0.1:27017"
DatabaseName = "roomreservedb"
UserCollection = "User"

DEBUG = False # set to "TRUE" to enable debugging mode, prints additional info

def hash_password(name, password):
    # TODO: write this function, find suitable hash

    return hash(name+password)

def main():

    sessionId = None
    name = None
    password = None
    group = None
    email = None
    gmail = None 

    if DEBUG: print(arg for arg in sys.argv)

    returnMsg = {'status': False}

    # NOTE: add -x and --gmail to below to include gmail field
    options, remainder = getopt.getopt(sys.argv[1:], 'n:i:p:g:e', ['name=',
                                                                   'session=',
                                                                   'password=',
                                                                   'group=',
                                                                   'email='
                                                                   ])

    for opt, arg in options:

        if opt in ('-n', '--name'):
            name = arg

        elif opt in ('-i', '--session'):
            sessionId = arg

        elif opt in ('-p', '--password'):
            password = arg

        elif opt in ('-g', '--group'):
            group = arg

        elif opt in ('-e', '--email'):
            email = arg

        
         elif opt in ('-x', '--gmail'):
             gmail = arg

    # connect to database
    client = pymongo.MongoClient(DatabaseURI)
    dbObj = client[DatabaseName]
    userCol = dbObj[UserCollection]
    hashCol = dbObj[HashCollection]

    # check whether user already exists
    try:

        userDocs = userCol.find_one({ 'Name': name })

        if userDocs: 

            print("username is already in use!")
            if DEBUG: print(str(name))
            return json.dumps(returnMsg)

        elif DEBUG: print("username available")

        # requires special authentication for groups "faculty" and "reserve"
        if group in ["Faculty", "Reserve"]:

            # TODO: implement authentication check for adding users with reserve perms

            group = group

        else:

            group = "Student" # any invalid group types default to Student

        # if we make it this far, username is available

        # first, update the session to a new ID
        sessionId = random.randint(1, 65535)
        dbObj.runCommand({startSession: sessionId}) # TODO: make sure this is the correct way to increment session ID

        # next, create the credentials for the new user account
        hashed_password = hash_password(name, password)
        user = {'Name': name,
                'Password': hashed_password,
                'Group': group,
                'Email': email,
                'Gmail': gmail,
                'SessionToken': sessionId}

        hashCol.insert_one(hashed_user)
        userCol.insert_one(user)

        returnMsg = {'status': True, 'name': name, 'sessionId': sessionId}

    except:
        print("An error has occurred.")

    return json.dumps(returnMsg)
