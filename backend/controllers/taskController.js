const Task = require("../models/Task");

// GET /tasks
const getTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });

    res.status(200).json(tasks);
  } catch (error) {
    next(error);
  }
};

// GET /tasks/:id
const getTaskById = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        error: "Task not found",
      });
    }

    res.status(200).json(task);
  } catch (error) {
    next(error);
  }
};

// POST /tasks
const createTask = async (req, res, next) => {
  try {
    const { title, description, completed } = req.body;

    if (!title) {
      return res.status(400).json({
        error: "Title is required",
      });
    }

    const newTask = await Task.create({
      title,
      description: description || "",
      completed: completed ?? false,
    });

    res.status(201).json(newTask);
  } catch (error) {
    next(error);
  }
};

// PUT /tasks/:id
const updateTask = async (req, res, next) => {
  try {
    const { title, description, completed } = req.body;

    const task = await Task.findByIdAndUpdate(
      req.params.id,
      {
        ...(title !== undefined && { title }),
        ...(description !== undefined && { description }),
        ...(completed !== undefined && { completed }),
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!task) {
      return res.status(404).json({
        error: "Task not found",
      });
    }

    res.status(200).json(task);
  } catch (error) {
    next(error);
  }
};

// DELETE /tasks/:id
const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) {
      return res.status(404).json({
        error: "Task not found",
      });
    }

    res.status(200).json({
      message: "Task deleted successfully",
      task,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
};