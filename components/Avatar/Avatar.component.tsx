import { HTMLAttributes, ReactNode } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitials, splitName } from "@/lib/utils";
import { tUser } from "@/lib/type";

interface iAvatar extends HTMLAttributes<HTMLDivElement> {
    user: tUser | null;
}

export default function AvatarComponent({ user }: iAvatar): ReactNode{
    const urlName = () => {
        if(user?.fullname){
            const sName = splitName(user.fullname);
            // console.log(sName);
            return `${sName[0]}+${sName[1]}`;
        }
        return;
    }

    return(
        <Avatar>
            <AvatarImage src={ user?.avatar ? user?.avatar :`https://api.dicebear.com/9.x/fun-emoji/svg?seed=${urlName()}`} alt={"avatar"}/>
            <AvatarFallback>{ user ? getInitials(user.fullname) : 'F' }</AvatarFallback>
        </Avatar>
    )
}