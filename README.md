# Recipe-Room

Recipe-Room is a full-stack web application for discovering, sharing, and managing your favorite recipes. It uses **React** for the frontend, **Flask** for the backend, and integrates with **TheMealDB API** to provide access to thousands of recipes.

---

## Features

* **User Authentication**: Secure registration and login using JWT.
* **Recipe Search**: Search recipes by name, ingredient, or region using TheMealDB API.
* **Bookmarks**: Save your favorite recipes for quick access.
* **Ratings & Comments**: Rate and comment on recipes.
* **Groups**: Create and join groups to share and discuss recipes with friends.
* **Responsive Design**: Optimized for mobile and desktop devices.

---

## Tech Stack

### Frontend

* React (created with Create React App)
* Redux Toolkit (state management)
* Axios (API requests)
* Bootstraps (styling)

### Backend

* Flask (Python web framework)
* Flask-JWT-Extended (authentication)
* Flask-SQLAlchemy (database ORM)
* Marshmallow (serialization & validation)
* Cloudinary (image uploads)

### Database

* PostgreSQL (development & production)

---

## Project Structure

```
Recipe-Room/
├── frontend/          # React application
│   ├── src/
│   ├── public/
│   └── package.json
├── backend/
│   ├── app/
│   │   ├── __init__.py
│   │   ├── config.py
│   │   ├── extensions.py
│   │   ├── models.py
│   │   ├── routes/
│   │   │   ├── api_routes.py
│   │   │   ├── auth_routes.py
│   │   │   ├── bookmark_routes.py
│   │   │   ├── comment_routes.py
│   │   │   └── group_routes.py
│   │   └── schemas/
│   │       ├── user_schema.py
│   │       ├── recipe_schema.py
│   │       └── group_schema.py
│   └── requirements.txt
└── README.md
```

---

## Setup & Installation

### Backend

1. Navigate to the backend folder:

   ```bash
   cd backend
   ```
2. Create and activate a virtual environment:

   ```bash
   python3 -m venv venv
   source venv/bin/activate
   ```
3. Install dependencies:

   ```bash
   pip install -r requirements.txt
   ```
4. Set up environment variables (e.g., `.env` for database URL and JWT secret).
5. Run the Flask server:

   ```bash
   flask run
   ```

### Frontend

1. Navigate to the frontend folder:

   ```bash
   cd frontend
   ```
2. Install dependencies:

   ```bash
   npm install
   ```
3. Start the React app:

   ```bash
   npm start
   ```

---

## API Routes Overview

* **Authentication**: `/register`, `/login`
* **Recipes**: `/recipes` (search & fetch from TheMealDB)
* **Bookmarks**: `/bookmark`, `/bookmarks`
* **Ratings**: `/rating`, `/ratings/<recipe_id>`
* **Comments**: `/comment`, `/comments/<recipe_id>`
* **Groups**: `/groups` (create, join, manage groups)

---

## Contributors

* Brigid Michelle Syondie
* Marylyne Otieno
* Emmanuel Ngetich
* Collins Nyambury
