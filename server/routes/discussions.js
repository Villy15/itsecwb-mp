import { Router } from "express";
import {
  getDiscussion,
  getComments,
  getDiscussions,
  addDiscussion,
  removeDiscussion,
} from "../controllers/discussionsController.js";

const router = Router();

router.get("/", getDiscussions);
router.get("/:id", getComments);
router.get("/:id", getDiscussion);
router.post("/add", addDiscussion);
router.post("/:id", removeDiscussion);

export default router;
