# Don't call this flask.py!
# Documentation for Flask can be found at:
# https://flask.palletsprojects.com/en/1.1.x/quickstart/

from flask import Flask, render_template, request, session, redirect, url_for, jsonify, abort
from flask_sqlalchemy import SQLAlchemy
import os 

app = Flask(__name__)
app.secret_key = b'REPLACE_ME_x#pi*CO0@^z'

sqlite_uri = 'sqlite:///' + os.path.abspath(os.path.curdir) + '/test.db'
app.config['SQLALCHEMY_DATABASE_URI'] = sqlite_uri
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

from models import User


@app.before_request
def login_check():
	return render_template('site.html')

@app.route('/')
def index():
	return redirect(url_for('main'))

@app.route('/main/', methods=['GET'])
def main():
	#present all HPC info to user
	return 'yo work'

def validate(d, keys):
	for k in keys:
		if k not in d:
			raise Exception('{} does not contain key "{}"'.format(d,k))

@app.route('/api/register/', methods=['POST'])
def api_register():
	#this is where all the database shit will take place
	pass

@app.route('/api/login/', methods=['POST'])
def api_login():
	#fetch from database and get user, basic checks for correct credientials
	#if no account made a redirect to register
	try:
		print(request.form)
		validate(request.form, ['username', 'password'])
		u, p = request.form['username'], request.form['password']
		if u == 'conner' and p == 'b':
			session['username'] = u
			return 'ok'
		else:
			return 'fail'	
	except Exception as e:
		return str(e), 400

@app.route('/api/users/', methods=['GET'])
def api_users():
	try: 
		validate(session, ['username'])
		return jsonify(['This does in fact work this way'])
	except Exception as e:
		return 'Not authd', 403
