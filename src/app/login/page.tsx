"use client";
import Link from "next/link";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
type Props = {};
interface Idata {
  email: string;
  password: string;
}
function Login({}: Props) {
 const [error , setError] = useState<string>()
  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm<Idata>();
  const formHandeler: SubmitHandler<Idata> = async (data) => {
    const res = await fetch("/api/login" ,{
      method:"POST",
      body:JSON.stringify(data),
      headers:{
        "Content-Type":"application/json"
      }
    })
    if (res.ok) {
      console.log(await res.json());
      setError('')
    }
    else{
      const a = await res.json();
      setError(a)
    }
    reset();
  };
  return (
    <div className="w-full h-screen bg-gradient-to-t from-[#CE3F8E] to-[#424AB3] flex justify-center items-center">
      <form
        onSubmit={handleSubmit(formHandeler)}
        className="flex flex-col  bg-gray-100 gap-5 px-10 py-24 sm:px-20 "
      >
        <h1 className="text-center text-3xl font-bold font-sans">Login</h1>
        <input
          type="email"
          {...register("email", { required: "Enter Your Email" })}
          className="p-3"
          placeholder="Enter Your Email"
        />
        <input
          type="password"
          {...register("password", {
            required: "Enter Your Password",
          })}
          className="p-3"
          placeholder="Enter Your Password"
        />
        <button
          className="bg-[#CF3F8B] p-4 text-white font-semibold hover:bg-gray-600 transition-colors duration-1000"
          type="submit"
        >
          Login
        </button>
        <p>Dont Have Account ? <Link href="/sigin" className="text-[#CE3F8E] underline">Create Account</Link></p>
        {errors.email?.message || errors.password?.message || error ? <p className="text-red-600 text-center">{errors.email?.message || errors.password?.message || error}</p> : null}
      </form>
    </div>
  );
}

export default Login;
