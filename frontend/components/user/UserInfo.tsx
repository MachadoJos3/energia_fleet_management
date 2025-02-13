"use client";

import { FC } from "react";
import { User } from "@/types/user";

interface UserInfoProps {
  user: User | null;
}

const UserInfo: FC<UserInfoProps> = ({ user }) => {
  console.log("User in UserInfo:", user);

  if (!user) {
    return <div>Usuário não encontrado.</div>;
  }

  return (
    <div className="p-4 bg-white shadow-md rounded-md w-1/2 mx-auto">
      <h2 className="text-xl font-bold mb-4">Informações do Usuário</h2>
      <div className="mb-2">
        <strong>Nome: </strong>
        {user.name}
      </div>
      <div className="mb-2">
        <strong>Email: </strong>
        {user.email}
      </div>
      <div className="mb-2">
        <strong>Função: </strong>
        {user.role}
      </div>
    </div>
  );
};

export default UserInfo;
