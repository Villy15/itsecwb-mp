import { Router } from "express";
import {
  getComments,
  addComment,
  removeComment,
} from "../controllers/commentsController.js";

const router = Router();

router.get("/:id", getComments);
router.post("/add", addComment);
router.post("/:id", removeComment);

export default router;
