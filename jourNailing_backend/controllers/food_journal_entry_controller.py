from flask import Blueprint, jsonify, request, abort
from jourNailing_backend.database.database import db, FoodJournalEntry, JournalCategory, FoodRef
from jourNailing_backend.database.food_ref_service import save_food_ref_from_json
from datetime import datetime, timedelta
import pytz

foodJournalEntry_bp = Blueprint('foodJournalEntry', __name__)

DEFAULT_TIMEZONE = -4


# POST new entry
@foodJournalEntry_bp.route('/food-journal-entry', methods=['POST'])
def create_food_journal_entry():
    if not request.json:
        abort(400)

    data = request.json

    new_entry, errors = food_journal_entry_validation(data)
    if errors is not None:
        return jsonify({"errors": errors}), 400
    else:
        db.session.add(new_entry)
        db.session.commit()
        return jsonify(new_entry.to_json()), 201


def food_journal_entry_validation(food_journal_entry_json):
    errors = []
    new_entry = None
    # FoodEntry journal_category should always be food
    journal_category = JournalCategory.query.filter(JournalCategory.name == 'food').first()

    # If the JournalCategory doesn't exist (required)
    if journal_category is None:
        errors.append('JournalCategory not found')
    else:
        # FoodRef isn't required, if present but new, we save it
        food_ref = food_journal_entry_json.get('food_ref', None)

        # Food_ref received
        if food_ref is not None:
            food_ref_id = food_journal_entry_json['food_ref'].get('id', None)
            # Food ref exists in DB (because it has an ID) :
            if food_ref_id is not None:
                food_ref = FoodRef.query.get(food_ref_id)
                # Error retreiving food_ref in DB :
                if food_ref is None:
                    return errors.append('FoodRef not found')
            # FoodRef doesn't exist in DB :
            else:
                food_ref_saved, err = save_food_ref_from_json(food_ref, db)
                food_ref = FoodRef.query.get(food_ref_saved.id)
                if err is not None:
                    errors.append('food reference saving error')

        try:
            entry_date_utc = datetime.strptime(food_journal_entry_json['date'], "%Y-%m-%dT%H:%M:%S.%fZ").replace(tzinfo=pytz.UTC)
            new_entry = FoodJournalEntry(
                date=entry_date_utc,
                quantity=food_journal_entry_json.get('quantity', ""),
                quantity_type=food_journal_entry_json.get('quantity_type', ""),
                calories=food_journal_entry_json.get('calories', ""),
                thoughts=food_journal_entry_json.get('thoughts', ""),
                name=food_journal_entry_json.get('name', ""),
                foodRef=food_ref,
                journalCategory=journal_category
            )

            if new_entry.calories == "":
                errors.append("calories must not be empty")
            if new_entry.name == "":
                errors.append("foodname must not be empty")

            if (not isinstance(new_entry.quantity, int) and new_entry.quantity != None) \
                    or not isinstance(new_entry.calories, int):
                errors.append('original_calory or original_quantity not an int')
        except ValueError:
            errors.append('Invalid date format')
    return new_entry, None if len(errors) == 0 else errors




# Get one entry
@foodJournalEntry_bp.route('/food-journal-entry/<entry_id>', methods=['GET'])
def get_food_journal_entry(entry_id):
    entry = FoodJournalEntry.query.get(entry_id)
    if entry is None:
        return jsonify({'error': 'Entry not found'}), 404
    return jsonify(entry.to_json()), 200


# GET all entries
@foodJournalEntry_bp.route('/food-journal-entries', methods=['GET'])
def get_all_food_journal_entries():
    entries = FoodJournalEntry.query.all()
    entries_json = [entry.to_json() for entry in entries]
    return jsonify(entries_json), 200


# Get all entries by date (one day)
@foodJournalEntry_bp.route('/food-journal-entries/date', methods=['GET'])
def get_entries_by_date():
    # Get the date from the request parameters or use today's date as default
    date_str = request.args.get('date')
    timezone = request.args.get('timezone')

    if timezone:
        try:
            tz = int(timezone)
        except Exception:
            return jsonify({'error': 'Invalid timezone'})
    else:
        tz = -DEFAULT_TIMEZONE

    if date_str:
        try:
            query_date_min = datetime.strptime(date_str, '%Y-%m-%d') + timedelta(hours=tz)
            query_date_max = datetime.strptime(date_str, '%Y-%m-%d') + timedelta(days=1, hours=tz)
        except ValueError:
            return jsonify({'error': 'Invalid date format'}), 400
    else:
        query_date_min = datetime.today() + timedelta(hours=tz)
        query_date_max = datetime.today() + timedelta(days=1, hours=tz)

    print(query_date_min)
    print(query_date_max)

    # Query the database for entries matching the specified date
    entries = FoodJournalEntry.query.filter(FoodJournalEntry.date >= query_date_min,
                                            FoodJournalEntry.date < query_date_max).all()

    # Convert entries to JSON format
    entries_json = [entry.to_json() for entry in entries]

    return jsonify(entries_json), 200


@foodJournalEntry_bp.route('/food-journal-entry/<entry_id>', methods=['DELETE'])
def delete_food_journal_entry(entry_id):
    entry = FoodJournalEntry.query.get(entry_id)
    if entry is None:
        return jsonify({'error': 'Entry not found'}), 404
    db.session.delete(entry)
    db.session.commit()
    return jsonify({'message': 'Entry deleted successfully'}), 200


@foodJournalEntry_bp.route('/food-journal-entry/<entry_id>', methods=['PUT'])
def edit_food_journal_entry(entry_id):
    entry = FoodJournalEntry.query.get(entry_id)
    if entry is None:
        return jsonify({'error': 'Entry not found'}), 404
    data = request.json
    entry.date = data['date']
    entry.quantity = data['quantity']
    entry.quantity_type = data['quantity_type']
    entry.calories = data['calories']
    entry.mealRef_id = data['mealRef_id']
    entry.journalCategory_id = data['journalCategory_id']
    db.session.commit()
    return jsonify(entry.to_json()), 200