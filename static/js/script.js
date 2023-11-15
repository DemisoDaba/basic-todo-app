/* static/js/script.js */

document.addEventListener('DOMContentLoaded', function() {
    // DOMContentLoaded ensures that the script runs after the HTML has been completely loaded

    // Example: Add a task when the form is submitted
    const form = document.querySelector('form');
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission

        // Get task input values
        const taskInput = document.getElementById('task');
        const descriptionInput = document.getElementById('description');
        const dueDateInput = document.getElementById('dueDate');
        const priorityInput = document.getElementById('priority');

        const taskText = taskInput.value.trim();
        const descriptionText = descriptionInput.value.trim();
        const dueDateText = dueDateInput.value;
        const priorityText = priorityInput.value;

        // Check if the task text is not empty
        if (taskText !== '') {
            // Create a new task item
            const taskList = document.querySelector('.task-list');
            const newTaskItem = document.createElement('li');
            newTaskItem.classList.add('task-item');
            newTaskItem.innerHTML = `
                <span>${taskText}</span>
                <span>Description: ${descriptionText}</span>
                <span>Due Date: ${dueDateText}</span>
                <span>Priority: ${priorityText}</span>
                <button>Edit</button>
                <button>Delete</button>
            `;

            // Append the new task item to the task list
            taskList.appendChild(newTaskItem);

            // Clear the task input
            taskInput.value = '';
            descriptionInput.value = '';
            dueDateInput.value = '';
            priorityInput.value = 'low'; // Set default priority
        }
    });

    // Example: Edit a task when the edit button is clicked
    document.addEventListener('click', function(event) {
        if (event.target.tagName === 'BUTTON' && event.target.textContent === 'Edit') {
            const taskItem = event.target.closest('.task-item');
            if (taskItem) {
                // Implement logic for editing task details
                const taskText = taskItem.querySelector('span').textContent;
                const descriptionText = taskItem.querySelector('span:nth-child(2)').textContent;
                const dueDateText = taskItem.querySelector('span:nth-child(3)').textContent;
                const priorityText = taskItem.querySelector('span:nth-child(4)').textContent;

                // Use prompt or modal for user input
                const newTaskText = prompt('Edit Task:', taskText);
                const newDescriptionText = prompt('Edit Description:', descriptionText);
                const newDueDateText = prompt('Edit Due Date:', dueDateText);
                const newPriorityText = prompt('Edit Priority:', priorityText);

                if (newTaskText !== null) {
                    taskItem.querySelector('span').textContent = newTaskText;
                    taskItem.querySelector('span:nth-child(2)').textContent = `Description: ${newDescriptionText}`;
                    taskItem.querySelector('span:nth-child(3)').textContent = `Due Date: ${newDueDateText}`;
                    taskItem.querySelector('span:nth-child(4)').textContent = `Priority: ${newPriorityText}`;
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
