import { HTMLAttributes, ReactNode } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitials, splitName } from "@/lib/utils";

interface iAvatar extends HTMLAttributes<HTMLDivElement> {
    fullname?: string,
    avatar?: string | null,
}
export default function AvatarComponent({ fullname, avatar }: iAvatar): ReactNode{
    const urlName = () => {
        if(fullname){
            const sName = splitName(fullname);
            // console.log(sName);
            console.log(`${sName[0]}+${sName[1]}`);
            return `${sName[0]}+${sName[1]}`;
        }
        return "John+Doe";
    }

    return(
        <Avatar>
            <AvatarImage src={ avatar ? avatar :`https://api.dicebear.com/9.x/fun-emoji/svg?seed=${urlName()}`} alt={"avatar"}/>
            <AvatarFallback>{ fullname ? getInitials(fullname) : 'JD' }</AvatarFallback>
        </Avatar>
    )
}