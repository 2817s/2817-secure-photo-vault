import { useEffect, useState } from "react";

const API_URL = "http://localhost:5000/tasks";

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // Get all tasks
  const fetchTasks = async () => {
    try {
      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error("Failed to fetch tasks");
      }

      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  // Load tasks when page opens
  useEffect(() => {
    fetchTasks();
  }, []);

  // Add a new task
  const addTask = async (event) => {
    event.preventDefault();

    if (!title.trim()) {
      alert("Please enter a task title");
      return;
    }

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          completed: false,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add task");
      }

      setTitle("");
      setDescription("");

      fetchTasks();
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  // Mark task completed/uncompleted
  const toggleTask = async (task) => {
    try {
      const response = await fetch(`${API_URL}/${task._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          completed: !task.completed,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update task");
      }

      fetchTasks();
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  // Delete task
  const deleteTask = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete task");
      }

      fetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div>
      <h1>Task Manager</h1>

      {/* Add Task Form */}
      <form onSubmit={addTask}>
        <input
          type="text"
          placeholder="Task title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />

        <input
          type="text"
          placeholder="Task description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />

        <button type="submit">Add Task</button>
      </form>

      <hr />

      {/* Task List */}
      {tasks.length === 0 ? (
        <p>No tasks found.</p>
      ) : (
        tasks.map((task) => (
          <div key={task._id}>
            <h2>{task.title}</h2>

            <p>{task.description}</p>

            <p>
              Status: {task.completed ? "Completed" : "Pending"}
            </p>

            <button onClick={() => toggleTask(task)}>
              {task.completed ? "Mark Pending" : "Mark Completed"}
            </button>

            <button onClick={() => deleteTask(task._id)}>
              Delete
            </button>

            <hr />
          </div>
        ))
      )}
    </div>
  );
}

export default Tasks;