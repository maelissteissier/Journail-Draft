from jourNailing_backend.database.database import FoodRef


def save_food_ref_from_json(json_data, database):
    errors = validate_food_ref_json_fields(json_data)
    if len(errors) > 0:
        return None, {'errors': errors}

    # Extract the relevant data from the request JSON
    name = json_data.get('name')
    original_calory = json_data.get('original_calory', 0)
    original_quantity = json_data.get('original_quantity', 0)
    quantity_type = json_data.get('quantity_type', "")

    # Ensure fields are integers
    if not isinstance(original_calory, int) or not isinstance(original_quantity, int):
        return None, {'errors': ['original_calory or original_quantity not an int']}

    # Create a new FoodRef object
    new_food_ref = FoodRef(name=name, original_calory=original_calory, original_quantity=original_quantity, quantity_type=quantity_type)

    try:
        existing_foodref = database.session.query(FoodRef).filter_by(name=new_food_ref.name).first()

        if existing_foodref is None:
            # Add the new FoodRef to the database session and commit the changes
            database.session.add(new_food_ref)
            database.session.commit()
            # Return a JSON response with the newly created FoodRef
            return database.session.query(FoodRef).filter_by(name=new_food_ref.name).first(), None
        # Case where there is a new foodref with same name but different field (not allowed)
        elif not food_refs_equals(new_food_ref, existing_foodref):
            return existing_foodref, {'errors': ['there is already a food ref existing under this name with different informations']}
        else:
            return existing_foodref, None

    except Exception as e:
        # Handle any errors that occur during the creation process
        database.session.rollback()
        return None, {'errors': [str(e)]}


def food_refs_equals(food_ref_a, food_ref_b):
    return food_ref_a.name == food_ref_b.name and \
           food_ref_a.original_calory == food_ref_b.original_calory and \
           food_ref_a.original_quantity == food_ref_b.original_quantity and \
           food_ref_a.quantity_type == food_ref_b.quantity_type


def validate_food_ref_json_fields(food_ref_json):
    errors = []
    name = food_ref_json.get('name', None)
    original_calory = food_ref_json.get('original_calory', None )
    original_quantity = food_ref_json.get('original_quantity', None)
    quantity_type = food_ref_json.get('quantity_type', None)
    if name is None:
        errors.append('the field name is empty')
    if original_calory is None:
        errors.append('the field original_calory is empty')
    if original_quantity is None:
        errors.append('the field original_quantity is empty')
    if quantity_type is None:
        errors.append('the field quantity_type is empty')
    return errors
