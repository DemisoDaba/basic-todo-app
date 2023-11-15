/* static/js/script.js */

document.addEventListener('DOMContentLoaded', function() {
    // DOMContentLoaded ensures that the script runs after the HTML has been completely loaded

    // Function to fetch tasks from the backend and update the task list
    function fetchTasks() {
        fetch('/get_tasks')
            .then(response => response.json())
            .then(data => {
                const taskList = document.querySelector('.task-list');
                taskList.innerHTML = ''; // Clear existing tasks

                // Iterate through tasks and create task items
                data.tasks.forEach(task => {
                    const newTaskItem = document.createElement('li');
                    newTaskItem.classList.add('task-item');
                    newTaskItem.innerHTML = `
                        <span>${task.title}</span>
                        <button class="edit-btn" data-id="${task.id}">Edit</button>
                        <button class="delete-btn" data-id="${task.id}">Delete</button>
                    `;
                    taskList.appendChild(newTaskItem);
                });
            })
            .catch(error => console.error('Error:', error));
    }

    // Fetch tasks when the page loads
    fetchTasks();

    // Example: Add a task when the form is submitted
    const form = document.querySelector('form');
    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const taskInput = document.getElementById('task');
        const taskText = taskInput.value.trim();

        if (taskText !== '') {
            // Use AJAX to send a request to the backend to create a task
            fetch('/create_task', {
                method: 'POST',
                body: new URLSearchParams({ 'title': taskText }),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            })
            .then(response => response.json())
            .then(data => {
                console.log(data.message);
                // Fetch and update tasks after creating a new task
                fetchTasks();
                // Clear the task input
                taskInput.value = '';
            })
            .catch(error => console.error('Error:', error));
        }
    });

    // Example: Edit a task when the edit button is clicked
    document.addEventListener('click', function(event) {
        if (event.target.classList.contains('edit-btn')) {
            const taskId = event.target.dataset.id;
            const taskText = prompt('Edit Task:');
            if (taskText !== null) {
                // Use AJAX to send a request to the backend to edit a task
                fetch(`/edit_task/${taskId}`, {
                    method: 'PUT',
                    body: new URLSearchParams({ 'title': taskText }),
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                })
                .then(response => response.json())
                .then(data => {
                    console.log(data.message);
                    // Fetch and update tasks after editing a task
                    fetchTasks();
                })
                .catch(error => console.error('Error:', error));
            }
        }
    });

    // Example: Delete a task when the delete button is clicked
    document.addEventListener('click', function(event) {
        if (event.target.classList.contains('delete-btn')) {
            const taskId = event.target.dataset.id;
            // Use AJAX to send a request to the backend to delete a task
            fetch(`/delete_task/${taskId}`, {
                method: 'DELETE',
            })
            .then(response => response.json())
            .then(data => {
                console.log(data.message);
                // Fetch and update tasks after deleting a task
                fetchTasks();
            })
            .catch(error => console.error('Error:', error));
        }
    });
});
