'use client'

import { HTMLAttributes, ReactNode, useState } from "react";
import { FilterContext, initialState, tFilterOptions } from "./FilterOptions.Context";

function FilterOptionsProvider({ children }: HTMLAttributes<HTMLDivElement>): ReactNode{
    const [filterOptions, setFilterOptions ] = useState<tFilterOptions>({
        ...initialState
    })
    return(
        <FilterContext.Provider value={{ filterOptions, setFilterOptions}}>
            { children }
        </FilterContext.Provider>
    )
}

export default FilterOptionsProvider;