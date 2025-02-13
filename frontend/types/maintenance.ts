export interface Maintenance {
  id: number;
  vehicle_id: number;
  type: string;
  description: string;
  mileage_at_maintenance: number;
  date: string;
}
