from flask import Blueprint, jsonify, request, abort
from database import db, FoodRef

foodref_bp = Blueprint('foodref', __name__)

@foodref_bp.route('/foodrefs', methods=['POST'])
def create_food_ref():
    if not request.json:
        abort(400)

    data = request.get_json()

    # Extract the relevant data from the request JSON
    name = data.get('name')
    original_calory = data.get('original_calory')
    original_quantity = data.get('original_quantity')

    # Ensure fields are integers
    if not isinstance(original_calory, int) or not isinstance(original_quantity, int):
        return jsonify({'error': 'original_calory or original_quantity not an int'}), 400

    # Create a new FoodRef object
    new_food_ref = FoodRef(name=name, original_calory=original_calory, original_quantity=original_quantity)

    try:
        # Add the new FoodRef to the database session and commit the changes
        db.session.add(new_food_ref)
        db.session.commit()

        # Return a JSON response with the newly created FoodRef
        return jsonify(new_food_ref.to_json()), 201
    except Exception as e:
        # Handle any errors that occur during the creation process
        db.session.rollback()
        return jsonify({'error': str(e)}), 500


@foodref_bp.route('/foodrefs', methods=['GET'])
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


@foodref_bp.route('/foodrefs/<int:food_ref_id>', methods=['PUT'])
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
