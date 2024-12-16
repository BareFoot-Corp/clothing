/* eslint-disable @next/next/no-img-element */
import { browseDataType } from '@/data/data'
import React, { HTMLAttributes } from 'react'

interface iCartItemProps extends HTMLAttributes<HTMLDivElement>{
  item: browseDataType;
  quantity: number;
}

function Index({ item, quantity }: iCartItemProps) {
  return (
    <div className='w-11/12 h-20 p-1 border-b border-solid border-black flex items-center justify-start gap-2'>
      <div className='w-1/5 flex items-center justify-center'>
        <img src={ item.imgURL } alt="product-pic" className='w-full'/>
      </div>
      <div className='w-1/2 h-full flex items-center justify-start'>
        { item.name }
      </div>
      <div className='w-1/12 h-full flex items-center justify-start'>
        { quantity }
      </div>
      <div className='w-1/12 h-full flex items-center justify-end'>
        { (item.price * quantity).toFixed(2) }
      </div>
    </div>
  )
}

export default Index