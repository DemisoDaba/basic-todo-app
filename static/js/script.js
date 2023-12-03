// Function to update task completion status
function updateTaskCompletion(taskId, completed) {
    // Use AJAX to send a request to the backend to mark a task as completed
    fetch(`/complete_task/${taskId}`, {
        method: 'PUT',
        body: JSON.stringify({ 'completed': completed }),
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => response.json())
    .then(data => {
        console.log(data.message);
        // Fetch and update tasks after marking a task as completed
        fetchTasks();
    })
    .catch(error => console.error('Error:', error));
}

// Example: Mark a task as completed when the checkbox is clicked
document.addEventListener('change', function(event) {
    if (event.target.matches('.complete-checkbox')) {
        const taskId = event.target.dataset.id;
        const isChecked = event.target.checked;
        updateTaskCompletion(taskId, isChecked);
    }
});
