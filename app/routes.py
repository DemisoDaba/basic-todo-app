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
