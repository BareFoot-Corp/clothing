// import { Dispatch, SetStateAction, createContext } from "react";

import { createContext } from "react";
import { browseDataType } from "@/data/data";

export type tCart = {
    item: browseDataType,
    quantity: number
}

interface iCart {
    cartItems: tCart[];
    getTotalPrice: () => string | null;
    addToCart: (cartItem: browseDataType) => void;
    updateCart: (id: string | number, quantity: number) => void;
    removeFromCart: (id: string | number) => void;
}

export const CartContext = createContext<iCart>({
    cartItems: [],
    getTotalPrice: () => null,
    addToCart: () => {},
    updateCart: () => {},
    removeFromCart: () => {}
});