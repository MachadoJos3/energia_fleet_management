import pool from "../db";

export interface Tire {
  id: number;
  vehicle_id: number;
  installation_date: Date;
  mileage_at_installation: number;
  predicted_replacement_mileage: number;
}

export const findTiresByVehicleId = async (
  vehicleId: number
): Promise<Tire[]> => {
  const [rows] = await pool.execute(
    "SELECT * FROM tires WHERE vehicle_id = ?",
    [vehicleId]
  );
  return rows as Tire[];
};

export const createTire = async (
  vehicleId: number,
  installationDate: string,
  mileageAtInstallation: number,
  predictedReplacementMileage: number
): Promise<void> => {
  await pool.execute(
    "INSERT INTO tires (vehicle_id, installation_date, mileage_at_installation, predicted_replacement_mileage) VALUES (?, ?, ?, ?)",
    [
      vehicleId,
      installationDate,
      mileageAtInstallation,
      predictedReplacementMileage,
    ]
  );
};

export const updateTire = async (
  tireId: number,
  installationDate: string,
  mileageAtInstallation: number,
  predictedReplacementMileage: number
): Promise<Tire> => {
  await pool.execute(
    "UPDATE tires SET installation_date = ?, mileage_at_installation = ?, predicted_replacement_mileage = ? WHERE id = ?",
    [
      installationDate,
      mileageAtInstallation,
      predictedReplacementMileage,
      tireId,
    ]
  );

  const [updatedTire]: any = await pool.execute(
    "SELECT * FROM tires WHERE id = ?",
    [tireId]
  );
  return updatedTire[0] as Tire;
};

export const deleteTire = async (tireId: number): Promise<void> => {
  await pool.execute("DELETE FROM tires WHERE id = ?", [tireId]);
};
