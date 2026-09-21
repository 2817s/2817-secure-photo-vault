import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "./api";

import "./Tasks.css";

function Tasks() {
  const navigate = useNavigate();

  const [tasks, setTasks] = useState([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [actionLoading, setActionLoading] = useState(false);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getTasks();

      setTasks(data);
    } catch (err) {
      console.error(err);

      if (err.message !== "Session expired. Please login again.") {
        setError("Unable to load tasks. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async (event) => {
    event.preventDefault();

    if (!title.trim()) {
      setError("Task title is required.");
      return;
    }

    try {
      setActionLoading(true);
      setError("");

      await createTask({
        title,
        description,
        completed: false,
      });

      setTitle("");
      setDescription("");

      await fetchTasks();
    } catch (err) {
      console.error(err);

      if (err.message !== "Session expired. Please login again.") {
        setError(err.message || "Unable to create task. Please try again.");
      }
    } finally {
      setActionLoading(false);
    }
  };

  const toggleTask = async (task) => {
    try {
      setActionLoading(true);
      setError("");

      await updateTask(task._id, {
        completed: !task.completed,
      });

      await fetchTasks();
    } catch (err) {
      console.error(err);

      if (err.message !== "Session expired. Please login again.") {
        setError(err.message || "Unable to update task. Please try again.");
      }
    } finally {
      setActionLoading(false);
    }
  };

  const removeTask = async (id) => {
    try {
      setActionLoading(true);
      setError("");

      await deleteTask(id);

      await fetchTasks();
    } catch (err) {
      console.error(err);

      if (err.message !== "Session expired. Please login again.") {
        setError(err.message || "Unable to delete task. Please try again.");
      }
    } finally {
      setActionLoading(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("authToken");
    navigate("/login");
  };

  return (
    <div className="tasks-page">
      <div className="tasks-header">
        <div>
          <p className="tasks-label">SECURE PHOTO VAULT</p>

          <h1>Task Manager</h1>

          <p className="tasks-subtitle">
            Organize your tasks and stay productive.
          </p>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <div className="tasks-count">
            {tasks.length}{" "}
            {tasks.length === 1 ? "Task" : "Tasks"}
          </div>

          <button
            onClick={handleLogout}
            style={{
              padding: "8px 14px",
              border: "1px solid #d1d5db",
              borderRadius: "8px",
              background: "white",
              color: "#374151",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            Logout
          </button>
        </div>
      </div>

      {error && (
        <div className="task-error">
          <span>{error}</span>

          <button onClick={fetchTasks}>
            Retry
          </button>
        </div>
      )}

      <div className="task-form-card">
        <h2>Add New Task</h2>

        <form
          onSubmit={addTask}
          className="task-form"
        >
          <input
            type="text"
            placeholder="Task title"
            value={title}
            onChange={(event) =>
              setTitle(event.target.value)
            }
            disabled={actionLoading}
          />

          <input
            type="text"
            placeholder="Task description"
            value={description}
            onChange={(event) =>
              setDescription(event.target.value)
            }
            disabled={actionLoading}
          />

          <button
            type="submit"
            className="add-task-button"
            disabled={actionLoading}
          >
            {actionLoading
              ? "Processing..."
              : "+ Add Task"}
          </button>
        </form>
      </div>

      <div className="task-list-card">
        <div className="task-list-header">
          <h2>Your Tasks</h2>

          <span>
            {tasks.length} Total
          </span>
        </div>

        {loading ? (
          <div className="empty-tasks">
            <div className="loading-spinner"></div>

            <h3>Loading tasks...</h3>

            <p>
              Please wait while we retrieve your tasks.
            </p>
          </div>
        ) : tasks.length === 0 ? (
          <div className="empty-tasks">
            <div className="empty-icon">
              ✓
            </div>

            <h3>No tasks found</h3>

            <p>
              Add your first task above to get started.
            </p>
          </div>
        ) : (
          <div className="task-list">
            {tasks.map((task) => (
              <div
                key={task._id}
                className={`task-item ${
                  task.completed
                    ? "task-completed"
                    : ""
                }`}
              >
                <div className="task-content">
                  <h3>{task.title}</h3>

                  {task.description && (
                    <p>{task.description}</p>
                  )}

                  <span
                    className={`task-status ${
                      task.completed
                        ? "completed"
                        : "pending"
                    }`}
                  >
                    {task.completed
                      ? "Completed"
                      : "Pending"}
                  </span>
                </div>

                <div className="task-actions">
                  <button
                    className="complete-button"
                    onClick={() =>
                      toggleTask(task)
                    }
                    disabled={actionLoading}
                  >
                    {task.completed
                      ? "↩ Mark Pending"
                      : "✓ Mark Complete"}
                  </button>

                  <button
                    className="delete-button"
                    onClick={() =>
                      removeTask(task._id)
                    }
                    disabled={actionLoading}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Tasks;