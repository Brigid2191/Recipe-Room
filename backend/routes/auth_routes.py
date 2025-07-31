
from flask import Blueprint, request, jsonify 
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from flask_cors import cross_origin
from app.extensions import db
from app.models import User 
from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from app.models import db, User
from flask_jwt_extended import create_access_token
from flask_cors import cross_origin


auth_bp = Blueprint("auth", __name__, url_prefix="/api/auth")


@auth_bp.route('/register', methods=['POST'])
@cross_origin(origins=["http://localhost:5173", "http://127.0.0.1:5173"], supports_credentials=True)
def register():
    data = request.json
    if User.query.filter_by(email=data['email']).first():
        return jsonify({"message": "Email already registered"}), 400
    user = User(username=data['username'], email=data['email'])
    user.password = data['password']
    db.session.add(user)
    db.session.commit()
    return jsonify({"message": "User created"}), 201

@auth_bp.route('/login', methods=['POST'])
@cross_origin(origins=["http://localhost:5173", "http://127.0.0.1:5173"], supports_credentials=True)
def login():
    try:
        data = request.json
        if not data or 'email' not in data or 'password' not in data:
            return jsonify({"message": "Missing email or password"}), 400
        user = User.query.filter_by(email=data['email']).first()
        if not user or not user.check_password(data['password']):
            return jsonify({"message": "Invalid credentials"}), 401
        token = create_access_token(identity=user.id)
        return jsonify(access_token=token, user=user.to_dict()), 200
    except Exception:
        return jsonify({"message": "Server error"}), 500

@auth_bp.route('/protected', methods=['GET'])
@jwt_required()
@cross_origin(origins=["http://localhost:5173", "http://127.0.0.1:5173"], supports_credentials=True)
def protected():
    current_user_id = get_jwt_identity()
    return jsonify({"message": f"Hello user {current_user_id}!"}), 200

# Register route
@auth_bp.route('/register', methods=['POST', 'OPTIONS'])
@cross_origin(origins=["http://localhost:5173"], supports_credentials=True)
def register():
    if request.method == 'OPTIONS':
        return jsonify({}), 200

    data = request.get_json()

    username = data.get('username')
    email = data.get('email')
    password = data.get('password')

    if not all([username, email, password]):
        return jsonify({"error": "Missing fields"}), 400

    if User.query.filter_by(email=email).first():
        return jsonify({"error": "Email already exists"}), 400

    hashed_password = generate_password_hash(password)
    new_user = User(username=username, email=email, password_hash=hashed_password)

    db.session.add(new_user)
    db.session.commit()

    access_token = create_access_token(identity=new_user.id)
    return jsonify({
        "access_token": access_token,
        "user": {
            "id": new_user.id,
            "username": new_user.username,
            "email": new_user.email
        }
    }), 201

# Login route
@auth_bp.route('/login', methods=['POST', 'OPTIONS'])
@cross_origin(origins=["http://localhost:5173"], supports_credentials=True)
def login():
    if request.method == 'OPTIONS':
        return jsonify({}), 200

    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    user = User.query.filter_by(email=email).first()

    if not user or not check_password_hash(user.password_hash, password):
        return jsonify({"error": "Invalid credentials"}), 401

    access_token = create_access_token(identity=user.id)
    return jsonify({
        "access_token": access_token,
        "user": {
            "id": user.id,
            "username": user.username,
            "email": user.email
        }
    }), 200

