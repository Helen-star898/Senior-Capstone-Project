"""
Lightweight Task Management System
Senior Capstone Project - Helen (202384014063)

Backend: Python + Flask
Data storage: in-memory list (data is lost when the server restarts)
"""

from flask import Flask, jsonify, render_template, request

app = Flask(__name__)

# ---------------------------------------------------------------------------
# In-memory task storage.
# NOTE: Tasks only live in this Python list while the server is running.
# Restarting the Flask server clears every task - there is no database yet.
# ---------------------------------------------------------------------------
tasks = []
next_id = 1  # Counter used to give every new task a unique id


def _find_task(task_id):
    """Return the task dict with the given id, or None if it does not exist."""
    for task in tasks:
        if task["id"] == task_id:
            return task
    return None


@app.route("/")
def index():
    """Render the single-page front end."""
    return render_template("index.html")


@app.route("/api/tasks", methods=["GET"])
def get_tasks():
    """Return the complete task list as JSON."""
    return jsonify(tasks)


@app.route("/api/tasks", methods=["POST"])
def add_task():
    """Create a new task from the JSON body {"title": "..."}."""
    global next_id
    data = request.get_json(silent=True) or {}
    title = (data.get("title") or "").strip()

    # Reject empty titles so the list never contains blank rows.
    if not title:
        return jsonify({"error": "Task title cannot be empty."}), 400

    task = {"id": next_id, "title": title, "completed": False}
    next_id += 1
    tasks.append(task)
    return jsonify(task), 201


@app.route("/api/tasks/<int:task_id>", methods=["PATCH"])
def update_task(task_id):
    """Toggle the completed flag of a task (used by the checkbox)."""
    task = _find_task(task_id)
    if task is None:
        return jsonify({"error": "Task not found."}), 404

    data = request.get_json(silent=True) or {}
    if "completed" in data:
        # Force the value to a real boolean instead of trusting the client.
        task["completed"] = bool(data["completed"])
    return jsonify(task)


@app.route("/api/tasks/<int:task_id>", methods=["DELETE"])
def delete_task(task_id):
    """Remove a task from the list."""
    task = _find_task(task_id)
    if task is None:
        return jsonify({"error": "Task not found."}), 404

    tasks.remove(task)
    return jsonify({"message": "Task deleted."})


if __name__ == "__main__":
    # debug=True reloads the server automatically while developing.
    app.run(debug=True)

# AI declaration: Part of this code was generated with the assistance of DeepSeek AI.
