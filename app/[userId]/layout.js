"use client";

import { useAuthContext } from "@/context/AuthContext";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function RootLayout({ children }) {
  const { user } = useAuthContext();
  const router = useRouter();
  let urlUid = usePathname().split("/")[1]

  useEffect(
    () => {
      if (!user) {
        router.push("/");
      }
    },
    [user]
  );

  if(user.uid != urlUid){
    return router.push("/not-found")
  }
  if(user){
    return <>{children}</>
  }
  else{
    router.push("/");
    return null;
  }
}
