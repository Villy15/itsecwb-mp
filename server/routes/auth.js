import { Router } from "express";
import { login, register } from "../controllers/authController.js";

// importing the rateLimiterMiddleware from the middleware folder
import rateLimiterMiddleware  from "../middleware/rate-limiter.js";

const router = Router();

router.post("/login", rateLimiterMiddleware, login);
router.post("/register", register);

export default router;
