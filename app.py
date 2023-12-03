# app.py

from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

# Placeholder for tasks (you should replace this with a database)
tasks = [{'id': 1, 'title': 'Example Task'}]

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/get_tasks', methods=['GET'])
def get_tasks():
    return jsonify({'tasks': tasks})

@app.route('/create_task', methods=['POST'])
def create_task():
    new_task_title = request.form.get('title')
    new_task_id = len(tasks) + 1
    new_task = {'id': new_task_id, 'title': new_task_title}
    tasks.append(new_task)
    return jsonify({'message': 'Task created successfully'})

@app.route('/edit_task/<int:task_id>', methods=['PUT'])
def edit_task(task_id):
    edited_task_title = request.form.get('title')
    for task in tasks:
        if task['id'] == task_id:
            task['title'] = edited_task_title
            return jsonify({'message': 'Task edited successfully'})
    return jsonify({'error': 'Task not found'}), 404

@app.route('/complete_task/<int:task_id>', methods=['PUT'])
def complete_task(task_id):
    completed = request.json.get('completed')
    for task in tasks:
        if task['id'] == task_id:
            task['completed'] = completed
            return jsonify({'message': 'Task marked as completed'})
    return jsonify({'error': 'Task not found'}), 404

@app.route('/delete_task/<int:task_id>', methods=['DELETE'])
def delete_task(task_id):
    global tasks
    tasks = [task for task in tasks if task['id'] != task_id]
    return jsonify({'message': 'Task deleted successfully'})

if __name__ == '__main__':
    app.run(debug=True)
