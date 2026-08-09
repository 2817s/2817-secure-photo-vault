const express = require("express");

const {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");

const router = express.Router();

// GET /tasks
router.get("/", getTasks);

// POST /tasks
router.post("/", createTask);

// PUT /tasks/:id
router.put("/:id", updateTask);

// DELETE /tasks/:id
router.delete("/:id", deleteTask);

module.exports = router;