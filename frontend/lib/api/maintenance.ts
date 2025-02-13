import { Maintenance } from "@/types/maintenance";

const getAuthHeaders = () => {
  const token = localStorage.getItem("authToken");
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  return headers;
};

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getMaintenancesByVehicleId = async (
  vehicleId: number
): Promise<Maintenance[]> => {
  const res = await fetch(`${API_URL}/vehicles/${vehicleId}/maintenance`, {
    headers: getAuthHeaders(),
  });

  if (!res.ok) {
    throw new Error("Erro. Não foi possível buscar as manutenções");
  }
  return res.json();
};

export const createMaintenance = async (
  vehicleId: number,
  maintenance: Maintenance
): Promise<void> => {
  const res = await fetch(`${API_URL}/vehicles/${vehicleId}/maintenance`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(),
    },
    body: JSON.stringify(maintenance),
  });

  if (!res.ok) {
    throw new Error("Erro. Não foi possível criar a manutenção");
  }
};

export const updateMaintenance = async (
  vehicleId: number,
  maintenanceId: number,
  updatedMaintenance: Maintenance
): Promise<void> => {
  const res = await fetch(
    `${API_URL}/vehicles/${vehicleId}/maintenance/${maintenanceId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeaders(),
      },
      body: JSON.stringify(updatedMaintenance),
    }
  );

  if (!res.ok) {
    throw new Error("Erro. Não foi possível atualizar a manutenção");
  }
};

export const deleteMaintenance = async (
  vehicleId: number,
  maintenanceId: number
): Promise<void> => {
  const res = await fetch(
    `${API_URL}/vehicles/${vehicleId}/maintenance/${maintenanceId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeaders(),
      },
    }
  );

  if (!res.ok) {
    throw new Error("Erro. Não foi possível deletar a manutenção");
  }
};
