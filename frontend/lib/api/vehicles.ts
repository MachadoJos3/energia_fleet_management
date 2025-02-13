import { Vehicle } from "@/types/vehicles";

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

export const getVehicles = async (): Promise<Vehicle[]> => {
  const res = await fetch(`${API_URL}/vehicles`, {
    headers: getAuthHeaders(),
  });

  if (!res.ok) {
    throw new Error("Erro. Não foi possível buscar os veículos");
  }
  return res.json();
};

export const deleteVehicleById = async (id: number): Promise<void> => {
  const res = await fetch(`${API_URL}/vehicles/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(),
    },
  });

  if (!res.ok) {
    throw new Error("Erro. Não foi possível deletar o veículo");
  }
};

export const updateVehicleById = async (
  id: number,
  updatedVehicle: Vehicle
): Promise<void> => {
  const res = await fetch(`${API_URL}/vehicles/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(),
    },
    body: JSON.stringify(updatedVehicle),
  });

  if (!res.ok) {
    throw new Error("Erro. Não foi possível atualizar o veículo");
  }
};

export const createNewVehicle = async (
  createVehicle: Vehicle
): Promise<void> => {
  const res = await fetch(`${API_URL}/vehicles`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(),
    },
    body: JSON.stringify(createVehicle),
  });

  if (!res.ok) {
    throw new Error("Erro. Não foi possível criar o veículo");
  }
};
