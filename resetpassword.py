import logging
import getopt
import sys
import pymongo
import json
from bson.json_util import dumps
import datetime
import random
import bcrypt
import smtplib

from string import Template
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

MY_ADDRESS = 'classreserveproject@gmail.com'
MY_PASSWORD = 'COMP5130'
HOST = 'smtp.gmail.com'
PORT = 587
# MongoDB information
# TODO: update to match database as needed
DatabaseURI = "mongodb://127.0.0.1:27017"
DatabaseName = "roomreservedb"
UserCollection = "User"

DEBUG = False # set to "TRUE" to enable debugging mode

# returns a random password of length 8
def random_password():

    return ''.join(random.SystemRandom().choice(string.ascii_uppercase + string.digits) for _ in range(8))

# TODO: ensure this hashes the *same way* as login/signup (this is CRUCIAL)
def hash_password(name, password):

    salt = bcrypt.gensalt()
    hashed = bcrypt.hashpw(str.encode(name+password), salt)

    return hashed

def read_template(filename):
    """
    Returns a Template object comprising the contents of the 
    file specified by filename.
    """
    
    with open(filename, 'r', encoding='utf-8') as template_file:
        template_file_content = template_file.read()
    return Template(template_file_content)

# sends an email to the provided address, containing a message providing the new password
def send_reset_email(email, password):

    # first, create an SMTP host to send the email with
    s = smtplib.SMTP(host=HOST, port=PORT)
    s.starttls()
    s.login(MY_ADDRESS, MY_PASSWORD)

    # TODO: create email template in reset_password.txt
    # next, create the message, using a pre-generated template in a txt file
    message_template = read_template('reset_password.txt')
    message = message_template.substitute(newpassword=password)
    msg = MIMEMultipart()

    if DEBUG: print(message)

    # then we put the email together and send it
    msg['From'] = MY_ADDRESS
    msg['To'] = email
    msg['Subject'] = 'Reset Password'
    msg.attach(MIMEText(message, 'plain'))
    s.send_message(msg)

    # lastly, clean up
    del msg
    s.quit()
    

def main():

    sessionId = None
    email = None

    if DEBUG: print(arg for arg in sys.argv)

    returnMsg = {'status': False}

    options, remainder = getopt.getopt(sys.argv[1:], 'e:i', ['email=',
                                                               'session='])

    for opt, arg in options:

        if opt in ('-e', '--email'):
            email = arg

        elif opt in ('-i', '--session'):
            sessionId = arg

    try:

        userDocs = userCol.find_one({ 'Email': email})

        if userDocs: # set new password
            password = random_password()
            send_reset_email(email, password)
            userCol.update_one({ 'Email': email}, {'$set': {'password': hash_password(userDocs.get('Name')+password)}})
            returnMsg = {'status': True, 'email': email, 'sessionId': sessionId}

    except: # no account with this email address
        print("No account found with this email address")

    return json.dumps(returnMsg)
