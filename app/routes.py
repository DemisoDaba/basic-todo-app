from app import app, db
from flask import render_template, request, redirect, url_for
from app.models import Task

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/tasks')
def task_list():
    tasks = Task.query.all()
    return render_template('task_list.html', tasks=tasks)

@app.route('/create_task', methods=['POST', 'GET'])
def create_task():
    if request.method == 'POST':
        title = request.form['title']
        task = Task(title=title)
        db.session.add(task)
        db.session.commit()
        return redirect(url_for('task_list'))
    return render_template('create_task.html')

@app.route('/edit_task/<int:id>', methods=['POST', 'GET'])
def edit_task(id):
    task = Task.query.get(id)
    if request.method == 'POST':
        task.title = request.form['title']
        db.session.commit()
        return redirect(url_for('task_list'))
    return render_template('edit_task.html', task=task)
