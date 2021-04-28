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
	#redirect till main until we create the react pages
	return redirect(url_for('main'))

@app.route('/')
def index():
	return redirect(url_for('main'))

@app.route('/main/', methods=['GET'])
def main():
	return I am Main

@app.route('/login/', methods=['GET'])
def login_form():
	pass

def login():
	pass

@app.route('/logout/', methods=['GET'])
def logout():
	pass

@app.route('/profile/', methods=['POST'])
def create_profile():
	pass

@app.route('/status/', methods=['GET'])
def show_HPC_status():
	#showing status of HPC computers
	#should probably handle the reservation requests as well
	pass


