from jourNailing_backend.database.database import FoodRef


def save_food_ref_from_json(json_data, database):
    # Extract the relevant data from the request JSON
    name = json_data.get('name')
    original_calory = json_data.get('original_calory', 0)
    original_quantity = json_data.get('original_quantity', 0)
    quantity_type = json_data.get('quantity_type', "")

    # Ensure fields are integers
    if not isinstance(original_calory, int) or not isinstance(original_quantity, int):
        return None, {'error': 'original_calory or original_quantity not an int'}

    # Create a new FoodRef object
    new_food_ref = FoodRef(name=name, original_calory=original_calory, original_quantity=original_quantity, quantity_type=quantity_type)

    try:
        existing_foodref = database.session.query(FoodRef).filter_by(name=new_food_ref.name).first()

        if existing_foodref is not None:
            return existing_foodref, {'error': 'there is already a food ref existing under this name'}
        else:
            # Add the new FoodRef to the database session and commit the changes
            database.session.add(new_food_ref)
            database.session.commit()

            # Return a JSON response with the newly created FoodRef
            return new_food_ref, None
    except Exception as e:
        # Handle any errors that occur during the creation process
        database.session.rollback()
        return None, {'error': str(e)}
