'''from flask import Blueprint, request, jsonify

from app.extensions import db

from app.models import Recipe
import requests

recipe_bp = Blueprint('recipes', __name__)

@recipe_bp.route('/recipes', methods=['GET'])
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

    response = requests.get(url)
    data = response.json()
    return jsonify(data)

@recipe_bp.route('/recipes', methods=['POST'])
def create_recipe():
    data = request.json
    recipe = Recipe(
        title=data['title'],
        ingredients=data['ingredients'],
        instructions=data['instructions'],
        country=data['country'],
        serves=data['serves'],
        user_id=data['user_id']
    )
    db.session.add(recipe)
    db.session.commit()
    return jsonify({"message": "Recipe created"})
'''


from flask import Blueprint, request, jsonify
from app.extensions import db
from app.models import Recipe
from datetime import datetime
import requests
recipe_bp = Blueprint('recipes', __name__, url_prefix='/api')

# Helper function to format recipe responses
def recipe_to_dict(recipe):
    return {
        'id': recipe.id,
        'title': recipe.title,
        'description': recipe.description,
        'procedure': recipe.procedure,
        'country': recipe.country,
        'number_of_people_served': recipe.number_of_people_served,
        'image_url': recipe.image_url,
        'video_url': recipe.video_url,
        'user_id': recipe.user_id,
        'created_at': recipe.created_at.isoformat() if recipe.created_at else None
    }

# GET all recipes (from your database)
@recipe_bp.route('/recipes', methods=['GET'])
def get_recipes():
    try:
        recipes = Recipe.query.all()
        return jsonify([recipe_to_dict(recipe) for recipe in recipes])
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# GET single recipe
@recipe_bp.route('/recipes/<int:id>', methods=['GET'])
def get_recipe(id):
    try:
        recipe = Recipe.query.get_or_404(id)
        return jsonify(recipe_to_dict(recipe))
    except Exception as e:
        return jsonify({'error': str(e)}), 404 if '404' in str(e) else 500

# CREATE new recipe
@recipe_bp.route('/recipes', methods=['POST'])
def create_recipe():
    try:
        data = request.get_json()

        required_fields = ['title', 'description', 'procedure', 'country',
                         'number_of_people_served', 'user_id']
        if not all(field in data for field in required_fields):
            return jsonify({'error': 'Missing required fields'}), 400

        new_recipe = Recipe(
            title=data['title'],
            description=data['description'],
            procedure=data['procedure'],
            country=data['country'],
            number_of_people_served=data['number_of_people_served'],
            image_url=data.get('image_url'),
            video_url=data.get('video_url'),
            user_id=data['user_id'],
            created_at=datetime.utcnow()
        )

        db.session.add(new_recipe)
        db.session.commit()

        return jsonify(recipe_to_dict(new_recipe)), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 400

# UPDATE recipe
@recipe_bp.route('/recipes/<int:id>', methods=['PUT'])
def update_recipe(id):
    try:
        recipe = Recipe.query.get_or_404(id)
        data = request.get_json()

        # Update only provided fields
        if 'title' in data:
            recipe.title = data['title']
        if 'description' in data:
            recipe.description = data['description']
        if 'procedure' in data:
            recipe.procedure = data['procedure']
        if 'country' in data:
            recipe.country = data['country']
        if 'number_of_people_served' in data:
            recipe.number_of_people_served = data['number_of_people_served']
        if 'image_url' in data:
            recipe.image_url = data['image_url']
        if 'video_url' in data:
            recipe.video_url = data['video_url']

        recipe.updated_at = datetime.utcnow()
        db.session.commit()

        return jsonify(recipe_to_dict(recipe))
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 400

# DELETE recipe
@recipe_bp.route('/recipes/<int:id>', methods=['DELETE'])
def delete_recipe(id):
    try:
        recipe = Recipe.query.get_or_404(id)
        db.session.delete(recipe)
        db.session.commit()
        return jsonify({'message': 'Recipe deleted successfully'})
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

# Optional: External API search endpoint
@recipe_bp.route('/search-external', methods=['GET'])
def search_external_recipes():
    try:
        query = request.args.get('query')
        if not query:
            return jsonify({'error': 'Query parameter is required'}), 400

        base_url = "https://www.themealdb.com/api/json/v1/1/"
        url = f"{base_url}search.php?s={query}"

        response = requests.get(url)
        data = response.json()

        # Transform external API format to match your schema
        transformed = []
        if data.get('meals'):
            transformed = [{
                'id': f"ext_{meal['idMeal']}",
                'title': meal['strMeal'],
                'description': meal['strInstructions'][:200],
                'procedure': meal['strInstructions'],
                'country': meal.get('strArea', 'International'),
                'number_of_people_served': 4,
                'image_url': meal['strMealThumb'],
                'video_url': meal.get('strYoutube', ''),
                'user_id': None,  # External recipes have no owner
                'is_external': True
            } for meal in data['meals']]

        return jsonify(transformed)
    except Exception as e:
        return jsonify({'error': str(e)}), 500