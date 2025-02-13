import { useEffect, useState } from "react";

interface Notification {
  message: string;
  type: string;
}

export const useNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [prevNotificationCount, setPrevNotificationCount] = useState<number>(0);

  const fetchNotifications = async () => {
    if (!localStorage.getItem("authToken")) {
      return;
    }
    try {
      const token = localStorage.getItem("authToken");
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/notifications`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) {
        throw new Error("Erro ao buscar notificações");
      }

      const data = await res.json();
      setNotifications(data);

      setPrevNotificationCount(data.length);
    } catch (error) {
      console.error("Erro ao buscar notificações:", error);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  return { notifications, refetch: fetchNotifications };
};
