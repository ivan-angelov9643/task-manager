const API_URL = "http://localhost:8080/api/tasks";

function addTaskRow(task) {
    const taskList = document.getElementById("task-list").getElementsByTagName('tbody')[0];

    const row = taskList.insertRow();
    row.id = `task-${task.id}`;
    row.innerHTML = `
        <td>${task.id}</td>
        <td>${task.title}</td>
        <td>${task.description}</td>
        <td><input type="checkbox" ${task.completed ? "checked" : ""} onchange="toggleCompletion('${task.id}', this.checked)"></td>
        <td>
            <button onclick="deleteTask('${task.id}')">Delete</button>
        </td>
    `;
}

async function fetchTasks() {
    const response = await fetch(API_URL);
    const tasks = await response.json();

    tasks.sort((a, b) => a.id - b.id);

    const taskList = document.getElementById("task-list").getElementsByTagName('tbody')[0];

    taskList.innerHTML = '';

    tasks.forEach(task => {
        addTaskRow(task);
    });
}

async function getTaskById() {
    const id = document.getElementById("task-id").value;
    if (!id) return alert("Please enter an ID");

    const response = await fetch(`${API_URL}/${id}`);
    if (response.ok) {
        const task = await response.json();
        document.getElementById("task-details").innerHTML = `
            <h3>Task Found</h3>
            <p><span class="property">ID:</span> ${task.id}</p>
            <p><span class="property">Title:</span> ${task.title}</p>
            <p><span class="property">Description:</span> ${task.description}</p>
            <p><span class="property">Completed:</span> ${task.completed}</p>
        `;
    } else {
        alert("Task not found!");
    }
}

async function createTask() {
    const title = document.getElementById("task-title").value;
    const description = document.getElementById("task-desc").value;
    if (!title) return alert("Title is required!");

    const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description, completed: false })
    });

    const createdTask = await response.json();

    addTaskRow(createdTask);

    document.getElementById("task-title").value = '';
    document.getElementById("task-desc").value = '';
}

function updateTaskRow(task) {
     const row = document.getElementById(`task-${task.id}`);
     if (row) {
         row.cells[1].innerHTML = task.title;
         row.cells[2].innerHTML = task.description;
         row.cells[3].innerHTML = `<input type="checkbox" ${task.completed ? "checked" : ""} onchange="toggleCompletion('${task.id}', this.checked)">`;
     }
 }

async function updateTask() {
    const id = document.getElementById("update-id").value;
    const title = document.getElementById("update-title").value;
    const description = document.getElementById("update-desc").value;

    if (!id) return alert("Task ID is required!");
    if (!title && !description) return alert("At least one of title or description must be provided!");

    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) return alert("Task not found!");

    const task = await response.json();

    const updatedTitle = title || task.title;
    const updatedDescription = description || task.description;

    const updatedTaskResponse = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            title: updatedTitle,
            description: updatedDescription,
            completed: false
        })
    });
    if (!response.ok) return alert("Task not found!");

    const updatedTask = await updatedTaskResponse.json();
    updateTaskRow(updatedTask);

    document.getElementById("update-id").value = '';
    document.getElementById("update-title").value = '';
    document.getElementById("update-desc").value = '';
}

async function toggleCompletion(id, completed) {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) {
        alert("Task not found!");
        return;
    }

    const task = await response.json();

    const updatedTaskResponse = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            title: task.title,
            description: task.description,
            completed: completed
        })
    });
    if (!response.ok) return alert("Task not found!");

    const updatedTask = await updatedTaskResponse.json();
    updateTaskRow(updatedTask);
}

async function deleteTask(id) {
    const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });

    if (response.ok) {
        const taskRow = document.getElementById(`task-${id}`);
        if (taskRow) {
            taskRow.remove();
        }
    } else {
        alert("Failed to delete task!");
    }
}

fetchTasks();
