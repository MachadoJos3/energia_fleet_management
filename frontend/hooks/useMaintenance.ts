// hooks/useMaintenance.ts
import { useEffect, useState } from "react";
import {
  getMaintenancesByVehicleId,
  createMaintenance,
  updateMaintenance,
  deleteMaintenance,
} from "@/lib/api/maintenance";
import { Maintenance } from "@/types/maintenance";

export const useMaintenance = (vehicleId: number) => {
  const [maintenanceList, setMaintenanceList] = useState<Maintenance[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchMaintenances = async () => {
    try {
      const data = await getMaintenancesByVehicleId(vehicleId);
      setMaintenanceList(data);
    } catch (error) {
      console.error("Erro ao buscar manutenções:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (newMaintenance: Maintenance) => {
    try {
      await createMaintenance(vehicleId, newMaintenance);
      await fetchMaintenances();
    } catch (error) {
      console.error("Erro ao criar manutenção:", error);
      throw error;
    }
  };
  const handleUpdate = async (
    maintenanceId: number,
    updatedMaintenance: Maintenance
  ) => {
    try {
      await updateMaintenance(vehicleId, maintenanceId, updatedMaintenance);
      await fetchMaintenances();
    } catch (error) {
      console.error("Erro ao atualizar manutenção:", error);
    }
  };

  const handleDelete = async (maintenanceId: number) => {
    try {
      await deleteMaintenance(vehicleId, maintenanceId);
      await fetchMaintenances();
    } catch (error) {
      console.error("Erro ao deletar manutenção:", error);
    }
  };

  useEffect(() => {
    fetchMaintenances();
  }, [vehicleId]);

  return {
    maintenanceList,
    loading,
    handleCreate,
    handleUpdate,
    handleDelete,
  };
};
