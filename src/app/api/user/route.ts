/* eslint-disable */

import { NextResponse } from "next/server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request){
    const newUser = await request.json();
    try{
        const createdUser = await prisma.user.create({
            data: newUser
        });
        return NextResponse.json({ createdUser });
    } catch(error){
        console.error(error);
    } 
}


