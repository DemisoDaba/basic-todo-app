/* static/js/script.js */

document.addEventListener('DOMContentLoaded', function() {
    // DOMContentLoaded ensures that the script runs after the HTML has been completely loaded

    // Example: Add a task when the form is submitted
    const form = document.querySelector('form');
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission

        // Get the task input value
        const taskInput = document.getElementById('task');
        const taskText = taskInput.value.trim();

        // Check if the task text is not empty
        if (taskText !== '') {
            // Create a new task item
            const taskList = document.querySelector('.task-list');
            const newTaskItem = document.createElement('li');
            newTaskItem.classList.add('task-item');
            newTaskItem.innerHTML = `
                <span>${taskText}</span>
                <button>Edit</button>
                <button>Delete</button>
            `;

            // Append the new task item to the task list
            taskList.appendChild(newTaskItem);

            // Clear the task input
            taskInput.value = '';
        }
    });

    // Example: Edit a task when the edit button is clicked
    document.addEventListener('click', function(event) {
        if (event.target.tagName === 'BUTTON' && event.target.textContent === 'Edit') {
            const taskItem = event.target.closest('.task-item');
            if (taskItem) {
                const taskText = taskItem.querySelector('span').textContent;
                const newTaskText = prompt('Edit Task:', taskText);
                if (newTaskText !== null) {
                    taskItem.querySelector('span').textContent = newTaskText;
                }
            }
        }
    });

    // Example: Delete a task when the delete button is clicked
    document.addEventListener('click', function(event) {
        if (event.target.tagName === 'BUTTON' && event.target.textContent === 'Delete') {
            const taskItem = event.target.closest('.task-item');
            if (taskItem) {
                taskItem.remove();
            }
        }
    });
});

