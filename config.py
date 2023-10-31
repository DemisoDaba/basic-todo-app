import os

class Config:
    # Flask configurations
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'your-secret-key'
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or 'sqlite:///your-database-name.db'
    SQLALCHEMY_TRACK_MODIFICATIONS = False  # Disable modification tracking

    # Other configurations
    DEBUG = False  # Set to True for development, but use environment variables in production
