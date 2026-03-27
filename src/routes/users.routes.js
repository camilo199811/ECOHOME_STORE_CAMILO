import { Router } from "express";
import { verifyToken } from "../middleware/auth.middleware.js";
import { getMe, getMyStats } from "../controllers/users.controller.js";

const router = Router();

router.get("/me", verifyToken, getMe);
router.get("/me/stats", verifyToken, getMyStats);

export default router;