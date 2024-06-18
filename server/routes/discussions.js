import { Router } from "express";
import {
  getDiscussion,
  getDiscussions,
} from "../controllers/discussionsController.js";

const router = Router();

router.get("/", getDiscussions);
router.get("/:id", getDiscussion);

export default router;
