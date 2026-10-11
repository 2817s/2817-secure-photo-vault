const taskEvents = require("./events/taskEvents");

taskEvents.on("task-created", ({ task, assignedUser }) => {
  console.log(
    `[Notification Scheduled] Task "${task.title}" at ${new Date().toISOString()}`
  );

  setTimeout(() => {
    try {
      console.log(
        `[Notification] Task "${task.title}" created at ${new Date().toISOString()}`
      );
      console.log(
        `[Notification] Assigned user: ${assignedUser}`
      );
      console.log(
        `[Notification Complete] ${new Date().toISOString()}`
      );
    } catch (error) {
      taskEvents.emit("task-notification-error", error);
    }
  }, 2000);
});

taskEvents.on("task-deleted", (task) => {
  setTimeout(() => {
    console.log(
      `[Delete Notification] Task "${task.title}" deleted at ${new Date().toISOString()}`
    );
  }, 0);
});

taskEvents.on("task-notification-error", (error) => {
  console.error("[Notification Error]", error.message);
});