
const Task = require("../models/Task");
const cache = require("../utils/cache");
const taskEvents = require("../events/taskEvents");

// GET /tasks
const getTasks = async (req, res, next) => {
  try {
    const cachedTasks = cache.get("all_tasks");

    if (cachedTasks !== undefined) {
      console.log("CACHE HIT - Returning tasks from memory");
      return res.status(200).json(cachedTasks);
    }

    console.log("CACHE MISS - Fetching tasks from MongoDB");

    const tasks = await Task.find().sort({ createdAt: -1 });

    cache.set("all_tasks", tasks);

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

    // Practical 9: invalidate cached task list
    cache.del("all_tasks");

    // Practical 10: log when the API response is sent
    console.log(
      `[API] Response sent at ${new Date().toISOString()}`
    );

    // Respond to the client immediately
    res.status(201).json(newTask);

    // Schedule notification handling after sending the response
    setImmediate(() => {
      try {
        taskEvents.emit("task-created", {
          task: newTask,
          assignedUser: req.user?.id || "not specified",
        });
      } catch (error) {
        taskEvents.emit("task-notification-error", error);
      }
    });
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

    // Practical 9: invalidate cached task list
    cache.del("all_tasks");

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

    // Practical 9: invalidate cached task list
    cache.del("all_tasks");

    // Practical 10: emit task-deleted event
    setImmediate(() => {
      try {
        taskEvents.emit("task-deleted", task);
      } catch (error) {
        taskEvents.emit("task-notification-error", error);
      }
    });

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
