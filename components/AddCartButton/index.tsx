import {HTMLAttributes, ReactNode, useContext, useEffect} from 'react';
import { browseDataType } from '@/data/data';
import { CartContext } from '@/providers/Cart/Cart.Context';

interface iProductItem extends HTMLAttributes<HTMLDivElement>{
    productItem: browseDataType;
}

function Index({ productItem }: iProductItem): ReactNode {
    const { addToCart } = useContext(CartContext); 

    return (
        <div 
            className="w-full py-2 border-solid border-black border-[1px] flex items-center justify-center text-lg cursor-pointer hover:bg-black hover:text-white  transition-all duration-200"
            onClick={() => addToCart(productItem)}
        >
            Add To Cart
        </div>
    )
}

export default Index;