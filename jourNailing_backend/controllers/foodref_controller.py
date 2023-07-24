from flask import Blueprint, jsonify, request, abort
from jourNailing_backend.database.database import db, FoodRef
from jourNailing_backend.database.food_ref_service import save_food_ref_from_json

foodref_bp = Blueprint('foodref', __name__)


@foodref_bp.route('/api/foodref', methods=['POST'])
def create_food_ref():
    if not request.json:
        abort(400)

    data = request.get_json()

    saved_food_ref, errs = save_food_ref_from_json(data, db)
    if errs is None:
        return jsonify(saved_food_ref.to_json()), 201
    else:
        return jsonify({'errors': errs}), 400


@foodref_bp.route('/api/foodrefs', methods=['GET'])
def get_all_food_refs():
    try:
        # Query all FoodRef objects from the database
        food_refs = FoodRef.query.all()

        # Convert each FoodRef object to JSON format
        food_refs_json = [food_ref.to_json() for food_ref in food_refs]

        # Return a JSON response with all FoodRef objects
        return jsonify(food_refs_json), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@foodref_bp.route('/api/foodref/<food_ref_id>', methods=['GET'])
def get_food_ref(food_ref_id):
    try:
        # Query the FoodRef object from the database by its ID
        food_ref = FoodRef.query.get(food_ref_id)

        # If the FoodRef doesn't exist
        if food_ref is None:
            return jsonify({'error': 'FoodRef not found'}), 404

        # Convert the FoodRef object to JSON format
        food_ref_json = food_ref.to_json()

        # Return a JSON response with the FoodRef object
        return jsonify(food_ref_json), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@foodref_bp.route('/api/foodref/<int:food_ref_id>', methods=['PUT'])
def edit_food_ref(food_ref_id):
    data = request.get_json()

    # Retrieve the existing FoodRef object from the database
    food_ref = FoodRef.query.get(food_ref_id)

    if not food_ref:
        return jsonify({'error': 'FoodRef not found'}), 404

    if not request.json:
        abort(400)

    # Update the FoodRef object with the new data
    food_ref.name = data.get('name')
    food_ref.original_calory = data.get('original_calory')
    food_ref.original_quantity = data.get('original_quantity')
    food_ref.quantity_type = data.get('quantity_type')

    # Ensure fields are integers
    if not isinstance(food_ref.original_calory, int) or not isinstance(food_ref.original_quantity, int):
        return jsonify({'error': 'original_calory or original_quantity not an int'}), 400

    try:
        # Commit the changes to the database
        db.session.commit()

        # Return a JSON response with the updated FoodRef
        return jsonify(food_ref.to_json()), 200
    except Exception as e:
        # Handle any errors that occur during the update process
        db.session.rollback()
        return jsonify({'error': str(e)}), 500


