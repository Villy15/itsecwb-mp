import { Router } from "express";
import {
  getDiscussion,
  getComments,
  getDiscussions,
  addDiscussion,
} from "../controllers/discussionsController.js";

const router = Router();

router.get("/", getDiscussions);
router.get("/:id", getComments);
router.get("/:id", getDiscussion);
router.post("/add", addDiscussion);

export default router;
