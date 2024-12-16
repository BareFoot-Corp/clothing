/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import { ReactNode, useContext, useEffect, useRef } from "react"
import { usePathname } from "next/navigation";
import Image from "next/image"
import Link from "next/link"

import { ShoppingBag, Heart } from 'lucide-react';

import { AppContext } from "@/providers/AppProvider";
import { CartContext } from "@/providers/Cart/Cart.Context";

import CartMenu from "../CartMenu";

export default function NavBar(): ReactNode{
    const cartRef = useRef<HTMLDivElement>(null);
    const { appState, setAppState } = useContext(AppContext);
    const { cartItems } = useContext(CartContext);

    const pathName  = usePathname();

    const toggleCartMenu = (cmd: boolean) => {
        setAppState({ ...appState, showCart: cmd});
    }

    const changeTab = (tab: string) => {
        setAppState({
            ...appState,
            currentTab: tab
        })
    }  

    const handleOutsideClick = (event: MouseEvent) => {
        if (cartRef.current && !cartRef.current.contains(event.target as Node)) {
            toggleCartMenu(false);
        }
    }

    useEffect(()=>{
        switch(pathName)
        {
            case "/men":
                changeTab("men");
                break;
            case "/women":
                changeTab("women");
                break;
            case "/kids":
                changeTab("kids");
                break;
            default:
                changeTab("");
                break;
        }

        if(appState.showCart)
        {
            document.addEventListener('mousedown', handleOutsideClick);
        }
        else{
            document.removeEventListener('mousedown', handleOutsideClick);
        }

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
          };
    }, [pathName, appState.showCart]);

    return(
        <header className={"relative z-10 w-full h-auto pt-3 px-8 flex items-center justify-between text-black"}>
            <div className={"w-10 h-10 flex items-center justify-center"}>
                <Image 
                    src=""
                    alt={"logo"} 
                    width={0} 
                    height={0} 
                    className={"w-full h-full"}
                />
            </div>
            <nav
                className={`md:top-1/2 md:-translate-y-1/2 px-3 py-2 absolute top-[100%] left-1/2 flex items-center justify-between gap-16 -translate-x-1/2`}
            >
                <Link 
                    href={"/men"}
                    className={`tracking-wide ${appState.currentTab === 'men' ? 'border-b-2 border-solid border-black text-2xl font-semibold' : 'text-xl'} hover:scale-110 transition-all duration-300 ease-in-out`}
                >MEN</Link>
                <Link 
                    href={"/women"}
                    className={`tracking-wide ${appState.currentTab === 'women' ? 'border-b-2 border-solid border-black text-2xl font-semibold' : 'text-xl'} hover:scale-110 transition-all duration-300 ease-in-out`}
                >WOMEN</Link>
                <Link 
                    href={"/kids"} 
                    className={`tracking-wide ${appState.currentTab === 'kids' ? 'border-b-2 border-solid border-black text-2xl font-semibold' : 'text-xl'} hover:scale-110 transition-all duration-300 ease-in-out`}
                >KIDS</Link>
            </nav>
            <div className={"px-3 flex items-center justify-between gap-4"}>
                <div className="relative w-full h-full flex items-center justify-center" ref={cartRef}>
                    <ShoppingBag 
                        className={"cursor-pointer"} 
                        onClick={() => toggleCartMenu(!appState.showCart)}
                    />
                    {
                        cartItems?.length ? 
                        <span className="absolute right-0 top-0 -translate-y-1/2 translate-x-1/2 w-3 h-3 p-2 rounded-full flex items-center justify-center bg-red-600 text-xs text-white font-bold pointer-events-none">
                            { cartItems?.length }
                        </span>
                        :
                        null
                    }
                    {
                        appState.showCart && <CartMenu />
                    }
                </div>
                <div className="relative w-full h-full flex items-center justify-center">
                    <Heart className={"cursor-pointer"}/>
                </div>
            </div>
        </header>
    )
}