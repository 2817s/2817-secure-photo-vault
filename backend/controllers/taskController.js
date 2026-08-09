// In-memory task storage
let tasks = [
  {
    id: 1,
    title: "Complete Practical 4",
    description: "Build the Express REST API",
    completed: false,
  },
];

// GET /tasks
const getTasks = (req, res) => {
  res.status(200).json(tasks);
};

// POST /tasks
const createTask = (req, res) => {
  const { title, description, completed } = req.body;

  if (!title) {
    return res.status(400).json({
      error: "Title is required",
    });
  }

  const newTask = {
    id: tasks.length > 0
      ? Math.max(...tasks.map((task) => task.id)) + 1
      : 1,
    title,
    description: description || "",
    completed: completed || false,
  };

  tasks.push(newTask);

  res.status(201).json(newTask);
};

// PUT /tasks/:id
const updateTask = (req, res) => {
  const id = Number(req.params.id);

  const task = tasks.find((task) => task.id === id);

  if (!task) {
    return res.status(404).json({
      error: "Task not found",
    });
  }

  const { title, description, completed } = req.body;

  if (title !== undefined) {
    task.title = title;
  }

  if (description !== undefined) {
    task.description = description;
  }

  if (completed !== undefined) {
    task.completed = completed;
  }

  res.status(200).json(task);
};

// DELETE /tasks/:id
const deleteTask = (req, res) => {
  const id = Number(req.params.id);

  const taskIndex = tasks.findIndex(
    (task) => task.id === id
  );

  if (taskIndex === -1) {
    return res.status(404).json({
      error: "Task not found",
    });
  }

  const deletedTask = tasks.splice(taskIndex, 1)[0];

  res.status(200).json({
    message: "Task deleted successfully",
    task: deletedTask,
  });
};

module.exports = {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
};