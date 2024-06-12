import { RateLimiterMySQL } from "rate-limiter-flexible";
import { poolForRateLimiter } from "../db.js";

const maxWrongAttemptsByIPperDay = 100;
const maxConsecutiveFailsByUsernameAndIP = 10;

// rate limiter by slow brute by IP, only maxWrongAttemptsByIPperDay allowed
const limiterSlowBruteByIP = new RateLimiterMySQL({
  storeClient: poolForRateLimiter,
  keyPrefix: "login_fail_ip_per_day",
  points: maxWrongAttemptsByIPperDay,
  dbName: "itsecwb",
  tableName: "slowBruteByIP",
  duration: 60 * 60 * 24, // Store number for 1 day
  blockDuration: 60 * 60 * 24, // Block for 1 day
  tableCreated: false,
});

// rate limiter to prevent fast login attempts
const limiterConsecutiveFailsByUsernameAndIP = new RateLimiterMySQL({
  storeClient: poolForRateLimiter,
  keyPrefix: "login_fail_consecutive_username_and_ip",
  points: maxConsecutiveFailsByUsernameAndIP,
  dbName: "itsecwb",
  tableName: "consecutiveFailsByUsernameAndIP",
  duration: 60 * 60 * 24 * 90, // Store number for 90 days
  blockDuration: 60 * 60, // Block for  1 hour
  tableCreated: false,
});

// const rateLimiter = new RateLimiterMySQL({
//   storeClient: poolForRateLimiter,
//   points: 5, // 5 requests
//   duration: 30, // per 1 second by IP
//   tableName: "rate_limiter",
//   keyPrefix: "rl_",
//   dbName: "itsecwb",
//   tableCreated: true,
// });

// the middleware function
const rateLimiterMiddleware = (req, res, next) => {
  limiterSlowBruteByIP
    .consume(req.ip)
    .then((rateLimiterRes1) => {
      res.set({
        "X-RateLimit-Limit-SlowBrute": rateLimiterRes1.totalPoints,
        "X-RateLimit-Remaining-SlowBrute": rateLimiterRes1.remainingPoints,
        "X-RateLimit-Reset-SlowBrute": new Date(
          Date.now() + rateLimiterRes1.msBeforeNext
        ),
      });
      return limiterConsecutiveFailsByUsernameAndIP.consume(req.body.email);
    })
    .then((rateLimiterRes2) => {
      // Laging undefined yung rateLimiterRes2.totalPoints
      // console.log(rateLimiterRes2.totalPoints);
      rateLimiterRes2.totalPoints = maxConsecutiveFailsByUsernameAndIP;
      res.set({
        "X-RateLimit-Limit-ConsecutiveFails": rateLimiterRes2.totalPoints,
        "X-RateLimit-Remaining-ConsecutiveFails":
          rateLimiterRes2.remainingPoints,
        "X-RateLimit-Reset-ConsecutiveFails": new Date(
          Date.now() + rateLimiterRes2.msBeforeNext
        ),
      });
      next();
    })
    .catch((err) => {
      console.log(err);
      console.log(req.body.email);
      res.status(429).send("Too Many Requests");
    });
};
export default rateLimiterMiddleware;
