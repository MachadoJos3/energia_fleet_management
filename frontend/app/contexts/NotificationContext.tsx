"use client";

import { createContext, useContext, useState, useEffect } from "react";

interface Notification {
  message: string;
  type: string;
}

interface NotificationContextType {
  notifications: Notification[];
  refetchNotifications: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined
);

export const NotificationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [prevNotificationCount, setPrevNotificationCount] = useState<number>(0);

  const fetchNotifications = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const res = await fetch("http://localhost:3000/api/notifications", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error("Erro ao buscar notificações");
      }

      const data = await res.json();

      if (data.length > prevNotificationCount) {
        const audio = new Audio("/notification.mp3");
        audio.play();
      }

      setNotifications(data);
      setPrevNotificationCount(data.length);
    } catch (error) {
      console.error("Erro ao buscar notificações:", error);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <NotificationContext.Provider
      value={{ notifications, refetchNotifications: fetchNotifications }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotifications deve ser usado dentro de um NotificationProvider"
    );
  }
  return context;
};
