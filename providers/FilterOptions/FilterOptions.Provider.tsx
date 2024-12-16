'use client'

import { HTMLAttributes, ReactNode, useState } from "react";
import { FilterContext, initialState, tFilterOptions } from "./FilterOptions.Context";

function FilterOptionsProvider(props: HTMLAttributes<HTMLDivElement>): ReactNode{
    const [filterOptions, setFilterOptions ] = useState<tFilterOptions>({
        ...initialState
    })
    return(
        <FilterContext.Provider value={{ filterOptions, setFilterOptions}}>
            { props.children }
        </FilterContext.Provider>
    )
}

export default FilterOptionsProvider;