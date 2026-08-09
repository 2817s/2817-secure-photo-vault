import { useEffect, useState } from "react";

function Tasks() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/tasks")
      .then((response) => response.json())
      .then((data) => {
        setTasks(data);
      })
      .catch((error) => {
        console.error("Error fetching tasks:", error);
      });
  }, []);

  return (
    <div>
      <h1>Task Manager</h1>

      {tasks.map((task) => (
        <div key={task.id}>
          <h2>{task.title}</h2>
          <p>{task.description}</p>

          <p>
            Status: {task.completed ? "Completed" : "Pending"}
          </p>
        </div>
      ))}
    </div>
  );
}

export default Tasks;