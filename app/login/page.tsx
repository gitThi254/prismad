import React from "react";
import LoginForm from "./LoginForm";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

const LoginPage = async () => {
  const session = await getServerSession(authOptions);
  if (session) redirect("/");
  return (
    <div>
      <h1>login</h1>
      <LoginForm />
    </div>
  );
};

export default LoginPage;
