"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaBell, FaUserCircle } from "react-icons/fa";
import useAuth from "@/hooks/useAuth";
import { useNotifications } from "@/hooks/useNotifications";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import "@/app/styles/main.css";

const Header = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const { user, logout, loading } = useAuth();
  const { notifications, refetch } = useNotifications();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/user/login");
    }
  }, [user, loading, router]);

  if (loading) {
    return null;
  }

  const handleRedirectToVehicles = () => {
    if (user) {
      router.push("/vehicles");
    }
  };

  return user ? (
    <header className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <div
        className="flex items-center cursor-pointer"
        onClick={handleRedirectToVehicles}
      >
        <h1 className="text-xl font-bold">Gerenciamento de Frota</h1>
      </div>

      <div className="flex items-center space-x-6">
        <div className="relative">
          <button
            onClick={() => {
              setShowNotifications((prev) => !prev);
              refetch();
            }}
            className="text-white"
          >
            <FaBell size={20} />
            {notifications.length > 0 && (
              <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 text-white text-xs rounded-full flex justify-center items-center">
                {notifications.length}
              </span>
            )}
          </button>
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-48 bg-white shadow-md rounded-md">
              <ul>
                {notifications.length > 0 ? (
                  notifications.map((notification, index) => (
                    <li key={index} className="px-4 py-2 border-b text-black">
                      {notification.message}
                    </li>
                  ))
                ) : (
                  <li className="px-4 py-2 text-black">Nenhuma notificação.</li>
                )}
              </ul>
            </div>
          )}
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center space-x-2 text-white">
              <span>{user.name || "Usuário"}</span>
              <FaUserCircle size={24} />
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="w-48 bg-white shadow-md rounded-md">
            <DropdownMenuItem
              onClick={() => router.push("/user")}
              className="px-4 py-2 text-black"
            >
              Minhas informações
            </DropdownMenuItem>

            {user.role === "admin" && (
              <DropdownMenuItem
                onClick={() => router.push("/user/register")}
                className="px-4 py-2 text-black"
              >
                Cadastrar Novo Usuário
              </DropdownMenuItem>
            )}

            <DropdownMenuItem
              onClick={() => {
                logout();
                router.push("/user/login");
              }}
              className="px-4 py-2 text-black"
            >
              Sair
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  ) : null;
};

export default Header;
