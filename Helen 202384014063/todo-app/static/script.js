/* ------------------------------------------------------------------
   Front-end logic for the task manager.

   Every action talks to the Flask API:
     GET    /api/tasks            -> fetch all tasks
     POST   /api/tasks            -> add a task
     PATCH  /api/tasks/<id>       -> mark done / undone
     DELETE /api/tasks/<id>       -> delete a task
   ------------------------------------------------------------------ */

const API_URL = "/api/tasks";

const form = document.getElementById("task-form");
const input = document.getElementById("task-input");
const list = document.getElementById("task-list");
const emptyMessage = document.getElementById("empty-message");
const taskCount = document.getElementById("task-count");

/** Fetch all tasks from the server and render them. */
async function loadTasks() {
  try {
    const response = await fetch(API_URL);
    const tasks = await response.json();
    renderTasks(tasks);
  } catch (error) {
    console.error("Failed to load tasks:", error);
  }
}

/** Build the list items from an array of task objects. */
function renderTasks(tasks) {
  list.innerHTML = "";

  tasks.forEach((task) => {
    const item = document.createElement("li");
    item.className = "task-item" + (task.completed ? " completed" : "");

    // Checkbox: toggles the completed state
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.addEventListener("change", () => toggleTask(task.id, checkbox.checked));

    // Task text
    const title = document.createElement("span");
    title.className = "task-title";
    title.textContent = task.title;

    // Delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", () => deleteTask(task.id));

    item.append(checkbox, title, deleteBtn);
    list.appendChild(item);
  });

  // Show the empty message only when there is nothing to list
  emptyMessage.classList.toggle("hidden", tasks.length > 0);

  // Update the counter in the footer
  const remaining = tasks.filter((t) => !t.completed).length;
  taskCount.textContent =
    tasks.length === 0
      ? "0 tasks"
      : `${remaining} open / ${tasks.length} total`;
}

/** Send a new task to the server. */
async function addTask(title) {
  try {
    await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    });
    await loadTasks(); // Refresh the list from the server
  } catch (error) {
    console.error("Failed to add task:", error);
  }
}

/** Mark a task as completed or not completed. */
async function toggleTask(id, completed) {
  try {
    await fetch(`${API_URL}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed }),
    });
    await loadTasks();
  } catch (error) {
    console.error("Failed to update task:", error);
  }
}

/** Delete a task after the user confirms. */
async function deleteTask(id) {
  try {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    await loadTasks();
  } catch (error) {
    console.error("Failed to delete task:", error);
  }
}

// Handle the "Add" form submission
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const title = input.value.trim();
  if (!title) return;
  addTask(title);
  input.value = ""; // Clear the input for the next task
  input.focus();
});

// Initial load when the page opens
loadTasks();

// AI declaration: Part of this code was generated with the assistance of DeepSeek AI.
