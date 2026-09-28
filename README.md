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