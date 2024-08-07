import { Router } from "express";
import {
  getDiscussion,
  getDiscussions,
  addDiscussion,
} from "../controllers/discussionsController.js";

const router = Router();

router.get("/", getDiscussions);
router.get("/:id", getDiscussion);
router.post("/add", addDiscussion);

export default router;
