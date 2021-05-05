# Set up the DB using the following commands:
# $ python
# > from appserver import db
# > db.create_all()
# > from models import User
# > admin = User(username='admin', email='admin@example.com')
# > db.session.add(admin)
# > db.session.commit()
# > User.query.all()

from appserver import db                                                        

# Example class
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(16), unique=True, nullable=False)
    password = db.Column(db.String(16), unique=False, nullable=False)

    def serialize(self):
        return {
            'id': self.id,
            'username': self.username,
            'password': self.password,
        }

    def __repr__(self):
        return '<User {}>'.format(self.username)

# Example class
class Hpc(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    status = db.Column(db.String(16), unique=False, nullable=False)
    reserveLen = db.Column(db.Integer, unique=False, nullable=True)
    timeStamp = db.Column(db.Integer, unique=False, nullable=True)
    user_id = db.Column(db.Integer, unique=False, nullable=True)

    def serialize(self):
        return {
            'id': self.id,
            'status': self.status,
            'reserveLen': self.reserveLen,
            'timeStamp': self.timeStamp,
            'user_id': self.user_id,
        }

    def __repr__(self):
        return '<Hpc {}>'.format(self.id)
