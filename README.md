# Poke Table

Poke Table is a web application that provides a table of information about Pokemon species. Users can search for specific Pokemon, apply filters to the data, and explore details about various Pokemons.

## Features

- View a paginated table of Pokemon data.
- Search for Pokemons by name.
- Filter Pokemons by base experience, height, and weight.
- Sort Pokemons by name, base experience, height, or weight.

## Demo

A live demo of the Poke Table application is available at: [https://poke-table-demo.herokuapp.com/](https://poke-table-demo.herokuapp.com/)

## Installation

### Prerequisites

- Node.js (v14 or above)
- Python (v3.7 or above)
- SQLite

### Backend Setup

1. Clone the repository:

git clone https://github.com/marcelrzd/poke-table.git
cd poke-table

2. Create a virtual environment:
   python -m venv venv (or python3 -m venv venv)

3. Activate the virtual environment:
   On Windows:
   venv\Scripts\activate

   On macOS and Linux:
   source venv/bin/activate

4. Install the required packages:
   pip install -r requirements.txt

5. Run the Flask backend server:
   python app.py (or python3 app.py)
   The backend server will be running at http://localhost:5000.
   You can check the pokemons json at http://localhost:5000/api/pokemons

6. Frontend Setup
   Navigate to the frontend directory:
   cd frontend

7. Install the frontend dependencies:
   npm install or npm i

8. Start the frontend development server:
   npm start
   The frontend server will be running at http://localhost:3000.

9. How to Use
   Once both the backend and frontend servers are running, visit http://localhost:3000 in your web browser to access the Poke Table web application.

The application provides various features:

View a list of Pokemons with pagination controls.
Search Pokemons by name using the search input field.
Filter Pokemons by base experience, height, and weight using the filter input fields.
Sort Pokemons by name, base experience, height, or weight using the sorting dropdowns.
Explore and enjoy discovering information about your favorite Pokemons!

Contributing
Contributions are welcome! If you find any issues or have suggestions for improvement, feel free to open an issue or submit a pull request.

License
This project is licensed under the MIT License. See the LICENSE file for details.

Credits
The Pokemon data used in this project is sourced from the PokeAPI.
This project was created by Marcel Rezende.
