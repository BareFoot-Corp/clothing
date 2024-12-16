
import { ReactNode } from "react"
import Link from "next/link"

import CartMenuItemsContainer from "../CartMenuItemsContainer"

function Index(): ReactNode {
  return (
    <div 
      className="absolute z-30 top-[120%] right-0 w-80 h-96 py-4 px-2 rounded-md border border-solid border-black flex flex-col items-center justify-between gap-4 bg-white"
    >
        <CartMenuItemsContainer />
        <Link 
          href={`/cart`}
          className="px-4 py-2 rounded-md border border-solid border-black flex items-center justify-center hover:bg-black hover:text-white"
        >Proceed To Checkout</Link>
    </div>
  )
}

export default Index