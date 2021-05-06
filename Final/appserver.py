# Don't call this flask.py!
# Documentation for Flask can be found at:
# https://flask.palletsprojects.com/en/1.1.x/quickstart/

from flask import Flask, render_template, request, session, redirect, url_for, jsonify, abort
from flask_sqlalchemy import SQLAlchemy
import os 

app = Flask(__name__)
app.secret_key = b'sdkfvhje8w4E_x#pi*CO0@^z'

sqlite_uri = 'sqlite:///' + os.path.abspath(os.path.curdir) + '/test.db'
app.config['SQLALCHEMY_DATABASE_URI'] = sqlite_uri
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

from models import User, Hpc

def get_current_user():
    if 'id' in session:
        return User.query.get(session['id'])

    return None

def validate(d, keys):
    for k in keys:
        if k not in d:
            raise Exception('{} does not contain key "{}"'.format(d, k))

def initializeHpcs():
    for i in range(8):
        hpc = Hpc(status="open")
        db.session.add(hpc)
        db.session.commit()


@app.before_first_request
def app_startup():
    try:
        Hpc.query.all()
    except:
        db.create_all()
        initializeHpcs()
        if 'id' in session:
            del session['id']

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/register/', methods=['POST'])
def api_register():
    try:
        validate(request.form, ['username', 'password'])

        u, p = request.form['username'], request.form['password']

        if db.session.query(User.id).filter_by(username=u).first() is None:
            user = User(username=u, password=p)
            db.session.add(user)
            db.session.commit()
            return 'ok'
        else:
            return 'fail'

    except Exception as e:
        return str(e), 400

@app.route('/api/login/', methods=['POST'])
def api_login():
    try:
        validate(request.form, ['username', 'password'])

        u, p = request.form['username'], request.form['password']
             
        if db.session.query(User.id).filter_by(username=u).first() is not None:
            session['id'] = db.session.query(User.id).filter_by(username=u).first()[0]
            return 'ok'
        else:
            return 'fail'

    except Exception as e:
        return str(e), 400


@app.route('/api/logout/', methods=['GET'])
def api_logout():
    try:
        validate(session, ['id'])
        
        if 'id' in session:
            del session['id']
        return 'ok'

    except Exception as e:
        return str(e), 400


@app.route('/api/hpcs/', methods=['GET'])
def api_hpcs():
    try:
        validate(session, ['id'])
     
        hpcs = Hpc.query.all()
        hpcs = list(map(lambda hpc: hpc.serialize(), hpcs))
        return jsonify(hpcs) 

    except Exception as e:
        return 'Not authenticated', 403


@app.route('/api/hpc/reserve/', methods=['POST'])
def api_reserve():
    try:
        print(request.form)
        validate(request.form, ['id', 'length'])

        hpcId, l = request.form['id'], request.form['length']
        currUser = get_current_user()
        
        if db.session.query(Hpc.status).filter_by(id=hpcId).first()[0] == "open":
            db.session.query(Hpc).filter_by(id=hpcId).update({"status":"reserved"})
            db.session.query(Hpc).filter_by(id=hpcId).update({"user_id":currUser.id})
            db.session.query(Hpc).filter_by(id=hpcId).update({"owner":currUser.username})
            db.session.commit()
            return 'ok'
        else:
            return 'fail'

    except Exception as e:
        return str(e), 400

@app.route('/api/hpc/cancel/', methods=['POST'])
def api_cancel():
    try:
        validate(request.form, ['id'])

        hpcId = request.form['id']
        
        if db.session.query(Hpc.user_id).filter_by(id=hpcId).first()[0] == session["id"]:
            db.session.query(Hpc).filter_by(id=hpcId).update({"status":"open"})
            db.session.query(Hpc).filter_by(id=hpcId).update({"user_id":None})
            db.session.query(Hpc).filter_by(id=hpcId).update({"owner":None})
            db.session.commit()
            return 'ok'
        else:
            return 'fail'

    except Exception as e:
        return str(e), 400

