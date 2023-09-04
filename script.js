document.addEventListener("DOMContentLoaded", function () {
    const taskForm = document.querySelector(".task-form");
    const taskList = document.querySelector(".task-list");

    const tasks = [];

    function renderTasks() {
        taskList.innerHTML = "";
        if (tasks.length === 0) {
            taskList.innerHTML = "<p>No tasks yet.</p>";
        } else {
            tasks.forEach((task, index) => {
                const taskItem = document.createElement("div");
                taskItem.classList.add("task");
                taskItem.style.borderColor = task.priority;

                const taskInfo = document.createElement("div");
                taskInfo.innerHTML = `
                    <p><strong>Name:</strong> ${task.name}</p>
                    <p><strong>Description:</strong> ${task.description}</p>
                    <p><strong>Date & Time:</strong> ${task.dateTime}</p>
                `;

                const actions = document.createElement("div");
                actions.classList.add("actions");
                actions.innerHTML = `
                    <button class="btn btn-success btn-sm" data-index="${index}">Complete</button>
                    <button class="btn btn-primary btn-sm" data-index="${index}">Edit</button>
                    <button class="btn btn-danger btn-sm" data-index="${index}">Delete</button>
                `;

                taskItem.appendChild(taskInfo);
                taskItem.appendChild(actions);
                taskList.appendChild(taskItem);
            });
        }
    }

    taskForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const taskName = document.getElementById("taskName").value;
        const taskDescription = document.getElementById("taskDescription").value;
        const taskDateTime = document.getElementById("taskDateTime").value;
        const taskPriority = document.getElementById("taskPriority").value;

        tasks.push({
            name: taskName,
            description: taskDescription,
            dateTime: taskDateTime,
            priority: taskPriority
        });

        renderTasks();

        // Reset form fields
        taskForm.reset();
    });

    taskList.addEventListener("click", function (event) {
        if (event.target.classList.contains("btn-danger")) {
            const index = event.target.getAttribute("data-index");
            tasks.splice(index, 1);
            renderTasks();
        } else if (event.target.classList.contains("btn-success")) {
            const index = event.target.getAttribute("data-index");
            tasks.splice(index, 1);
            renderTasks();
        } else if (event.target.classList.contains("btn-primary")) {
            const index = event.target.getAttribute("data-index");
            // Pendant to implement edit functionality
        }
    });

    renderTasks();
});