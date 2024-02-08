'use client'
import Link from 'next/link'
import React, { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { LuLoader2 } from "react-icons/lu";
type Props = {}
interface Idata{
    name:string
    email:string
    password:string
}
function Sigin({}: Props) {
   const {formState:{errors} , handleSubmit , reset , register} =  useForm<Idata>()
   const [error , setError] = useState<string>()
   const [isLoading , setLoading] = useState<boolean>(false)
   const onSumbit :SubmitHandler<Idata> = async (data) =>{
    setLoading(true)
    const res = await fetch("/api/signup" ,{
      method:"POST",
      body:JSON.stringify(data),
      headers:{
        "Content-Type":"application/json"
      }
    })
    if (res.ok) {
      const re = await res.json()
      console.log(re)
      setError('')
      alert("Login With Same Account")
    }else{
      const re = await res.json()
      setError(re)
    }
         console.log(data);
         setLoading(false)
          reset()
   }
  return (
   <div className='w-full h-screen bg-gradient-to-t from-[#CE3F8E] to-[#424AB3] flex justify-center items-center'>
  <form className="flex flex-col  bg-gray-100 gap-5 px-10 py-24 sm:px-20" onSubmit={handleSubmit(onSumbit)}>
    <h1 className="text-center text-3xl font-bold font-sans">Create Your Account</h1>
  <input type="text"  className="p-3" placeholder='Username' {...register("name" , {required:"Enter Your Username"})}/>
  <input type="email"  className="p-3" placeholder='Email' {...register("email" , {required :"Enter Your Email"})}/>
  <input type="password"  className="p-3" placeholder='Password' {...register("password" , {required:"Enter Your Password"})}/>
  <button
          className="bg-[#CF3F8B] p-4 text-white font-semibold hover:bg-gray-600 transition-colors duration-1000 flex justify-center items-center gap-3"
          type="submit"
        >
          {isLoading ? <LuLoader2 className='animate-spin text-sm text-white font-bold'/>: null}
          Sigin Up
        </button>
        <p>Already Have Account ? <Link href="/login" className="text-[#CE3F8E] underline">Login</Link></p>
        {errors.name?.message || errors.email?.message || errors.password?.message || error ? <p className="text-red-600 text-center">{errors.name?.message || errors.email?.message || errors.password?.message || error}</p>:null}
  </form>
   </div>
  )
}

export default Sigin