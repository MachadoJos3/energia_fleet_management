import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import {
  User,
  createUser,
  findUserByEmail,
  findUserById,
} from "../models/User";
import dotenv from "dotenv";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET as string;

export const register = async (req: Request, res: Response): Promise<void> => {
  const { name, email, role, password } = req.body;

  try {
    const password_hash = await bcrypt.hash(password, 10);
    const user: User = { name, email, role, password_hash };

    await createUser(user);
    const token = jwt.sign({ id: user.email }, JWT_SECRET, { expiresIn: "1h" });

    res.status(201).json({ message: "Usuário registrado com sucesso!", token });
  } catch (error) {
    console.error("Erro ao registrar usuário:", error);
    res.status(500).json({
      message: "Erro ao registrar usuário",
      error: error instanceof Error ? error.message : "Erro desconhecido",
    });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;
  try {
    if (!JWT_SECRET) {
      throw new Error("JWT_SECRET não está definido no arquivo .env");
    }

    const user = await findUserByEmail(email);
    if (!user) {
      res.status(400).json({ message: "Usuário não encontrado" });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordValid) {
      res.status(400).json({ message: "Senha inválida" });
      return;
    }

    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "1h" });
    res.json({ token });
  } catch (error) {
    console.error("Erro ao fazer login:", error);
    res.status(500).json({
      message: "Erro ao fazer login",
      error: error instanceof Error ? error.message : "Erro desconhecido",
    });
  }
};

export const getMe = async (req: Request, res: Response): Promise<void> => {
  const JWT_SECRET = process.env.JWT_SECRET;
  if (!JWT_SECRET) {
    res.status(500).json({ message: "JWT_SECRET não está definido" });
    return;
  }

  const userId = req.user?.id;

  if (!userId) {
    res.status(401).json({ message: "Usuário não autorizado" });
    return;
  }

  try {
    const user = await findUserById(userId);
    if (!user) {
      res.status(404).json({ message: "Usuário não encontrado" });
      return;
    }

    res.json(user);
  } catch (error) {
    console.error("Erro ao buscar dados do usuário:", error);
    res.status(500).json({
      message: "Erro ao buscar dados do usuário",
      error:
        process.env.NODE_ENV === "development"
          ? error instanceof Error
            ? error.message
            : "Erro desconhecido"
          : undefined,
    });
  }
};
