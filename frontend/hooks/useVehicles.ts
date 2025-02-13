import { useEffect, useState } from "react";
import {
  getVehicles,
  deleteVehicleById,
  updateVehicleById,
  createNewVehicle,
} from "@/lib/api/vehicles";
import { Vehicle } from "@/types/vehicles";

export const useVehicles = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const data = await getVehicles();
        setVehicles(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchVehicles();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await deleteVehicleById(id);
      setVehicles((prev) => prev.filter((v) => v.id !== id));
      console.log("Veículo deletado com sucesso");
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdate = async (updatedVehicle: Vehicle) => {
    try {
      await updateVehicleById(updatedVehicle.id, updatedVehicle);
      console.log("Veículo atualizado com sucesso");
    } catch (error) {
      console.error("Erro ao atualizar o veículo:", error);
    }
  };

  const handleCreate = async (createVehicle: Vehicle) => {
    try {
      await createNewVehicle(createVehicle);
      console.log("Veículo criado com sucesso");
    } catch (error) {
      console.error("Erro ao criar o veículo:", error);
    }
  };

  return {
    vehicles,
    loading,
    handleCreate,
    handleDelete,
    handleUpdate,
  };
};
