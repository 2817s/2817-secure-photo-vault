# 2817 Secure Photo Vault 
## Practical 9: In-Memory Caching and Query Optimization

### Objective

Implemented server-side in-memory caching using `node-cache` to reduce repeated database reads and improve API response time.

### Caching Implementation

The backend uses `node-cache` with a default TTL of 60 seconds.

```js
const NodeCache = require("node-cache");

const cache = new NodeCache({
  stdTTL: 60,
});

module.exports = cache;



## Practical 10: Asynchronous Processing with Event-Driven Architecture

### Objective
Implemented an asynchronous task notification system using Node.js's built-in EventEmitter, without adding external dependencies.

### Implementation
- Created `backend/events/taskEvents.js` to provide a shared TaskEvents emitter.
- Created `backend/listeners.js` to register task-created and task-deleted notification listeners.
- Registered listeners at server startup through `backend/server.js`.
- Updated `backend/controllers/taskController.js` to emit events after task operations.
- Used `setImmediate()` to schedule event emission and `setTimeout()` with a 2-second delay to simulate slow notification processing.
- Added a notification error listener using the custom `task-notification-error` event.
- Preserved Practical 9's in-memory caching and cache invalidation.

### Test Results

A POST request to `/tasks` returned HTTP 201 Created. Thunder Client reported a response time of 73 ms.

| Event | Timestamp |
|---|---|
| API response log | 09:24:59.772 |
| Notification scheduled | 09:24:59.776 |
| Notification execution | 09:25:01.777 |
| Notification completed | 09:25:01.778 |

The notification completed approximately 2 seconds after scheduling, without making the API wait for the delayed notification work.

### Key Questions

**1. Why does event-driven processing avoid blocking the API?**

The route schedules event emission with `setImmediate()`. The listener schedules its notification work using `setTimeout()`, allowing the route to return without waiting for the 2-second delay. EventEmitter's `emit()` itself invokes listeners synchronously, so the scheduling mechanism is important.

**2. What if notification logic were placed directly in the POST route?**

If the route waited for slow notification work to finish, the client would receive its response later. Separating notification handling from the route avoids that unnecessary delay.

**3. Why is EventEmitter suitable at this scale but not necessarily for millions of events per day?**

EventEmitter is lightweight and built into Node.js, making it suitable for simple in-process events. It does not provide durable storage, cross-process delivery, or built-in retry guarantees. High-volume systems may need a message broker or durable queue.

### Limitations
- Events are in-process and are lost if the server stops before processing them.
- This implementation is intended for demonstration and small applications.
- Production notification systems may require durable queues, retries, monitoring, and delivery guarantees.
