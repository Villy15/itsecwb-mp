import { Router } from "express";
import {
  checkAuth,
  login,
  logout,
  register,
} from "../controllers/authController.js";

// importing the rateLimiterMiddleware from the middleware folder
import rateLimiterMiddleware from "../middleware/rate-limiter.js";

const router = Router();

router.post("/login", rateLimiterMiddleware, login);
router.post("/register", register);
router.post("/checkAuth", checkAuth);
router.post("/logout", logout);

export default router;
