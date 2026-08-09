const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
  console.log(
    `${req.method} ${req.url} - ${new Date().toISOString()}`
  );
  next();
});

// Routes
const taskRoutes = require("./routes/taskRoutes");
app.use("/tasks", taskRoutes);

// Global error handling middleware
// This must be the LAST middleware.
app.use((err, req, res, next) => {
  console.error(err.stack);

  res.status(500).json({
    error: "Something went wrong",
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});