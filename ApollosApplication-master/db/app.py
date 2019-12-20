# Citation: https://gist.github.com/jslvtr/139cf76db7132b53f2b20c5b6a9fa7ad
# Citation: https://medium.com/python-pandemonium/build-simple-restful-api-with-python-and-flask-part-1-fae9ff66a706
# Citation: https://flask-bcrypt.readthedocs.io/en/latest/
# Citation: https://stackabuse.com/single-page-apps-with-vue-js-and-flask-jwt-authentication/
# Citation: https://github.com/boto/boto3/issues/846
# Citation: https://github.com/ro6ley/flask-drive/blob/master/s3_demo.py

from flask import Flask, request, jsonify, send_file
from flask_bcrypt import Bcrypt
import boto3
from scripts import create_encrypted_user, get_user, get_secret, jwt_auth, update_user, get_user_info, s3
import jwt 
import datetime
from functools import wraps
import os, sys, shutil


bcrypt = Bcrypt()
app = Flask(__name__)
# Setup the Flask-JWT-Extended extension
app.config['SECRET_KEY'] = jwt_auth.generateSK()
UPLOAD_FOLDER = "uploads"
BUCKET = "apollos-user-docs"

def token_required(f):
	@wraps(f)
	def _verify(*args, **kwargs):
		awsCmkId = get_secret.get_secret()
		table = boto3.resource("dynamodb").Table('userInfo')
		auth_headers = request.headers.get('Authorization', '').split()
		print(auth_headers)
		
		invalid_msg = {
            'message': 'Invalid token. Registeration and / or authentication required',
            'authenticated': False
        }
		
		# by convention, length of the Authorization header should be 2 due to structure --> (bearer: token)
		if len(auth_headers) != 2:
			return jsonify(invalid_msg), 401

		# put the token into variable token
		token = auth_headers[1]

		# token corresponds to a user in the database. Get user and return f()
		try:
			# decode the data using secret string and HS256
			secret = app.config['SECRET_KEY']
			data = jwt.decode(token, 'secret', algorithm='HS256') # Expected a string value
			# put decoded username into variable username
			username = data['sub']
			# add_secret_key = add_secret(username)
			# call function to check that token corresponds to specific username in database
			isValid = checkToken(username, token, awsCmkId, table)
			if(isValid == False):
				# token does not correspond to a user in the database. Return error
				return jsonify(invalid_msg), 401
			# if here: token given by user corresponds correctly to user token in database	
			# return to function that called token_required
			return f(username, *args, **kwargs)

		except (jwt.InvalidTokenError, Exception) as e:
			print(e)
			return jsonify(invalid_msg), 401

	return _verify

def checkToken(user, token, awsCmkId, table):
	# search database by user and check that the token that corresponds to it is the same as the given one. Return True or False
	userTokenInDB = get_user_info.fetch_user_info(user, 'AUTH_TOKEN', awsCmkId, table).value.decode("utf-8")
	if(token == userTokenInDB):
		# token given by user matches token in database
		return True
	else:
		# token given by user does not match token in database
		return False


# Functions used to call methods that interact with the database:


@app.route('/')
def hello():
	return "endpoint"

# called to add a user and their information into the database
@app.route('/register', methods=['POST'])
def register():   
	username = str(request.form['USERNAME'])
	password = str(request.form['PASSWORD'])
	first_name = str(request.form['FIRST_NAME'])
	middle_initial = str(request.form['MIDDLE_INITIAL'])
	last_name = str(request.form['LAST_NAME'])
	dob = str(request.form['DOB'])
	sex = str(request.form['SEX'])
	height = str(request.form['HEIGHT'])
	weight = str(request.form['WEIGHT'])	
	allergies = str(request.form['ALLERGIES'])
	try:
		table = boto3.resource("dynamodb").Table('userInfo')
		awsCmkId = get_secret.get_secret() # problem with getting awsCmkId
		userResponse = get_user.fetch_user(username, awsCmkId, table)
		if(userResponse != -1):
			# username already exists in db. Send error message to front end
			return jsonify({'responseCode': 500, 'message': 'Username is taken.'}), 500
		# username does not exist in database. Create entry and send success message to front end
		create_encrypted_user.encrypt_item(username, bcrypt.generate_password_hash(password), first_name, middle_initial, last_name, dob, sex, height, weight, allergies, '', awsCmkId, table)
		return jsonify({'responseCode': 201, 'message': 'User was registered successfully.'}), 201
	except Exception as e:
		return jsonify({'responseCode': 500, 'message': 'User was not registered successfully:' + str(e)}), 500

# called to confirm that a user exists in the database and the given password is correct
@app.route('/login', methods=['POST'])
def login():
	awsCmkId = get_secret.get_secret()
	table = boto3.resource("dynamodb").Table('userInfo')
	username = str(request.form['USERNAME'])
	password = str(request.form['PASSWORD'])
	user = get_user.fetch_user(username, awsCmkId, table)

	if(user == -1):
		# username could not be found in database
		return jsonify({'responseCode': 401, 'message': 'Username does not exist.'}), 401
	# username was found in the database
	user_pass = get_user_info.fetch_user_info(username, 'PASSWORD', awsCmkId, table).value.decode("utf-8")

	if(bcrypt.check_password_hash(user_pass, password)):
		# encode the tokens
		token = jwt.encode({'sub': user['USERNAME'], 'iat':datetime.datetime.utcnow()}, 'secret', algorithm='HS256')
		update_user.add_token(username, token, table)
		return jsonify({'responseCode': 200, 'message': 'Username and password is valid.', 'token': token.decode('UTF-8')}), 200
	else:
		return jsonify({'responseCode': 401, 'message': 'Username or password is incorrect.'}), 401

# any endpoint that requires authorization returns userid and all expect username

# HOW TO NOT UPLOAD LOCALLY
@app.route('/upload', methods=['POST'])
@token_required
def upload(user):
	f = request.files['FILE']
	url = UPLOAD_FOLDER + '/' + str(user)
	fileToStore = f.filename
	os.makedirs(url)
	f.save(os.path.join(url, fileToStore))
	try:
		# add file to s3 bucket with username incorporated into name (because s3 doesn't have folders)
		s3.upload_file(f"uploads/{user + '/' + f.filename}", BUCKET)
		# delete local folder
		shutil.rmtree(url, ignore_errors=True)
		success_message = f.filename + ' has been successfully uploaded!'
		return jsonify({'responseCode': 200, 'message': success_message})
	except Exception as e:
		return e

# @app.route('/download', methods=['POST'])
# @token_required
# def download(user):
# 	filename = str(request.form['FILENAME'])
# 	fileToShow = UPLOAD_FOLDER + '/' + str(user) + '/' + filename
# 	print(fileToShow)
# 	# try:
# 	# 	output = s3.download_file(fileToShow, BUCKET)
# 	# 	return send_file(output, as_attachment=True)
# 	# except Exception as e:
# 	# 	return e

@app.route('/delete', methods=['POST'])
@token_required
def delete(user):
	filename = str(request.form['FILENAME'])
	fileToDelete = str(UPLOAD_FOLDER + '/' + user + '/' + filename)
	try:
		s3.delete_file(fileToDelete, BUCKET)
		success_message = filename + ' has been successfully deleted!'
		return jsonify({'responseCode': 200, 'message': success_message})
	except Exception as e:
		return e

@app.route('/protected', methods=['GET'])
@token_required
def protected(user):
	print("user is: " + str(user))
	current_user = user
	return jsonify(logged_in_as=current_user), 200

if __name__ == '__main__':
	app.run()
