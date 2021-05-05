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

def validate(d, keys):
    for k in keys:
        if k not in d:
            raise Exception('{} does not contain key "{}"'.format(d,k))

@app.route('/')
def index():
    return render_template('site.html')


@app.route('/main/', methods=['GET'])
def main():
	#present all HPC info to user
	return 'yo work'

@app.route('/api/login/', methods=['POST'])
def api_login():
	
	profile = Profile.query.filter_by(username.request.form['username']).first()

	if profile and profile.password == request.form['password']:
		session['id'] = profile.id
		return 'ok'
   # try:
    #    print(request.form)
     #   validate(request.form, ['username', 'password'])
      #  u, p = request.form['username'], request.form['password']
       # if u == 'conner' and p == 'b':
        #    session['username'] = u
        #    return 'ok'
       # else:
       #     return 'fail'
   # except Exception as e:
   #     return str(e), 400



@app.route('/api/register/', methods=['POST'])
def api_register():
	#this is where all the database shit will take place
	username = request.form['username']
	password = request.form['password']
	
	if username == '' or password == '':
		return 'fail'
	if db.session.query(Profile.id).filter_by(username=username).first() is not None:
		return 'fail'
	else:
		profile = Profile(username=username, password=password)
		db.session.add(profile)
		db.session.commit()
		return 'ok'

@app.route('/api/home/', methods=['GET'])
def api_home():
    try:
        validate(session, ['username'])
        return jsonify(['Peter eater', 'gooch goblin'])
    except Exception as e:
        return 'Not authenicated', 403


