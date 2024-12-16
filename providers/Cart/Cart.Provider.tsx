'use client'

import { HTMLAttributes, ReactNode, useState } from "react";
import { CartContext, tCart } from "./Cart.Context";
import { browseDataType } from "@/data/data";

export default function CartProvider({ children }: HTMLAttributes<HTMLDivElement>): ReactNode{
    const [ cartItems, setCartItems ] = useState<tCart[]>([]);

    const getTotalPrice = () => {
        if(cartItems.length){
            return (cartItems.reduce((acc, currentItem) => acc + (currentItem.item.price * currentItem.quantity) , 0)).toFixed(2);
        }
        return null;
    }

    const addToCart = (item: browseDataType) => {
        setCartItems((prevState) => {
            const existingItem = prevState.find((cartItem) => cartItem.item.id === item.id);
            if(existingItem)
            {
              return prevState.map((cartItem) => cartItem.item.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1} : cartItem );  
            } 

            return [ ...prevState, { item, quantity: 1}];
        })
    }

    const updateCart = (id: string | number, quantity: number) => {
        setCartItems((prevState) => prevState.map((cartItem) => cartItem.item.id === id ? { ...cartItem, quantity } : cartItem));
    }

    const removeFromCart = (id: string | number) => {
        setCartItems((prevState) => prevState.filter( cartItem => cartItem.item.id !== id));
    }

    return(
        <CartContext.Provider value={{ cartItems, getTotalPrice, addToCart, updateCart, removeFromCart }}>
            { children }
        </CartContext.Provider>
    )
}