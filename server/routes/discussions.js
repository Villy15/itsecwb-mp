import { Router } from "express";
import {
  getDiscussion,
  getDiscussions,
  addDiscussion,
  removeDiscussion,
  updateDiscussion
} from "../controllers/discussionsController.js";

const router = Router();

router.get("/", getDiscussions);
router.get("/:id", getDiscussion);
router.post("/add", addDiscussion);
router.post("/:id", removeDiscussion);
router.patch("/:id", updateDiscussion);

export default router;
