import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// When a client goes to their user page.
export async function GET(request: NextRequest){
    const userId = new URL(request.url).searchParams.get('userId');

    try{
        if(userId){
            const user = await prisma.user.findUnique({
                where: { id: userId },
                select: { fullname: true, username: true, email: true, id: true }
            });
            if(user){
                return new NextResponse(JSON.stringify(user));
            }
            return NextResponse.json({ error: 'No user found'}, { status: 400 })
        }
        else{
            return NextResponse.json({ error: 'Invalid User ID'}, { status: 300 })
        }
    }
    catch(err){
        return NextResponse.json({ error: `Server Error:\n${err}`}, { status: 500 })
    }

}