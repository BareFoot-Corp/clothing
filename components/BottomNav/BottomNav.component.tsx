import { Home, Search } from "lucide-react";
import Link from "next/link";
import AvatarComponent from "../Avatar/Avatar.component";
import { auth } from "@/lib/auth";
import { getUserById } from "@/lib/db";


import { tUser } from "@/lib/type";


export default async function BottomNav(){
    const session = await auth();
    let user: tUser | null = null;

    if(session?.user){
        user = await getUserById(session.user.id);
    }

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
                    href={`${user?.id ? `/user/${user?.id}` : '/auth/signIn'}`}
                    className={"absolute sm:right-[40%] right-[30%] translate-x-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-slate-100 hover:scale-150 transition-all duration-200 ease-in-out pointer-events-auto"}
                > 
                    <AvatarComponent user={user}/>
                </Link>
            </div>
                
        </div>
    )
}