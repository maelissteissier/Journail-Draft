from flask import Flask
from jourNailing_backend.database.database import configure_database
from jourNailing_backend.controllers.foodref_controller import foodref_bp
from jourNailing_backend.controllers.food_journal_entry_controller import foodJournalEntry_bp
from jourNailing_backend.controllers.text_journal_entry_controller import textJournalEntry_bp
from flask_cors import CORS


# Create the Flask app instance
from jourNailing_backend.controllers.journal_category_controller import journalCategory_bp

app = Flask(__name__)
# Configure the database
configure_database(app)
CORS(app, origins=['http://localhost:3000',  'http://192.168.2.31:3000'])

# Register the blueprints

app.register_blueprint(foodref_bp)
app.register_blueprint(foodJournalEntry_bp)
app.register_blueprint(textJournalEntry_bp)
app.register_blueprint(journalCategory_bp)


if __name__ == '__main__':
    app.run()
