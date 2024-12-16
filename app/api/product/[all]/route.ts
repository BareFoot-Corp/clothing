import { getAllProducts } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(){
    try
    {
        const products = await getAllProducts();
        if(products.length)
        {
            return new NextResponse(JSON.stringify({ message: "Products Found", data: products }), { status: 200 });
        }
        else{
            return new NextResponse(JSON.stringify({message: "Products Not Found", data: null}), { status: 400 });
        }
    }
    catch(error)
    {   
        console.log(error);
        return new NextResponse(JSON.stringify({message: "Server Error", data: null}), { status: 500 });
    }
}