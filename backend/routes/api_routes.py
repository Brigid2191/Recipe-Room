from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from app.models import db, User, Recipe, Bookmark, Rating, Comment
import requests

"""API routes for user registration, login, recipes, bookmarks, ratings, and comments."""

api = Blueprint('api', __name__)

@api.route('/register', methods=['POST'])
def register():
    data = request.json
    email = data.get('email')
    username = data.get('username')
    password = data.get('password')

    if not email or not username or not password:
        return jsonify({"message": "Missing required fields"}), 400

    if User.query.filter_by(email=email).first():
        return jsonify({"message": "Email already registered"}), 400

    user = User(username=username, email=email)
    user.set_password(password)
    db.session.add(user)
    db.session.commit()
    return jsonify({"message": "User registered"}), 201

@api.route('/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({"message": "Missing email or password"}), 400

    user = User.query.filter_by(email=email).first()
    if not user or not user.check_password(password):
        return jsonify({"message": "Invalid credentials"}), 401

    token = create_access_token(identity=user.id)
    return jsonify(access_token=token), 200

@api.route('/recipes', methods=['GET'])
def get_recipes():
    name = request.args.get('name')
    ingredient = request.args.get('ingredient')
    country = request.args.get('country')

    base_url = "https://www.themealdb.com/api/json/v1/1/"
    if name:
        url = f"{base_url}search.php?s={name}"
    elif ingredient:
        url = f"{base_url}filter.php?i={ingredient}"
    elif country:
        url = f"{base_url}filter.php?a={country}"
    else:
        url = f"{base_url}latest.php"

    response = requests.get(url, timeout=10)
    data = response.json()

    if data.get("meals"):
        for meal in data["meals"]:
            meal["user_rating"] = None
            meal["bookmarked"] = False

    return jsonify(data), 200

@api.route('/bookmark', methods=['POST'])
@jwt_required()
def bookmark_recipe():
    data = request.json
    recipe_id = data.get('recipe_id')
    if not recipe_id:
        return jsonify({"message": "Missing recipe_id"}), 400

    user_id = get_jwt_identity()
    existing = Bookmark.query.filter_by(user_id=user_id, recipe_id=recipe_id).first()
    if existing:
        return jsonify({"message": "Already bookmarked"}), 400

    bookmark = Bookmark(user_id=user_id, recipe_id=recipe_id)
    db.session.add(bookmark)
    db.session.commit()
    return jsonify({"message": "Bookmarked"}), 201

@api.route('/bookmarks', methods=['GET'])
@jwt_required()
def get_bookmarks():
    user_id = get_jwt_identity()
    bookmarks = Bookmark.query.filter_by(user_id=user_id).all()
    return jsonify([{"recipe_id": b.recipe_id} for b in bookmarks]), 200

@api.route('/rating', methods=['POST'])
@jwt_required()
def add_rating():
    data = request.json
    recipe_id = data.get('recipe_id')
    rating_value = data.get('rating')
    if not recipe_id or rating_value is None:
        return jsonify({"message": "Missing recipe_id or rating"}), 400

    user_id = get_jwt_identity()
    existing = Rating.query.filter_by(user_id=user_id, recipe_id=recipe_id).first()
    if existing:
        existing.rating = rating_value
    else:
        new_rating = Rating(user_id=user_id, recipe_id=recipe_id, rating=rating_value)
        db.session.add(new_rating)
    db.session.commit()
    return jsonify({"message": "Rating saved"}), 201

@api.route('/ratings/<int:recipe_id>', methods=['GET'])
def get_ratings(recipe_id):
    ratings = Rating.query.filter_by(recipe_id=recipe_id).all()
    avg = sum(r.rating for r in ratings) / len(ratings) if ratings else 0
    return jsonify({
        "average": avg,
        "ratings": [{"user_id": r.user_id, "rating": r.rating} for r in ratings]
    }), 200

@api.route('/comment', methods=['POST'])
@jwt_required()
def add_comment():
    data = request.json
    recipe_id = data.get('recipe_id')
    content = data.get('content')
    if not recipe_id or not content:
        return jsonify({"message": "Missing recipe_id or content"}), 400

    user_id = get_jwt_identity()
    comment = Comment(user_id=user_id, recipe_id=recipe_id, content=content)
    db.session.add(comment)
    db.session.commit()
    return jsonify({"message": "Comment added"}), 201

@api.route('/comments/<int:recipe_id>', methods=['GET'])
def get_comments(recipe_id):
    comments = Comment.query.filter_by(recipe_id=recipe_id).all()
    return jsonify([{"user_id": c.user_id, "content": c.content} for c in comments]), 200
