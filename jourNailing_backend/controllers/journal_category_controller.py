from flask import Blueprint, jsonify, request, abort
from jourNailing_backend.database.database import db, JournalCategory

journalCategory_bp = Blueprint('journalCategory', __name__)


# GET all journal categories
@journalCategory_bp.route('/api/journal-categories', methods=['GET'])
def get_all_journal_categories():
    categories = JournalCategory.query.all()
    categories_json = [category.to_json() for category in categories]
    return jsonify(categories_json), 200


# GET a specific JournalCategory
@journalCategory_bp.route('/api/journal-category/<category_id>', methods=['GET'])
def get_journal_category(category_id):
    category = JournalCategory.query.get(category_id)
    if category is None:
        return jsonify({'error': 'Category not found'}), 404
    return jsonify(category.to_json()), 200


# POST a new JournalCategory
@journalCategory_bp.route('/api/journal-category', methods=['POST'])
def create_journal_category():
    data = request.json
    new_category = JournalCategory(name=data['name'])
    db.session.add(new_category)
    db.session.commit()
    return jsonify(new_category.to_json()), 201


# PUT/EDIT a specific JournalCategory
@journalCategory_bp.route('/api/journal-category/<category_id>', methods=['PUT'])
def edit_journal_category(category_id):
    category = JournalCategory.query.get(category_id)
    if category is None:
        return jsonify({'error': 'Category not found'}), 404
    data = request.json
    category.name = data['name']
    db.session.commit()
    return jsonify(category.to_json()), 200


# DELETE a specific JournalCategory
@journalCategory_bp.route('/api/journal-category/<category_id>', methods=['DELETE'])
def delete_journal_category(category_id):
    category = JournalCategory.query.get(category_id)
    if category is None:
        return jsonify({'error': 'Category not found'}), 404
    db.session.delete(category)
    db.session.commit()
    return jsonify({'message': 'Category deleted successfully'}), 200