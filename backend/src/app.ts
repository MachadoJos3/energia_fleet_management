import express from "express";
import cors from "cors";
import authRoutes from "./routes/userRoutes";
import vehicleRoutes from "./routes/vehicleRoutes";
import notificationRoutes from "./routes/notificationRoutes";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Rotas
app.use("/api/users", authRoutes);
app.use("/api/vehicles", vehicleRoutes);
app.use("/api/notifications", notificationRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
