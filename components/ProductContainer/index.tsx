'use client';

import { HTMLAttributes, ReactNode, useContext, useEffect, useMemo, useState } from "react";

import ProductCard from "../ProductCard";
import GridLdrs from "../GridLdrs";

import { browseDataType } from "@/lib/type";
import { FilterContext } from "@/providers/FilterOptions/FilterOptions.Context";

interface iProductContainer extends HTMLAttributes<HTMLDivElement>{
    items: browseDataType[] | null
}

export default function ProductContainer({ items }: iProductContainer ): ReactNode{
    
    const { filterOptions } = useContext(FilterContext);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    // useMemo for derived states || useEffect for local state
    const sortedItems: browseDataType[] | null = useMemo(() => {
        return items && [...items].sort((a, b) => {
            switch(filterOptions.sortBy){
                case "price_asc":
                    return a.price - b.price;
                case "price_desc":
                    return b.price - a.price;
                case "popular_asc":
                    return a.sold - b.sold;
                case "popular_desc":
                    return b.sold - a.sold;
            }
        });
    }, [filterOptions.sortBy, items]);

    useEffect(() => {
        if(!items)
        {
            setIsLoading(true);
        }
        else
        {
            setIsLoading(false);
        }
    }, [items]);

    return(
        <div className="relative w-full h-[85%] flex items-center justify-center overflow-y-auto">
            <div className="w-fit h-full px-8 py-3 grid 2xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-4">
            {
                sortedItems?.map((item, idx) => <ProductCard key={idx} item={item}/>)
            }
            </div>

            { 
                isLoading && <GridLdrs />
            }
        </div>
    )
}