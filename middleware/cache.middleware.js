const cache = new Map();
const TTL = 60 * 1000; // 1 minute in milliseconds

const cacheMiddleware = (req, res, next) => {
  if (req.method !== 'GET') {
    return next();
  }

  const key = req.originalUrl;
  const cachedRecord = cache.get(key);

  if (cachedRecord) {
    const now = Date.now();
    if (now - cachedRecord.createdAt < TTL) {
      res.setHeader('X-Cache', 'HIT');
      return res.json(cachedRecord.data);
    } else {
      // Cache expired
      cache.delete(key);
    }
  }

  res.setHeader('X-Cache', 'MISS');
  const originalJson = res.json;
  
  res.json = function(data) {
    if (res.statusCode >= 200 && res.statusCode < 300) {
      cache.set(key, {
        createdAt: Date.now(),
        data: data
      });
    }
    return originalJson.call(this, data);
  };

  next();
};

const invalidateCacheMiddleware = (req, res, next) => {
  if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(req.method)) {
    const originalJson = res.json;
    const originalSend = res.send;
    
    const invalidate = () => {
      if (res.statusCode >= 200 && res.statusCode < 300) {
        // Clear all cache entries that belong to this base route
        const matchPrefix = req.baseUrl;
        for (const key of cache.keys()) {
          if (key.startsWith(matchPrefix)) {
            cache.delete(key);
          }
        }
      }
    };
    
    res.json = function(data) {
      invalidate();
      return originalJson.call(this, data);
    };
    
    res.send = function(data) {
      invalidate();
      return originalSend.call(this, data);
    };
  }
  
  next();
};

module.exports = {
  cacheMiddleware,
  invalidateCacheMiddleware
};
