from flask import Flask
from jourNailing_backend.database.database import configure_database
from jourNailing_backend.controllers.foodref_controller import foodref_bp
from jourNailing_backend.controllers.food_journal_entry_controller import foodJournalEntry_bp
from jourNailing_backend.controllers.text_journal_entry_controller import textJournalEntry_bp
from flask_cors import CORS
import os


# Create the Flask app instance
from jourNailing_backend.controllers.journal_category_controller import journalCategory_bp

app = Flask(__name__)
# Configure the database
configure_database(app, os.environ.get('SQLALCHEMY_DATABASE_URI'))
CORS(app, origins=[os.environ.get('CORS_ORIGIN_LOCALHOST'),
                   os.environ.get('CORS_ORIGIN_LOCAL_IP'),
                   os.environ.get('CORS_ORIGIN_LOCALHOST_ANGULAR'),
                   os.environ.get('CORS_ORIGIN_LOCAL_IP_ANGULAR')])

# Register the blueprints

app.register_blueprint(foodref_bp)
app.register_blueprint(foodJournalEntry_bp)
app.register_blueprint(textJournalEntry_bp)
app.register_blueprint(journalCategory_bp)


if __name__ == '__main__':
    app.run(host="0.0.0.0", port=os.environ.get('FLASK_PORT'))
