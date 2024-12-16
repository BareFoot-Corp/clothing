import { ReactNode } from "react";

// import { tUser } from "@/lib/type";

// interface iLayoutProps extends HTMLAttributes<HTMLDivElement>{
//     user: tUser | null;
// }

interface iLayoutProps {
    children?: ReactNode;
}

function Layout({ children }: iLayoutProps): JSX.Element{
    return(
        <div className='absolute top-0 left-0 w-full h-full flex items-center justify-center text-black'>
            { children }
        </div>
    )
}

export default Layout;