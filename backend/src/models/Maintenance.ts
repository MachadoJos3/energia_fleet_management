import pool from "../db";

export interface Maintenance {
  id: number;
  vehicle_id: number;
  type: string;
  description: string;
  mileage_at_maintenance: number;
  date: string;
}

export const findMaintenanceByVehicleId = async (
  vehicleId: number
): Promise<Maintenance[]> => {
  const [rows] = await pool.execute(
    "SELECT * FROM maintenance WHERE vehicle_id = ?",
    [vehicleId]
  );
  return rows as Maintenance[];
};

export const createMaintenance = async (
  vehicleId: number,
  type: string,
  description: string,
  mileageAtMaintenance: number,
  date: string
): Promise<Maintenance> => {
  const [result]: any = await pool.execute(
    "INSERT INTO maintenance (vehicle_id, type, description, mileage_at_maintenance, date) VALUES (?, ?, ?, ?, ?)",
    [vehicleId, type, description, mileageAtMaintenance, date]
  );

  const [newMaintenance]: any = await pool.execute(
    "SELECT * FROM maintenance WHERE id = LAST_INSERT_ID()"
  );
  return newMaintenance[0] as Maintenance;
};

export const updateMaintenance = async (
  id: number,
  type: string,
  description: string,
  mileageAtMaintenance: number,
  date: string
): Promise<Maintenance> => {
  await pool.execute(
    "UPDATE maintenance SET type = ?, description = ?, mileage_at_maintenance = ?, date = ? WHERE id = ?",
    [type, description, mileageAtMaintenance, date, id]
  );

  const [updatedMaintenance]: any = await pool.execute(
    "SELECT * FROM maintenance WHERE id = ?",
    [id]
  );
  return updatedMaintenance[0] as Maintenance;
};

export const deleteMaintenance = async (id: number): Promise<void> => {
  await pool.execute("DELETE FROM maintenance WHERE id = ?", [id]);
};
