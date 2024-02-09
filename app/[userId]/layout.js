"use client";

import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function RootLayout({ children }) {
  const { user } = useAuthContext();
  const router = useRouter();

  useEffect(
    () => {
      if (!user) {
        router.push("/");
      }
    },
    [user]
  );

  if(user){
    return <>{children}</>
  }
  else{
    router.push("/");
    return null;
  }
}
