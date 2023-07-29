from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Pokemon(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=True)
    base_experience = db.Column(db.Integer, nullable=True)
    height = db.Column(db.Integer, nullable=True)
    weight = db.Column(db.Integer, nullable=True)
    image_url = db.Column(db.String(200), nullable=True)

    def __repr__(self):
        return f'<Pokemon {self.name}>'
