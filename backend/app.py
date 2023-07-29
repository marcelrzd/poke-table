from flask import Flask, jsonify, request
from flask_cors import CORS

from models import db, Pokemon
import csv

app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///pokemons.db'
db.init_app(app)

# Load data from the CSV and store it in the SQLite database
def load_data():
    with open('Pokeman CSV - Sheet1.csv', newline='') as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            name = row['Name']

            # Validate integer fields and set empty values to None
            base_experience = int(row['Base Experience']) if row['Base Experience'] else None
            height = int(row['Height']) if row['Height'] else None
            weight = int(row['Weight']) if row['Weight'] else None

            # Check if a Pokémon with the same name already exists in the database
            existing_pokemon = Pokemon.query.filter_by(name=name).first()
            if not existing_pokemon:
                # If the Pokémon does not exist in the database, add it
                pokemon = Pokemon(
                    name=name,
                    base_experience=base_experience,
                    height=height,
                    weight=weight,
                    image_url=row['Image URL']
                )
                db.session.add(pokemon)
        db.session.commit()

# Create the database tables if they don't exist
with app.app_context():
    db.create_all()
    load_data()

# REST Endpoint to get paginated list of pokemons
@app.route('/api/pokemons')
def get_pokemons():
    page = int(request.args.get('page', 1))
    per_page = int(request.args.get('per_page', 10))
    search_query = request.args.get('search', '').strip()

    sorting_column = request.args.get('sort', 'name')
    sorting_order = request.args.get('order', 'asc').lower()

    valid_sort_columns = ['name', 'base_experience', 'height', 'weight']
    sorting_column = sorting_column if sorting_column in valid_sort_columns else 'name'
    sorting_order = sorting_order if sorting_order in ['asc', 'desc'] else 'asc'

    query = Pokemon.query

    if search_query:
        # Add filter to the query to search by name
        query = query.filter(Pokemon.name.ilike(f'%{search_query}%'))

    # Get filter criteria for base_experience, height, and weight
    base_experience_min = request.args.get('base_experience_min', type=int)
    base_experience_max = request.args.get('base_experience_max', type=int)
    height_min = request.args.get('height_min', type=int)
    height_max = request.args.get('height_max', type=int)
    weight_min = request.args.get('weight_min', type=int)
    weight_max = request.args.get('weight_max', type=int)

    # Apply filters to the query
    if base_experience_min is not None:
        query = query.filter(Pokemon.base_experience >= base_experience_min)
    if base_experience_max is not None:
        query = query.filter(Pokemon.base_experience <= base_experience_max)

    if height_min is not None:
        query = query.filter(Pokemon.height >= height_min)
    if height_max is not None:
        query = query.filter(Pokemon.height <= height_max)

    if weight_min is not None:
        query = query.filter(Pokemon.weight >= weight_min)
    if weight_max is not None:
        query = query.filter(Pokemon.weight <= weight_max)

    total_items = query.count()
    total_pages = (total_items + per_page - 1) // per_page

    # Apply sorting to the query
    if sorting_order == 'asc':
        query = query.order_by(getattr(Pokemon, sorting_column))
    else:
        query = query.order_by(getattr(Pokemon, sorting_column).desc())

    paginated_query = query.limit(per_page).offset((page - 1) * per_page)

    pokemons = [
        {
            'id': pokemon.id,
            'name': pokemon.name,
            'base_experience': pokemon.base_experience,
            'height': pokemon.height,
            'weight': pokemon.weight,
            'image_url': pokemon.image_url
        }
        for pokemon in paginated_query
    ]

    result = {
        'data': pokemons,
        'page': page,
        'per_page': per_page,
        'total_items': total_items,
        'total_pages': total_pages,
        'sorting_column': sorting_column,
        'sorting_order': sorting_order,
    }
    return jsonify(result)
    
if __name__ == '__main__':
    app.run(debug=True)