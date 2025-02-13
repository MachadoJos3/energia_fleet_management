import pool from "../db";

export const checkTireWear = async () => {
  const [rows] = await pool.execute(`
    SELECT v.id AS vehicle_id, v.mileage, t.predicted_replacement_mileage 
    FROM tires t
    JOIN vehicles v ON t.vehicle_id = v.id
  `);

  const tires = rows as {
    vehicle_id: number;
    mileage: number;
    predicted_replacement_mileage: number;
  }[];

  const notifications: string[] = [];

  tires.forEach((tire) => {
    const { vehicle_id, mileage, predicted_replacement_mileage } = tire;
    if (mileage >= predicted_replacement_mileage - 5000) {
      notifications.push(
        `O veículo ${vehicle_id} está próximo da troca de pneus!`
      );
    }
  });

  return notifications;
};
