/* eslint-disable */

import { NextResponse } from "next/server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request){
    const  { email, password }= await request.json();
    try{
        const foundUser = await prisma.user.findFirstOrThrow({
            where:{
                email: email,
                password: password
            }
        });
        return NextResponse.json({ foundUser, status: 200});
    } catch(error){
        return NextResponse.json({ status: 404 })
    }
}

export async function GET(){
    const allCategories = await prisma.category.findMany({});
    return NextResponse.json({ allCategories });
}