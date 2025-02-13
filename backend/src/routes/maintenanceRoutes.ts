import { Router } from "express";
import {
  getMaintenance,
  addMaintenance,
  updateMaintenanceRecord,
  deleteMaintenanceRecord,
} from "../controllers/maintenanceController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

router.get("/", authMiddleware, getMaintenance);
router.post("/", authMiddleware, addMaintenance);
router.put("/:id", authMiddleware, updateMaintenanceRecord);
router.delete("/:id", authMiddleware, deleteMaintenanceRecord);

export default router;
