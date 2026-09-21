const express = require("express");

const {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");

const authMiddleware = require("../middleware/authMiddleware");

const validateTask = require("../middleware/validateTask");

const router = express.Router();

router.use(authMiddleware);

// GET /tasks
router.get("/", getTasks);

// GET /tasks/:id
router.get("/:id", getTaskById);

// POST /tasks


router.post("/", validateTask, createTask);

// PUT /tasks/:id
router.put("/:id", validateTask, updateTask);

// DELETE /tasks/:id
router.delete("/:id", deleteTask);

module.exports = router;