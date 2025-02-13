import { Tire } from "@/types/tire";

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

export const getTiresByVehicleId = async (
  vehicleId: number
): Promise<Tire[]> => {
  const res = await fetch(`${API_URL}/vehicles/${vehicleId}/tires`, {
    headers: getAuthHeaders(),
  });

  if (!res.ok) {
    throw new Error("Erro ao buscar os pneus");
  }
  return res.json();
};

export const createTire = async (
  vehicleId: number,
  newTire: Omit<Tire, "id">
): Promise<void> => {
  const res = await fetch(`${API_URL}/vehicles/${vehicleId}/tires`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(),
    },
    body: JSON.stringify(newTire),
  });

  if (!res.ok) {
    throw new Error("Erro ao criar o pneu");
  }
};

export const updateTire = async (
  vehicleId: number,
  tireId: number,
  updatedTire: Tire
): Promise<void> => {
  const res = await fetch(`${API_URL}/vehicles/${vehicleId}/tires/${tireId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(),
    },
    body: JSON.stringify(updatedTire),
  });

  if (!res.ok) {
    throw new Error("Erro ao atualizar o pneu");
  }
};

export const deleteTire = async (
  vehicleId: number,
  tireId: number
): Promise<void> => {
  const res = await fetch(`${API_URL}/vehicles/${vehicleId}/tires/${tireId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(),
    },
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Erro ao deletar o pneu");
  }
};
