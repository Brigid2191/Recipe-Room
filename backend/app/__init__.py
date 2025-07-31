from flask import Flask
from dotenv import load_dotenv 
import os
from flask_cors import CORS
from app.extensions import db, migrate, bcrypt, jwt

load_dotenv()

def create_app():
    app = Flask(__name__)

    app.url_map.strict_slashes = False

    CORS(app, supports_credentials=True, resources={r"/api/*": {"origins": ["http://localhost:5173", "http://127.0.0.1:5173"]}})
 
    app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL', 'sqlite:///app.db')
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY', 'your-secret-key')
 
    db.init_app(app)
    migrate.init_app(app, db)
    bcrypt.init_app(app)
    jwt.init_app(app)

    with app.app_context():
        from app import models

    # Register blueprints AFTER setting strict_slashes
    from routes.auth_routes import auth_bp
    from routes.bookmark_routes import bookmark_bp
    from routes.comment_routes import comment_bp
    from routes.group_routes import group_bp
    from routes.recipe_routes import recipe_bp
    from routes.user_routes import user_bp

    app.register_blueprint(auth_bp, url_prefix='/api/auth')
    app.register_blueprint(bookmark_bp, url_prefix='/api/bookmarks')
    app.register_blueprint(comment_bp, url_prefix='/api/comments')
    app.register_blueprint(group_bp, url_prefix='/api/groups')
    app.register_blueprint(recipe_bp, url_prefix='/api/recipes')
    app.register_blueprint(user_bp, url_prefix='/api/users')

    @app.route('/')
    def home():
        return "API is running"

    return app
    
