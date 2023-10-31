from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

# Configure the database URI (replace 'sqlite:///your-database-name.db' with your actual database URI)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///your-database-name.db'

# Initialize the SQLAlchemy extension
db = SQLAlchemy(app)

# Additional configurations (e.g., secret key, session configuration) can be added here.

# Import the routes module to include route handlers
from app import routes

