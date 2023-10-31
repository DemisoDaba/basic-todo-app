from app import app, db
from app.models import Task
from flask import render_template, request, redirect, flash

# Root Route (Index Page)
@app.route('/')
def index():
    return render_template('index.html')

# List Tasks
@app.route('/tasks', methods=['GET'])
def list_tasks():
    tasks = Task.query.all()  # Retrieve tasks from the database (if using a database)
    return render_template('task_list.html', tasks=tasks)

# Create a New Task
@app.route('/tasks/new', methods=['GET', 'POST'])
def create_task():
    # ... (your other route definitions)

