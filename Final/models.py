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
			'username': self.username	
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
			'username': self.username
		}
	def __repr__(self):
		return '<Profile id=%r>' % self.id
