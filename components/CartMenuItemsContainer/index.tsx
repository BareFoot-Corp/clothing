'use client'

import { ReactNode, useContext } from 'react';
import { CartContext } from '@/providers/Cart/Cart.Context';
import CartMenuItem from '../CartMenuItem';

function Index(): ReactNode {

    const { cartItems, getTotalPrice } = useContext(CartContext);
    
    return (
        cartItems.length > 0 ?
        <div className='w-11/12 max-h-[80%] flex flex-col items-center justify-between'>
            <div className='w-full max-h-[90%] py-1 overflow-y-auto'>
                {
                    cartItems?.map((item) => 
                        <CartMenuItem item={item.item} key={item.item.id} quantity={item.quantity}/>
                    )
                }
            </div>
            <div className='w-full flex items-center justify-center text-xl'>
                Total: ${ getTotalPrice() }
            </div>
        </div>
        :
        <div>No Items in Cart</div>
    )
}

export default Index