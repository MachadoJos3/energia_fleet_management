export interface Tire {
  id: number;
  vehicle_id: number;
  installation_date: Date;
  mileage_at_installation: number;
  predicted_replacement_mileage: number;
}
