from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_cors import CORS
from flask_migrate import Migrate
from dotenv import load_dotenv
import os
from flask import Flask
from app.extension import db, jwt
from routes.auth_routes import auth_bp
from routes.bookmark_routes import bookmark_bp
from routes.comment_routes import comment_bp
from routes.group_routes import group_bp
from routes.recipe_routes import recipe_bp
from routes.user_routes import user_bp
load_dotenv()

db = SQLAlchemy()
ma = Marshmallow()
migrate = Migrate()

def create_app():
    app = Flask(__name__)

    app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL', 'sqlite:///app.db')
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    db.init_app(app)
    ma.init_app(app)
    migrate.init_app(app, db)
    CORS(app, supports_credentials=True)

    from app.models import User, Recipe, Rating, GroupRecipe, Comment, Bookmark, Ingredient

    app.register_blueprint(auth_bp, url_prefix='/api/auth')
    app.register_blueprint(bookmark_bp, url_prefix='/api/bookmarks')
    app.register_blueprint(comment_bp, url_prefix='/api/comments')
    app.register_blueprint(group_bp, url_prefix='/api/groups')
    app.register_blueprint(recipe_bp, url_prefix='/api/recipes')
    app.register_blueprint(user_bp, url_prefix='/api/users')


    return app
