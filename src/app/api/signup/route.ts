import { NextRequest, NextResponse } from "next/server";
import { db } from "@/_lib/drizzle";
import { userdata } from "@/_lib/drizzle";
export async function POST(req:NextRequest) {
    const {email , password} = await req.json()
    const data = await db.select().from(userdata)
    const isLogin = data.find(val => val.email == email)
    if (isLogin) {
        return NextResponse.json("Email Already Exist" , {status:404})
    } 
    else{
       await db.insert(userdata).values({
        email:email,
        password:password
       })
    }
    return NextResponse.json("Data added SucessFull")
}