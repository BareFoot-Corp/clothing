import { getUserByEmail } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest){
    const { email } = await request.json();
    
    try{
        const user = await getUserByEmail(email);

        if(user){
            return NextResponse.json(user, { status: 200 });
        }

        else{
            return NextResponse.json({ message: "No user found"} , { status: 400 }); 
        }
    }
    catch(error){
        return NextResponse.json({ message: `Server Error:\n${error}` }, { status: 500 });
    }
}