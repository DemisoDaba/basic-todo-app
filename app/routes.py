from app import app, db
from flask import render_template

# Define your routes here
@app.route('/')
def index():
    return render_template('index.html')
