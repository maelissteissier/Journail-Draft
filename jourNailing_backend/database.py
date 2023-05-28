from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()


def configure_database(app):
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///journailing.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    # Initialize the SQLAlchemy instance with the Flask app
    db.init_app(app)
    # Create the database tables
    with app.app_context():
        db.create_all()


class FoodRef(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    original_calory = db.Column(db.Integer, nullable=False)
    original_quantity = db.Column(db.Integer, nullable=False)
    name = db.Column(db.String(80), nullable=False, unique=True)

    def to_json(self):
        return {
            'id': self.id,
            'original_calory': self.original_calory,
            'original_quantity': self.original_quantity,
            'name': self.name
        }


class MealRef(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False, unique=True)

    def to_json(self):
        return {
            'id': self.id,
            'name': self.name
        }


class JournalCategory(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False, unique=True)

    def to_json(self):
        return {
            'id': self.id,
            'name': self.name
        }


class FoodJournalEntry(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    quantity = db.Column(db.Integer)
    quantity_type = db.Column(db.String(80))
    calories = db.Column(db.Integer,nullable=False)
    # foodRef_id = db.Column(db.Integer, db.ForeignKey('food_ref.id'))
    # foodRef = db.relationship('FoodRef', backref='food_entry', uselist=False)
    mealRef_id = db.Column(db.Integer, db.ForeignKey('meal_ref.id'))
    mealRef = db.relationship('MealRef', backref='food_entry', uselist=False)
    journalCategory_id = db.Column(db.Integer, db.ForeignKey('journal_category.id'))
    journalCategory = db.relationship('JournalCategory', backref='food_entry', uselist=False)

    def to_json(self):
        return {
            'id': self.id,
            'date': self.date.isoformat(),
            'quantity': self.quantity,
            'quantity_type': self.quantity_type,
            'calories': self.calories,
            'meal_ref': self.mealRef.to_json(),
            'journal_category': self.journalCategory.to_json()
        }


class TextJournalEntry(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    text = db.Column(db.String(1000), nullable=False)
    journalCategory_id = db.Column(db.Integer, db.ForeignKey('journal_category.id'))
    journalCategory = db.relationship('JournalCategory', backref='text_entry', uselist=False)

    def to_json(self):
        return {
            'id': self.id,
            'date': self.date.isoformat(),
            'text': self.text,
            'journal_category': self.journalCategory.to_json()
        }



