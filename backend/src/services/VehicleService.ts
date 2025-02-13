import pool from "../db";
import { Vehicle } from "../models/Vehicle";

export const createVehicle = async (vehicle: Vehicle) => {
  const connx = await pool.getConnection();
  const result = await connx.query(
    `INSERT INTO vehicles (model, year, license_plate, mileage) VALUES (?, ?, ?, ?)`,
    [vehicle.model, vehicle.year, vehicle.license_plate, vehicle.mileage]
  );
  connx.release();
  return result;
};

export const getVehicles = async () => {
  const connx = await pool.getConnection();
  const [rows] = await connx.query(`
    SELECT
      v.id,
      v.model,
      v.year,
      v.license_plate,
      v.mileage,
      v.created_at,
      v.updated_at
    FROM vehicles as v
  `);
  connx.release();
  return rows;
};

export const updateVehicleById = async (id: number, vehicle: Vehicle) => {
  const connx = await pool.getConnection();
  const result = await connx.query(
    `UPDATE vehicles SET model = ?, year = ?, license_plate = ?, mileage = ? WHERE id = ?`,
    [vehicle.model, vehicle.year, vehicle.license_plate, vehicle.mileage, id]
  );
  connx.release();
  return result;
};

export const deleteVehicleById = async (id: number) => {
  const connx = await pool.getConnection();
  const result = await connx.query("DELETE FROM vehicles WHERE id = ?", [id]);
  connx.release();
  return result;
};
export const findVehicleById = async (id: number) => {
  const connx = await pool.getConnection();
  const [rows]: any = await connx.query(`SELECT * FROM vehicles WHERE id = ?`, [
    id,
  ]);
  connx.release();

  return rows.length ? rows[0] : null;
};
