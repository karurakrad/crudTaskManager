// Get elements from the DOM
const taskNameInput = document.getElementById("taskName");
const taskDescriptionInput = document.getElementById("taskDescription");
const taskDateTimeInput = document.getElementById("taskDateTime");
const taskPriorityInput = document.getElementById("taskPriority");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

// Event listener for adding tasks
addTaskBtn.addEventListener("click", addTask);

// Add a new task to the list
function addTask() {
    const taskName = taskNameInput.value;
    const taskDescription = taskDescriptionInput.value;
    const taskDateTime = taskDateTimeInput.value;
    const taskPriority = taskPriorityInput.value;

    if (!taskName || !taskDateTime) {
        alert("Please fill in both task name and date/time.");
        return;
    }

    const taskDiv = document.createElement("div");
    taskDiv.classList.add("task", taskPriority);
    taskDiv.innerHTML = `
        <div class="task-details">
            <h3>${taskName}</h3>
            <p>${taskDescription}</p>
            <p>${taskDateTime}</p>
        </div>
        <div class="task-buttons">
            <button class="edit-btn">Edit</button>
            <button class="complete-btn">Complete</button>
        </div>
    `;

    // Attach event listeners to the task buttons
    const editBtn = taskDiv.querySelector(".edit-btn");
    editBtn.addEventListener("click", () => editTask(taskDiv));

    const completeBtn = taskDiv.querySelector(".complete-btn");
    completeBtn.addEventListener("click", () => completeTask(taskDiv));

    taskList.appendChild(taskDiv);

    // Clear input fields
    taskNameInput.value = "";
    taskDescriptionInput.value = "";
    taskDateTimeInput.value = "";
    taskPriorityInput.value = "urgent";
}

// Edit a task
function editTask(taskDiv) {
    // Pending to implement task editing logic here
}

// Complete a task
function completeTask(taskDiv) {
    taskList.removeChild(taskDiv);
}

// Load saved tasks on page load (if available)
window.addEventListener("load", () => {
    // Pending to implement task loading logic here
});