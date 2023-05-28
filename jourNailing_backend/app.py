from flask import Flask
from database import configure_database
from foodref_controller import foodref_bp
from flask_cors import CORS


# Create the Flask app instance
app = Flask(__name__)
# Configure the database
configure_database(app)
CORS(app, origins=['http://localhost:3000',  'http://192.168.2.31:3000'])

# Register the blueprints

app.register_blueprint(foodref_bp)


if __name__ == '__main__':
    app.run()
