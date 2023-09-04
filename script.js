// Get elements from the DOM
const taskNameInput = document.getElementById("taskName");
const taskDescriptionInput = document.getElementById("taskDescription");
const taskDateTimeInput = document.getElementById("taskDateTime");
const taskPriorityInput = document.getElementById("taskPriority");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

// Variables for edit form and task list.
const editTaskForm = document.getElementById("editTaskForm");
const editTaskNameInput = document.getElementById("editTaskName");
const editTaskDescriptionInput = document.getElementById("editTaskDescription");
const editTaskDateTimeInput = document.getElementById("editTaskDateTime");
const editTaskPriorityInput = document.getElementById("editTaskPriority");
const updateTaskBtn = document.getElementById("updateTaskBtn");
let editingTask = null; // Stores the task currently being edited.

// Event listener for adding tasks
addTaskBtn.addEventListener("click", addTask);

// Click event on the "Add Task" button.
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

    // Updates Local Storage
    updateLocalStorage();
}

// Click event on the "Complete" button of an existing task
function editTask(taskDiv) {
    const taskDetails = taskDiv.querySelector(".task-details");
    const taskName = taskDetails.querySelector("h3").textContent;
    const taskDescription = taskDetails.querySelector("p:nth-child(2)").textContent;
    const taskDateTime = taskDetails.querySelector("p:nth-child(3)").textContent;
    const taskPriority = taskDiv.classList[1];

    // Fills the edit form with the task data
    editTaskNameInput.value = taskName;
    editTaskDescriptionInput.value = taskDescription;
    editTaskDateTimeInput.value = taskDateTime;
    editTaskPriorityInput.value = taskPriority;

    // Displays the edit form and stores the task being edited
    editTaskForm.style.display = "block";
    editingTask = taskDiv;

    // Adds a click event to update the task
    updateTaskBtn.addEventListener("click", updateTask);
}

// Click event on the "Update Task" button in the edit form
function updateTask() {
    const taskName = editTaskNameInput.value;
    const taskDescription = editTaskDescriptionInput.value;
    const taskDateTime = editTaskDateTimeInput.value;
    const taskPriority = editTaskPriorityInput.value;

    if (!taskName || !taskDateTime) {
        alert("Please fill in both task name and date/time.");
        return;
    }

    const taskDetails = editingTask.querySelector(".task-details");
    taskDetails.querySelector("h3").textContent = taskName;
    taskDetails.querySelector("p:nth-child(2)").textContent = taskDescription;
    taskDetails.querySelector("p:nth-child(3)").textContent = taskDateTime;

    editingTask.classList.remove("urgent", "important", "pending");
    editingTask.classList.add(taskPriority);

    editTaskForm.style.display = "none";
    editingTask = null;

    editTaskNameInput.value = "";
    editTaskDescriptionInput.value = "";
    editTaskDateTimeInput.value = "";
    editTaskPriorityInput.value = "urgent";

    // Updates Local Storage
    updateLocalStorage();
}

// Click the event on the "Complete" button of an existing task
function completeTask(taskDiv) {
    taskList.removeChild(taskDiv);
    updateLocalStorage();
}

// Load tasks from Local Storage when loading the page
window.addEventListener("load", () => {
    const tasks = getTasksFromLocalStorage();
    tasks.forEach(task => {
        addTaskToUI(task);
    });
});

// Function to add a task to the UI
function addTaskToUI(task) {
    const taskDiv = document.createElement("div");
    taskDiv.classList.add("task", task.priority);
    taskDiv.innerHTML = `
        <div class="task-details">
            <h3>${task.name}</h3>
            <p>${task.description}</p>
            <p>${task.dateTime}</p>
        </div>
        <div class="task-buttons">
            <button class="edit-btn">Edit</button>
            <button class="complete-btn">Complete</button>
        </div>
    `;

    const editBtn = taskDiv.querySelector(".edit-btn");
    editBtn.addEventListener("click", () => editTask(taskDiv));

    const completeBtn = taskDiv.querySelector(".complete-btn");
    completeBtn.addEventListener("click", () => completeTask(taskDiv));

    taskList.appendChild(taskDiv);
}

// Function to get the tasks stored in Local Storage
function getTasksFromLocalStorage() {
    const tasksJSON = localStorage.getItem("tasks");
    return tasksJSON ? JSON.parse(tasksJSON) : [];
}

// Function to save tasks in Local Storage
function updateLocalStorage() {
    const tasks = Array.from(taskList.children).map(taskDiv => {
        return {
            name: taskDiv.querySelector(".task-details h3").textContent,
            description: taskDiv.querySelector(".task-details p:nth-child(2)").textContent,
            dateTime: taskDiv.querySelector(".task-details p:nth-child(3)").textContent,
            priority: taskDiv.classList[1],
        };
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
}