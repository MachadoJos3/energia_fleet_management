"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth";

const Page = () => {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/vehicles");
    }
  }, [user, router]);

  return null;
};

export default Page;
