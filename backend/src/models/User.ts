import pool from "../db";

export interface User {
  id?: number;
  name: string;
  email: string;
  password_hash: string;
  role: string;
}

export const createUser = async (user: User) => {
  const [result] = await pool.execute(
    "INSERT INTO users (name, email, password_hash, role) VALUES (?, ?, ?, ?)",
    [user.name, user.email, user.password_hash, user.role]
  );
  return result;
};

export const findUserByEmail = async (email: string) => {
  const [rows] = await pool.execute("SELECT * FROM users WHERE email = ?", [
    email,
  ]);
  return (rows as User[])[0];
};

export const findUserById = async (id: number) => {
  const [rows] = await pool.execute("SELECT * FROM users WHERE id = ?", [id]);
  return (rows as User[])[0];
};
