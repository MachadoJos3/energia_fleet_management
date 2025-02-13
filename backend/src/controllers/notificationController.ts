import { Request, Response } from "express";
import { getNotifications } from "../services/notificationService";

export const getNotificationsHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const notifications = await getNotifications();
    res.json(notifications);
  } catch (error) {
    console.error("Erro ao buscar notificações:", error);
    res.status(500).json({ message: "Erro ao buscar notificações" });
  }
};
