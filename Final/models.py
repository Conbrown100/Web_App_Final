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
	username = db.Column(db.String(80), unique=True, nullable=False)
	password = db.Column(db.String(42), unique=False, nullable=False)
	
	def serialize(self):
		return {
			'id': self.id,
			'username': self.username,	
		}

	def __repr__(self):
		return '<User %r>' % self.username


class Profile(db.Model):
	id = db.Column(db.Integer, primary_key=True)
	username = db.Column(db.String(80), unique=True, nullable=False)
	password = db.Column(db.String(40), unique=False, nullable=False)
	
	def serialize(self):
		return {
			'id': self.id,
			'username': self.username,
		}
	def __repr__(self):
		return '<Profile id=%r>' % self.id


class HPC(db.Model):
	id = db.Column(db.Integer, primary_key=True)
	profile_id = db.Column(db.Integer, db.ForeignKey('profile.id'), nullable=False)
	#status is based off of 1 or 0
	# 1 meaning it is taken by another user
	# 0 meaning the computer is free
	# giving the option of storing the data here or we can update with Reactjs
	status = db.Column(db.Integer, nullable=False)
	profile = db.relationship('Profile', uselist=False, lazy=True)
	
	def serialize(self):
		return {
			'id' self.id,
			'profile': self.profile.serialize(),
		}
