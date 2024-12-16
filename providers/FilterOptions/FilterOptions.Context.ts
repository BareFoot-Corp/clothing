import { createContext, Dispatch, SetStateAction } from "react";
import { tFilter, tSortBy } from "@/lib/type";

export type tFilterOptions = {
    sortBy: tSortBy,
    filter: tFilter
}

interface iFilterOptions {
    filterOptions: tFilterOptions;
    setFilterOptions: Dispatch<SetStateAction<tFilterOptions>>
}

export const initialState: tFilterOptions = {
    sortBy: 'popular_asc',
    filter: {
        stock: 'all',
        colors: [],
        sizes: [],
        collections: [],
        price: {
            min: 0,
            max: 999999
        }
    }
}

export const FilterContext = createContext<iFilterOptions>({
    filterOptions: {...initialState},
    setFilterOptions: () => {}
});