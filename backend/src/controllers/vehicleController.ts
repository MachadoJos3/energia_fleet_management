import { Request, Response } from "express";
import {
  createVehicle as createVehicleService,
  getVehicles as getVehiclesService,
  updateVehicleById as updateVehicleByIdService,
  deleteVehicleById as deleteVehicleByIdService,
} from "../services/VehicleService";

export const createVehicle = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { model, year, license_plate, mileage } = req.body;

  try {
    await createVehicleService({ model, year, license_plate, mileage });
    res.status(201).json({ message: "Veículo criado com sucesso" });
  } catch (error) {
    res.status(500).json({
      message: "Erro ao criar veículo",
      error,
    });
  }
};

export const getVehicles = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const vehicles = await getVehiclesService();
    res.json(vehicles);
  } catch (error) {
    res.status(500).json({
      message: "Erro ao buscar veículos",
      error,
    });
  }
};

export const updateVehicleById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const { model, year, license_plate, mileage } = req.body;

  if (!id) {
    res.status(400).json({ message: "ID do veículo não foi enviado" });
    return;
  }

  try {
    await updateVehicleByIdService(Number(id), {
      model,
      year,
      license_plate,
      mileage,
    });
    res.json({ message: "Veículo atualizado com sucesso" });
  } catch (error) {
    res.status(500).json({
      message: "Erro ao atualizar veículo",
      error,
    });
  }
};

export const deleteVehicleById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;

  if (!id) {
    res.status(400).json({ message: "ID do veículo não foi enviado" });
    return;
  }

  try {
    await deleteVehicleByIdService(Number(id));
    res.json({ message: "Veículo excluído com sucesso" });
  } catch (error) {
    res.status(500).json({
      message: "Erro ao excluir veículo",
      error,
    });
  }
};
