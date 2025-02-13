import { Router } from "express";
import {
  createVehicle,
  getVehicles,
  updateVehicleById,
  deleteVehicleById,
} from "../controllers/vehicleController";
import { authMiddleware } from "../middlewares/authMiddleware";
import tireRoutes from "./tireRoutes";
import maintenanceRoutes from "./maintenanceRoutes";

const router = Router();

router.param("vehicleId", (req, res, next, vehicleId) => {
  req.vehicleId = vehicleId;
  next();
});

// Rotas principais de veiculos
router.get("/", authMiddleware, getVehicles);
router.post("/", authMiddleware, createVehicle);

// Sub-rotas de pneus
router.use("/:vehicleId/tires", tireRoutes);

// Sub-rotas de manutenção
router.use("/:vehicleId/maintenance", maintenanceRoutes);

// Rotas especificas do veiculo
router.put("/:id", authMiddleware, updateVehicleById);
router.delete("/:id", authMiddleware, deleteVehicleById);

export default router;
