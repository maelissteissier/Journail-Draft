from datetime import datetime, date, timedelta
from flask import Blueprint, jsonify, request
from jourNailing_backend.database.database import db, TextJournalEntry

textJournalEntry_bp = Blueprint('textJournalEntry', __name__)


# GET all TextJournalEntries
@textJournalEntry_bp.route('/api/text-journal-entries', methods=['GET'])
def get_all_text_journal_entries():
    entries = TextJournalEntry.query.all()
    entries_json = [entry.to_json() for entry in entries]
    return jsonify(entries_json), 200


# GET all text journal entries by day
@textJournalEntry_bp.route('/api/text-journal/entries', methods=['GET'])
def get_entries_by_date():
    # Get the date from the request parameters or use today's date as default
    date_str = request.args.get('date')
    if date_str:
        try:
            query_date = datetime.strptime(date_str, '%Y-%m-%d').date()
        except ValueError:
            return jsonify({'error': 'Invalid date format'}), 400
    else:
        query_date = date.today()

    # Query the database for entries matching the specified date
    entries = TextJournalEntry.query.filter(TextJournalEntry.date >= query_date,
                                            TextJournalEntry.date < query_date + timedelta(days=1)).all()

    # Convert entries to JSON format
    entries_json = [entry.to_json() for entry in entries]

    return jsonify(entries_json), 200


# GET a specific TextJournalEntry
@textJournalEntry_bp.route('/api/text-journal-entries/<entry_id>', methods=['GET'])
def get_text_journal_entry(entry_id):
    entry = TextJournalEntry.query.get(entry_id)
    if entry is None:
        return jsonify({'error': 'Entry not found'}), 404
    return jsonify(entry.to_json()), 200


# POST a new TextJournalEntry
@textJournalEntry_bp.route('/api/text-journal-entries', methods=['POST'])
def create_text_journal_entry():
    data = request.json
    new_entry = TextJournalEntry(
        date=data['date'],
        text=data['text'],
        journalCategory_id=data['journalCategory_id']
    )
    db.session.add(new_entry)
    db.session.commit()
    return jsonify(new_entry.to_json()), 201


# PUT/EDIT a specific TextJournalEntry
@textJournalEntry_bp.route('/api/text-journal-entries/<entry_id>', methods=['PUT'])
def edit_text_journal_entry(entry_id):
    entry = TextJournalEntry.query.get(entry_id)
    if entry is None:
        return jsonify({'error': 'Entry not found'}), 404
    data = request.json
    entry.date = data['date']
    entry.text = data['text']
    entry.journalCategory_id = data['journalCategory_id']
    db.session.commit()
    return jsonify(entry.to_json()), 200


# DELETE a specific TextJournalEntry
@textJournalEntry_bp.route('/api/text-journal-entries/<entry_id>', methods=['DELETE'])
def delete_text_journal_entry(entry_id):
    entry = TextJournalEntry.query.get(entry_id)
    if entry is None:
        return jsonify({'error': 'Entry not found'}), 404
    db.session.delete(entry)
    db.session.commit()
    return jsonify({'message': 'Entry deleted successfully'}), 200