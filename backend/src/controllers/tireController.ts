import { Request, Response } from "express";
import {
  findTiresByVehicleId,
  createTire,
  updateTire as updateTireById,
  deleteTire,
} from "../models/Tire";

const isValidVehicleId = (id: any) => !isNaN(id) && Number(id) > 0;

export const getTires = async (req: Request, res: Response): Promise<void> => {
  const { vehicleId } = req;
  console.log("Received vehicleId:", vehicleId);

  if (!isValidVehicleId(vehicleId)) {
    res.status(400).json({ message: "ID do veículo inválido" });
    return;
  }

  try {
    const tires = await findTiresByVehicleId(Number(vehicleId));
    res.json(tires);
  } catch (error) {
    console.error("Erro ao buscar pneus:", error);
    res.status(500).json({ message: "Erro ao buscar pneus" });
  }
};

export const addTire = async (req: Request, res: Response): Promise<void> => {
  const { vehicleId } = req;
  const {
    installation_date,
    mileage_at_installation,
    predicted_replacement_mileage,
  } = req.body;
  console.log("body tire", req.body);

  if (!isValidVehicleId(vehicleId)) {
    res.status(400).json({ message: "ID do veículo inválido" });
    return;
  }

  if (
    !installation_date ||
    !mileage_at_installation ||
    !predicted_replacement_mileage
  ) {
    res
      .status(400)
      .json({ message: "Todos os dados do pneu são obrigatórios" });
    return;
  }

  try {
    await createTire(
      Number(vehicleId),
      installation_date,
      mileage_at_installation,
      predicted_replacement_mileage
    );
    res.status(201).json({ message: "Pneu cadastrado com sucesso" });
  } catch (error) {
    console.error("Erro ao adicionar pneu:", error);
    res.status(500).json({ message: "Erro ao adicionar pneu" });
  }
};

export const updateTire = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const {
    installation_date,
    mileage_at_installation,
    predicted_replacement_mileage,
  } = req.body;

  if (!isValidVehicleId(id)) {
    res.status(400).json({ message: "ID do pneu inválido" });
    return;
  }

  if (
    !installation_date ||
    !mileage_at_installation ||
    !predicted_replacement_mileage
  ) {
    res.status(400).json({ message: "Todos os campos são obrigatórios" });
    return;
  }

  try {
    const updatedTire = await updateTireById(
      Number(id),
      installation_date,
      Number(mileage_at_installation),
      Number(predicted_replacement_mileage)
    );
    res
      .status(200)
      .json({ message: "Pneu atualizado com sucesso", updatedTire });
  } catch (error) {
    console.error("Erro ao atualizar pneu:", error);
    res.status(500).json({ message: "Erro ao atualizar pneu" });
  }
};

export const deleteTireController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;

  if (!isValidVehicleId(id)) {
    res.status(400).json({ message: "ID do pneu inválido" });
    return;
  }

  try {
    await deleteTire(Number(id));
    res.status(200).json({ message: "Pneu deletado com sucesso" });
  } catch (error) {
    console.error("Erro ao deletar pneu:", error);
    res.status(500).json({ message: "Erro ao deletar pneu" });
  }
};
