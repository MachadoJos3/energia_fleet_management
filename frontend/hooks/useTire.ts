// hooks/useTires.ts
import { useEffect, useState } from "react";
import { Tire } from "@/types/tire";
import {
  getTiresByVehicleId,
  createTire,
  updateTire,
  deleteTire,
} from "@/lib/api/tire";

export const useTires = (vehicleId: number) => {
  const [tiresList, setTiresList] = useState<Tire[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTires = async () => {
    try {
      const data = await getTiresByVehicleId(vehicleId);
      setTiresList(data);
    } catch (error) {
      console.error("Erro ao buscar pneus:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (newTire: Omit<Tire, "id">) => {
    try {
      await createTire(vehicleId, newTire);
      await fetchTires();
    } catch (error) {
      console.error("Erro ao criar pneu:", error);
    }
  };

  const handleUpdate = async (tireId: number, updatedTire: Tire) => {
    try {
      console.log(updateTire);

      await updateTire(vehicleId, tireId, updatedTire);
      await fetchTires();
    } catch (error) {
      console.error("Erro ao atualizar pneu:", error);
    }
  };

  const handleDelete = async (tireId: number) => {
    try {
      await deleteTire(vehicleId, tireId);
      await fetchTires();
    } catch (error) {
      console.error("Erro ao deletar pneu:", error);
      throw error;
    }
  };

  useEffect(() => {
    fetchTires();
  }, [vehicleId]);

  return {
    tiresList,
    loading,
    handleCreate,
    handleUpdate,
    handleDelete,
  };
};
