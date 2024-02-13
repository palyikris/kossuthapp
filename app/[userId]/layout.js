"use client";

import { useAuthContext } from "@/context/AuthContext";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function RootLayout({ children }) {
  const { user } = useAuthContext();
  const router = useRouter();
  let urlUid = usePathname().split("/")[1];

  useEffect(
    () => {
      if (!user) {
        router.push("/");
      }
    },
    [user]
  );

  if (user) {
    if (user.uid != urlUid) {
      router.push("/");
    } else {
      return children;
    }
  } else {
    router.push("/");
  }
}
