import pool from "../db";

const getCurrentMileage = async (vehicleId: number): Promise<number> => {
  const [rows]: any = await pool.execute(
    "SELECT mileage FROM vehicles WHERE id = ?",
    [vehicleId]
  );
  return rows[0]?.mileage || 0;
};

export const checkTireWear = async (): Promise<
  { message: string; type: string }[]
> => {
  const [tires]: any = await pool.execute("SELECT * FROM tires");

  const notifications = [];

  for (const tire of tires) {
    const predictedMileage = tire.predicted_replacement_mileage;
    const currentMileage = await getCurrentMileage(tire.vehicle_id);

    if (currentMileage >= predictedMileage) {
      notifications.push({
        message: `Pneu do veículo ${tire.vehicle_id} precisa ser trocado.`,
        type: "tire_wear",
      });
    }
  }

  return notifications;
};

export const checkMaintenance = async (): Promise<
  { message: string; type: string }[]
> => {
  const [maintenances]: any = await pool.execute("SELECT * FROM maintenance");

  const notifications = [];

  for (const maintenance of maintenances) {
    const currentMileage = await getCurrentMileage(maintenance.vehicle_id);

    // Defina um limite de quilometragem para gerar a notificação
    const maintenanceThreshold = 1000; // Exemplo: 1000 km antes da manutenção
    if (
      currentMileage >=
      maintenance.mileage_at_maintenance - maintenanceThreshold
    ) {
      notifications.push({
        message: `Manutenção "${maintenance.type}" do veículo ${maintenance.vehicle_id} está próxima.`,
        type: "maintenance",
      });
    }
  }

  return notifications;
};

export const getNotifications = async (): Promise<
  { message: string; type: string }[]
> => {
  const tireNotifications = await checkTireWear();
  const maintenanceNotifications = await checkMaintenance();

  return [...tireNotifications, ...maintenanceNotifications];
};
