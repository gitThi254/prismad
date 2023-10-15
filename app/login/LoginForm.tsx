"use client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
type UserLogin = {
  email: string;
  password: string;
};

const LoginForm = () => {
  const router = useRouter();
  const form = useForm<UserLogin>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;
  const onSubmit = async (data: UserLogin) => {
    const res = await signIn("credentials", { ...data, redirect: false });
    if (res?.error) {
      alert("loi danh nhap");
      return;
    }
    router.replace("/");
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        type='email'
        placeholder='email'
        {...register("email", {
          required: "REquired",
        })}
      />
      <input
        type='password'
        {...register("password", { required: "Required" })}
      />
      <button>Login</button>
    </form>
  );
};

export default LoginForm;
