"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const useAuth = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    const fetchUser = async () => {
      try {
        if (token) {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/users/me`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (response.ok) {
            const data = await response.json();
            setUser(data);
          } else {
            localStorage.removeItem("authToken");
            setUser(null);
          }
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Erro ao buscar dados do usuário:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const logout = () => {
    localStorage.removeItem("authToken");
    setUser(null);
    router.push("/user");
  };

  const register = async (
    name: string,
    email: string,
    password: string,
    role: string
  ) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email, password, role }),
        }
      );

      if (!response.ok) {
        throw new Error("Erro ao cadastrar usuário");
      }

      const data = await response.json();

      if (!localStorage.getItem("authToken")) {
        localStorage.setItem("authToken", data.token);
      }

      const userResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/me`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${data.token}`,
          },
        }
      );

      const userData = await userResponse.json();
      setUser(userData);

      return data;
    } catch (error) {
      console.error("Erro no registro:", error);
      throw error;
    }
  };

  return { user, loading, logout, register };
};

export default useAuth;
