# ClassReservation

Note that the code in this repo has not been tested, as I had difficulty with installing and using some of the software. However, it should work as intended, following the outline Danny described in his email.

signup.py takes the options name, session, password, group, email, and gmail; password should be the plaintext password that the user entered as their new password. This value is **not** stored by the script; instead, the value stored will be a hashed password, by calling hash(name+password). If the username is already taken, the script will detect this and print a message explaining this, and then return. Otherwise, it updates the session ID to a random value between 1 and (2^16 - 1), creates a new entry for the user with this ID, and returns an HTLM message with the name, ID, and status "true".

login.py takes the options name, password, and session; again, password should be the plaintext password entered by the user, and will **not** be stored by the script. The script immediately queries the user collection, searching for a user with a Password field that matches hash(name+password), and if it fails to find one it prints a message stating the name/password combination is invalid. If it does find one, it creates a random new session ID between 1 and (2^16 - 1), updates the user's SessionToken field to match this, and returns the HTML message with the name, new session ID, and status "true".
