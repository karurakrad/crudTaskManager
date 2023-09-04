// Get elements from the DOM
const taskNameInput = document.getElementById("taskName");
const taskDescriptionInput = document.getElementById("taskDescription");
const taskDateTimeInput = document.getElementById("taskDateTime");
const taskPriorityInput = document.getElementById("taskPriority");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

// Global variable to track the task being edited
let editingTaskDiv = null;

// Event listener for adding tasks
addTaskBtn.addEventListener("click", addTask);

// Add a new task or update an existing one
function addTask() {
    const taskName = taskNameInput.value;
    const taskDescription = taskDescriptionInput.value;
    const taskDateTime = taskDateTimeInput.value;
    const taskPriority = taskPriorityInput.value;

    if (!taskName || !taskDateTime) {
        alert("Please fill in both task name and date/time.");
        return;
    }

    if (editingTaskDiv) {
        // Update an existing task
        const taskDetails = editingTaskDiv.querySelector(".task-details");
        taskDetails.querySelector("h3").textContent = taskName;
        taskDetails.querySelectorAll("p")[0].textContent = taskDescription;
        taskDetails.querySelectorAll("p")[1].textContent = taskDateTime;

        // Update the priority class
        editingTaskDiv.classList.remove("urgent", "important", "pending");
        editingTaskDiv.classList.add(taskPriority);

        // Reset the editing task
        editingTaskDiv = null;
    } else {
        // Add a new task
        const taskDiv = document.createElement("div");
        taskDiv.classList.add("task", taskPriority); // Add priority class for background color
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
    }

    // Clear input fields
    taskNameInput.value = "";
    taskDescriptionInput.value = "";
    taskDateTimeInput.value = "";
    taskPriorityInput.value = "urgent";

    // Save tasks to local storage
    saveTasksToLocalStorage();
}

// Edit a task
function editTask(taskDiv) {
    // Populate the input fields with the task details for editing
    const taskDetails = taskDiv.querySelector(".task-details");
    const taskName = taskDetails.querySelector("h3").textContent;
    const taskDescription = taskDetails.querySelectorAll("p")[0].textContent;
    const taskDateTime = taskDetails.querySelectorAll("p")[1].textContent;
    const taskPriority = taskDiv.classList[1]; // Get priority class

    taskNameInput.value = taskName;
    taskDescriptionInput.value = taskDescription;
    taskDateTimeInput.value = taskDateTime;
    taskPriorityInput.value = taskPriority;

    // Save a reference to the task being edited
    editingTaskDiv = taskDiv;
}

// Complete a task and remove it from the list
function completeTask(taskDiv) {
    taskList.removeChild(taskDiv);

    // Save tasks to local storage after completing a task
    saveTasksToLocalStorage();
}

// Load saved tasks on page load (if available)
window.addEventListener("load", () => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];

    savedTasks.forEach(taskData => {
        const taskDiv = document.createElement("div");
        taskDiv.classList.add("task");
        taskDiv.classList.add(taskData.taskPriority); // Add priority class
        taskDiv.innerHTML = `
            <div class="task-details">
                <h3>${taskData.taskName}</h3>
                <p>${taskData.taskDescription}</p>
                <p>${taskData.taskDateTime}</p>
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
    });
});

// Save tasks to local storage when a task is added or edited
function saveTasksToLocalStorage() {
    const tasks = [];

    // Loop through all task divs and save their data
    const taskDivs = taskList.querySelectorAll(".task");
    taskDivs.forEach(taskDiv => {
        const taskDetails = taskDiv.querySelector(".task-details");
        const taskName = taskDetails.querySelector("h3").textContent;
        const taskDescription = taskDetails.querySelectorAll("p")[0].textContent;
        const taskDateTime = taskDetails.querySelectorAll("p")[1].textContent;
        const taskPriority = taskDiv.classList[1]; // Get priority class

        tasks.push({
            taskName,
            taskDescription,
            taskDateTime,
            taskPriority,
        });
    });

    // Save the tasks array to local storage
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Add event listeners to input fields to save tasks on change
taskNameInput.addEventListener("change", saveTasksToLocalStorage);
taskDescriptionInput.addEventListener("change", saveTasksToLocalStorage);
taskDateTimeInput.addEventListener("change", saveTasksToLocalStorage);
taskPriorityInput.addEventListener("change", saveTasksToLocalStorage);