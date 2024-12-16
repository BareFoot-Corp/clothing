'use client';

import { HTMLAttributes, ReactNode, useContext, useEffect, useMemo, useState } from "react";

import { grid } from "ldrs";

import ProductCard from "../ProductCard";

import { browseDataType } from "@/lib/type";
import { FilterContext } from "@/providers/FilterOptions/FilterOptions.Context";

interface iProductContainer extends HTMLAttributes<HTMLDivElement>{
    items: browseDataType[] | null
}

grid.register();

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
        else if(items?.length === 0){
            setIsLoading(false);
            // Need to add no resources found
        }
        else{
            setIsLoading(false);
        }
    }, [items])

    return(
        <div className="relative h-[85%] flex items-center justify-center overflow-y-auto">
            <div className="w-fit h-full px-8 py-3 grid 2xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-4">
            {
                sortedItems?.map((item, idx) => <ProductCard key={idx} item={item}/>)
            }
            </div>

            { 
                isLoading &&
                <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center z-50">
                    <l-grid
                        color="black"
                        size={75}
                        speed={1.0}
                    >
                    </l-grid>
                </div>
            }
        </div>
    )
}