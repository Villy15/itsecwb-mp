import { RateLimiterMySQL } from "rate-limiter-flexible";
import { poolForRateLimiter } from "../db.js";

const rateLimiter = new RateLimiterMySQL({
  storeClient: poolForRateLimiter,
  points: 5, // 5 requests
  duration: 30, // per 1 second by IP
  tableName: "rate_limiter",
  keyPrefix: "rl_",
  dbName: "itsecwb",
  tableCreated: true,
});

// the middleware function
const rateLimiterMiddleware = (req, res, next) => {
  rateLimiter
    .consume(req.ip)
    .then((rateLimiterRes) => {
      // setting of headers
      res.set({
        "Retry-After": rateLimiterRes.msBeforeNext / 1000,
        "X-RateLimit-Limit": rateLimiterRes.totalPoints,
        "X-RateLimit-Remaining": rateLimiterRes.remainingPoints,
        "X-RateLimit-Reset": new Date(Date.now() + rateLimiterRes.msBeforeNext),
      });
      next();
    })
    .catch((err) => {
      console.log(err);
      res.status(429).send("Too Many Requests");
    });
};

export default rateLimiterMiddleware;
