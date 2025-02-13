import { Router } from "express";
import { getNotificationsHandler } from "../controllers/notificationController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

router.get("/", authMiddleware, getNotificationsHandler);

export default router;
