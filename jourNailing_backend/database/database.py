from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()


def configure_database(app, database_uri):
    app.config['SQLALCHEMY_DATABASE_URI'] = database_uri
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['SQLALCHEMY_ECHO'] = True
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
    quantity_type = db.Column(db.String(80), nullable=False)

    def to_json(self):
        return {
            'id': self.id,
            'original_calory': self.original_calory,
            'original_quantity': self.original_quantity,
            'name': self.name,
            'quantity_type': self.quantity_type
        }


# class MealRef(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     name = db.Column(db.String(80), nullable=False, unique=True)
#
#     def to_json(self):
#         return {
#             'id': self.id,
#             'name': self.name
#         }


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
    calories = db.Column(db.Integer, nullable=False)
    thoughts = db.Column(db.String(1000))
    name = db.Column(db.String(100))
    foodRef_id = db.Column(db.Integer, db.ForeignKey('food_ref.id'))
    foodRef = db.relationship('FoodRef', backref='food_entry', uselist=False)
    journalCategory_id = db.Column(db.Integer, db.ForeignKey('journal_category.id'))
    journalCategory = db.relationship('JournalCategory', backref='food_entry', uselist=False)

    def to_json(self):
        return {
            'id': self.id,
            'date': self.date.isoformat(),
            'quantity': self.quantity,
            'quantity_type': self.quantity_type,
            'calories': self.calories,
            'thoughts': self.thoughts,
            'food_ref': {} if self.foodRef is None else self.foodRef.to_json(),
            'name': self.name,
            'journal_category': self.journalCategory.to_json()
        }


class TextJournalEntry(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    text = db.Column(db.String(1000), nullable=False)

    # Can be more than one category
    journalCategory_id = db.Column(db.Integer, db.ForeignKey('journal_category.id'))
    journalCategory = db.relationship('JournalCategory', backref='text_entry')

    def to_json(self):
        journal_categories = [category.to_json() for category in self.journalCategory]

        return {
            'id': self.id,
            'date': self.date.isoformat(),
            'text': self.text,
            'journal_categories': journal_categories
        }



