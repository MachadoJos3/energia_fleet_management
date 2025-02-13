import { Router } from "express";
import {
  getTires,
  addTire,
  updateTire,
  deleteTireController as deleteTire,
} from "../controllers/tireController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

router.use((req, res, next) => {
  console.log("tireRoutes - req.vehicleId:", req.vehicleId);
  console.log("tireRoutes - req.body:", req.body);
  next();
});

router.get("/", authMiddleware, getTires);
router.post("/", authMiddleware, addTire);
router.put("/:id", authMiddleware, updateTire);
router.delete("/:id", authMiddleware, deleteTire);

export default router;
