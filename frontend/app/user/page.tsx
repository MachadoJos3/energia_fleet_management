"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth";
import UserInfo from "@/components/user/UserInfo";
import Header from "@/components/templates/Header";

const UserPage = () => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/user/login");
    }
  }, [user, loading, router]);

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <>
      <Header />
      <div className="min-h-screen flex justify-center items-center bg-gray-100">
        {user ? <UserInfo user={user} /> : <div>Usuário não encontrado.</div>}
      </div>
    </>
  );
};

export default UserPage;
