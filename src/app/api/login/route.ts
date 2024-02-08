import { NextRequest, NextResponse } from "next/server";
import * as jose from "jose";
import { cookies } from "next/headers";
import { db  , userdata} from '@/_lib/drizzle';
export async function POST(req:NextRequest) {
   try{
    const {email , password} = await req.json()
    const data = await db.select().from(userdata)
    const isLogin = data.find( val => val.email == email && val.password == password)
    if (isLogin) {
    const secret = new TextEncoder().encode(
        process.env.JWT_SECRET
    )
    const jwt = await new jose.SignJWT({email:email , password:password})
    .setProtectedHeader({alg:"HS256"})
    .setIssuedAt()
    .setExpirationTime("1d")
    .sign(secret)
    cookies().set("jwttoken" , jwt )
        return NextResponse.json("Login")
    }
    else{
        return NextResponse.json("Invalid Email or Password" ,{status :404})
    }
}
catch (error){
    return new NextResponse((error as {message:string}).message)
}
}