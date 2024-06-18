import { Router } from "express";
import { getDiscussions } from "../controllers/discussionsController.js";

const router = Router();

router.get("/", getDiscussions);

export default router;
