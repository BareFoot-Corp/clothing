'use client'

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Home, Search } from "lucide-react";

import AvatarComponent from "../Avatar/Avatar.component";

import { tUser } from "@/lib/type";


export default function BottomNav(){
    
    const [user, setUser] = useState<tUser | null>(null);
    const { data: session } = useSession();

    useEffect(() => {
        const loadUser = async () => {
            if(session){
                const response = await fetch('/api/getData/bottomNav', {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify({ email: session.user?.email })
                });

                if(!response.ok){
                    throw Error("No repsonse from server");
                }

                const data = await response.json();

                setUser(data);
            }
        };
        loadUser();
    }, [session])

    // console.log("Bottom Session:",session);
    return(
        <div className={"absolute bottom-5 left-0 w-full h-10 px-6 flex items-center justify-center text-black pointer-events-none"}>
            <div className="relative w-full h-full flex items-center justify-between">
                <Link
                    href={'/browse'}
                    className={"absolute sm:left-[40%] left-[30%] -translate-x-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-slate-100 hover:scale-150 transition-all duration-200 ease-in-out pointer-events-auto"}
                    >
                    <Search/>
                </Link>
                <Link
                    href={'/'}
                    className={"absolute left-1/2 -translate-x-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-slate-100 hover:scale-150 transition-all duration-200 ease-in-out pointer-events-auto"}
                    >
                    <Home/>
                </Link>
                <Link
                    href={`${user?.id ? `/user/${user.id}` : '/auth/signIn'}`}
                    className={"absolute sm:right-[40%] right-[30%] translate-x-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-slate-100 hover:scale-150 transition-all duration-200 ease-in-out pointer-events-auto"}
                > 
                    <AvatarComponent fullname={user?.username} avatar={user?.avatar}/>
                </Link>
            </div>
                
        </div>
    )
}