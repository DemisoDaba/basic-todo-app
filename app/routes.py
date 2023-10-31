from app import app, db
from app.models import Task
from flask import render_template, request, redirect, flash

# List Tasks
@app.route('/tasks')
def list_tasks():
    tasks = Task.query.all()  # Retrieve tasks from the database (if using a database)
    return render_template('task_list.html', tasks=tasks)

# Create a New Task
@app.route('/tasks/new', methods=['GET', 'POST'])
def create_task():
    if request.method == 'POST':
        # Process the form data and create a new task
        title = request.form['title']
        description = request.form['description']
        # Handle due date and other task attributes

        # Example: Create a task in the database (if using a database)
        new_task = Task(title=title, description=description)
        db.session.add(new_task)
        db.session.commit()

        flash('Task created successfully!', 'success')
        return redirect('/tasks')

    return render_template('create_task.html')

# Mark a Task as Complete
@app.route('/tasks/complete/<int:task_id>')
def complete_task(task_id):
    task = Task.query.get(task_id)  # Retrieve the task by its ID
    task.completed = True  # Update the task's completion status
    db.session.commit()  # Commit the changes
    flash('Task marked as complete!', 'success')
    return redirect('/tasks')

# Edit a Task
@app.route('/tasks/edit/<int:task_id>', methods=['GET', 'POST'])
def edit_task(task_id):
    task = Task.query.get(task_id)  # Retrieve the task by its ID

    if request.method == 'POST':
        # Process the form data and update the task
        task.title = request.form['title']
        task.description = request.form['description']
        # Update due date and other task attributes

        db.session.commit()  # Commit the changes
        flash('Task updated successfully!', 'success')
        return redirect('/tasks')

    return render_template('edit_task.html', task=task)
