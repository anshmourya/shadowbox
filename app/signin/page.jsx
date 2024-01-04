"use client";
import { H1 } from "@/components/typograph";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signInSchema } from "@/constant/validate";
import { cn } from "@/lib/utils";
import { useAccount } from "@/hooks/useAccount";

const Signin = () => {
  const { createSession } = useAccount();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signInSchema),
  });

  const onSubmit = (data) => {
    console.log(data);
    createSession(data.email, data.password);
  };

  return (
    <>
      <div className="container py-80">
        <form
          className="m-auto max-w-[500px]"
          onSubmit={handleSubmit(onSubmit)}
        >
          <H1 className="text-center">SignIn</H1>
          <div className="my-10">
            <Input
              placeholder="Please enter your email"
              {...register("email")}
            />
            <p
              className={cn(
                errors.name ? "visible " : "hidden",
                "text-red-500 mt-1"
              )}
            >
              {errors.email?.message || "nothing"}
            </p>
          </div>

          <div>
            <Input
              placeholder="Enter your password..."
              type="password"
              {...register("password")}
            />
            <p
              className={cn(
                errors.password ? "visible" : "hidden",
                "text-red-500 mt-1"
              )}
            >
              {errors.password?.message || "nothing"}
            </p>
          </div>
          <div className="flex justify-center my-10">
            <Button>Let&apos;s goo!!!</Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Signin;
