# app.py

from flask import Flask, render_template, request, redirect, url_for
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///tasks.db'
db = SQLAlchemy()

class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text)
    due_date = db.Column(db.Date)
    priority = db.Column(db.String(20))
    completed = db.Column(db.Boolean, default=False)

@app.route('/')
def index():
    tasks = Task.query.all()
    return render_template('index.html', tasks=tasks)

@app.route('/add', methods=['POST'])
def add_task():
    title = request.form['title']
    description = request.form['description']
    due_date = request.form['due_date']
    priority = request.form['priority']

    task = Task(title=title, description=description, due_date=due_date, priority=priority, completed=False)
    db.session.add(task)
    db.session.commit()

    return redirect(url_for('index'))

@app.route('/edit/<int:task_id>', methods=['GET', 'POST'])
def edit_task(task_id):
    task = Task.query.get(task_id)

    if request.method == 'POST':
        task.title = request.form['title']
        task.description = request.form['description']
        task.due_date = request.form['due_date']
        task.priority = request.form['priority']
        task.completed = 'completed' in request.form  # Adjust based on your form structure
        db.session.commit()
        return redirect(url_for('index'))

    return render_template('edit.html', task=task)

@app.route('/delete/<int:task_id>')
def delete_task(task_id):
    task = Task.query.get(task_id)
    db.session.delete(task)
    db.session.commit()
    return redirect(url_for('index'))

if __name__ == '__main__':
    db.init_app(app)
    with app.app_context():
        db.create_all()
    app.run(debug=True)
