import { Request, Response } from "express";
import {
  findMaintenanceByVehicleId,
  createMaintenance,
  updateMaintenance,
  deleteMaintenance,
} from "../models/Maintenance";

const isValidVehicleId = (id: any) => !isNaN(id) && Number(id) > 0;

export const getMaintenance = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { vehicleId } = req;

  if (!isValidVehicleId(vehicleId)) {
    res.status(400).json({ message: "ID do veículo inválido" });
    return;
  }

  try {
    const maintenance = await findMaintenanceByVehicleId(Number(vehicleId));
    res.json(maintenance);
  } catch (error) {
    console.error("Erro ao buscar manutenções:", error);
    res.status(500).json({ message: "Erro ao buscar manutenções" });
  }
};

export const addMaintenance = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { vehicleId } = req;
  const { type, description, mileage_at_maintenance, date } = req.body;

  if (!isValidVehicleId(vehicleId)) {
    res.status(400).json({ message: "ID do veículo inválido" });
    return;
  }

  if (!type || !description || !mileage_at_maintenance || !date) {
    res.status(400).json({ message: "Todos os campos são obrigatórios" });
    return;
  }

  try {
    const newMaintenance = await createMaintenance(
      Number(vehicleId),
      type,
      description,
      mileage_at_maintenance,
      date
    );
    res
      .status(201)
      .json({ message: "Manutenção cadastrada com sucesso", newMaintenance });
  } catch (error) {
    console.error("Erro ao adicionar manutenção:", error);
    res.status(500).json({ message: "Erro ao adicionar manutenção" });
  }
};

export const updateMaintenanceRecord = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const { type, description, mileage_at_maintenance, date } = req.body;

  if (!isValidVehicleId(id)) {
    res.status(400).json({ message: "ID da manutenção inválido" });
    return;
  }

  try {
    const updatedMaintenance = await updateMaintenance(
      Number(id),
      type,
      description,
      mileage_at_maintenance,
      date
    );
    res.json({
      message: "Manutenção atualizada com sucesso",
      updatedMaintenance,
    });
  } catch (error) {
    console.error("Erro ao atualizar manutenção:", error);
    res.status(500).json({ message: "Erro ao atualizar manutenção" });
  }
};

export const deleteMaintenanceRecord = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;

  if (!isValidVehicleId(id)) {
    res.status(400).json({ message: "ID da manutenção inválido" });
    return;
  }

  try {
    await deleteMaintenance(Number(id));
    res.json({ message: "Manutenção deletada com sucesso" });
  } catch (error) {
    console.error("Erro ao deletar manutenção:", error);
    res.status(500).json({ message: "Erro ao deletar manutenção" });
  }
};
