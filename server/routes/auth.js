import { Router } from "express";
import {
  checkAuth,
  login,
  logout,
  register,
} from "../controllers/authController.js";

// importing the rateLimiterMiddleware from the middleware folder

const router = Router();

router.post("/login", login);
router.post("/register", register);
router.post("/checkAuth", checkAuth);
router.post("/logout", logout);

export default router;
