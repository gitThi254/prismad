"use client";
import { signOut, useSession } from "next-auth/react";
import React from "react";

const BtnLogout = () => {
  const { data: session } = useSession();

  return (
    <div>
      <h1>{session?.user?.name}</h1>
      <h1>{session?.user?.role}</h1>

      <button onClick={() => signOut()}>BtnLogout</button>
    </div>
  );
};

export default BtnLogout;
