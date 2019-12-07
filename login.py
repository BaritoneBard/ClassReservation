import logging
import getopt
import sys
import pymongo
import json
from bson.json_util import dumps
import datetime
import random

# MongoDB information
# TODO: update to match database as needed
DatabaseURI = "mongodb://127.0.0.1:27017"
DatabaseName = "roomreservedb"
UserCollection = "User"

DEBUG = False # set to "TRUE" to enable debugging mode

def hash_password(name, password):

    return hash(name+password)

def main():

    sessionId = None
    name = None
    password = None

    if DEBUG: print(arg for arg in sys.argv)

    returnMsg = {'status': False}

    options, remainder = getopt.getopt(sys.argv[1:], 'n:p:i', ['name=',
                                                             'password=',
                                                               'session='])

    for opt, arg in options:

        if opt in ('-n', '--name'):
            name = arg

        elif opt in ('-p', '--password'):
            password = arg

        elif opt in ('-i', '--session'):
            sessionId = arg

    try:

        userDocs = userCol.find_one({ 'Password': hash_password(name, password)})

        if userDocs: # update session ID
            sessionId = random.randint(1, 65535)
            userCol.update_one({ 'Name': name}, { "$set": { "SessionToken": sessionId}})
            returnMsg = {'status': True, 'name': name, 'sessionId': sessionId}

    except: # no account with this combination
        print("Invalid username/password combination")

    return json.dumps(returnMsg)
