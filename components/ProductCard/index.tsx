/* eslint-disable @next/next/no-img-element */
'use client'

import { browseDataType } from "@/data/data";

import { CartContext } from "@/providers/Cart/Cart.Context";

import { HTMLAttributes, ReactNode, useContext, useEffect} from "react";
import AddCartButton from "../AddCartButton";

interface iProductCard extends HTMLAttributes<HTMLDivElement>{
    item: browseDataType
}

export default function Index({ item }: iProductCard): ReactNode{

    const { cartItems } = useContext(CartContext);

    useEffect(() => {
        // console.log(cartItems);
    }, [cartItems])

    return(
        <div 
        className="2xl:w-[350px] 2xl:h-[550px] w-[300px] h-[450px] shrink grow-0 px-4 py-3 border border-solid border-slate-200 rounded-xl shadow-lg flex flex-col items-center justify-between text-black"
        >
            <div className="h-2/3 w-full">
                <img src={item?.imgURL} alt="product" className="w-full h-full rounded-xl"/>
            </div>
            <h2 className="w-full text-left lg:text-2xl text-xl">{ item?.name }</h2>
            <span className="w-full flex items-center justify-between">
                <p>Colors: </p>
                <span className="flex items-center justify-center gap-1">
                    { 
                        item?.colors.map((color, idx) => 
                            <span style={{ background: color }} className={`w-4 h-4 rounded-full border-solid border border-black`} key={idx}>
                            </span>
                        ) 
                    }
                </span>
            </span>  
            <span className="w-full lg:text-2xl text-xl">
                ${ item?.price.toFixed(2) }
            </span>
            <AddCartButton productItem={item}/>
        </div>
    )
}