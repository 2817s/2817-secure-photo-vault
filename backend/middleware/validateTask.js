const validateTask = (req, res, next) => {
  const { title } = req.body;

  if (!title || typeof title !== "string" || !title.trim()) {
    return res.status(400).json({
      error: "Task title is required",
    });
  }

  if (title.trim().length > 100) {
    return res.status(400).json({
      error: "Task title must be 100 characters or less",
    });
  }

  if (
    req.body.description !== undefined &&
    typeof req.body.description !== "string"
  ) {
    return res.status(400).json({
      error: "Task description must be a string",
    });
  }

  next();
};

module.exports = validateTask;