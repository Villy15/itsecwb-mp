import { Router } from "express";
import { deleteUser, getUsers } from "../controllers/usersController.js";

const router = Router();

router.get("/", getUsers);
router.delete("/:id", deleteUser);

export default router;
