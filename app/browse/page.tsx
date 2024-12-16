/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { ChangeEvent, ReactNode, useContext, useEffect, useRef, useState } from 'react';

import { tSortBy } from '@/lib/type';
import { browseDataType } from '@/lib/type';

import ProductContainer from '@/components/ProductContainer';
import FilterBar from '@/components/FilterBar';

import { FilterContext } from '@/providers/FilterOptions/FilterOptions.Context';

function Page(): ReactNode {
    
    const { filterOptions, setFilterOptions } = useContext(FilterContext);
    const selectRef = useRef<HTMLSelectElement>(null);

    const [browseData, setBrowseData] = useState<browseDataType[] | null>(null);

    const selectChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
        setFilterOptions({
            ...filterOptions,
            sortBy: e.target.value as tSortBy
        })    
    }

    useEffect(() => {
        if(selectRef?.current){
            selectRef.current.value = filterOptions.sortBy;
        }
        // Initial Load
        fetch('/api/product/all')
            .then(response => response.json())
            .then(data => setBrowseData(data))
            .catch(error => console.warn(error)) 

    }, [filterOptions.sortBy, selectRef.current?.value])

    return (
        <div className='absolute left-0 top-0 w-full h-full flex flex-col items-center justify-end overflow-hidden'>
            <div className='w-full sm:h-[90%] h-[85%] px-4 py-2 flex flex-col items-center justify-center gap-2'>
                {/* Sort Bar */}
                <div className='w-full h-12 border-[1px] border-solid border-slate-300 rounded-2xl px-3 flex items-center justify-between'>
                    {/* Breadcrumbs */}
                    <div>

                    </div>
                    {/* Sort Input */}
                    <div className='h-full sm:px-3 sm:py-1 flex items-center justify-between sm:gap-4 gap-1'>
                        <span className='text-black sm:inline-block hidden'>Sort By:</span>
                        <select
                            className='px-3 py-1 rounded-sm border-px border-black border-solid bg-slate-100 text-black outline-none'
                            ref={selectRef}
                            onChange={selectChangeHandler}
                        >
                            <option value="price_asc">Price ↑</option>
                            <option value="price_desc">Price ↓</option>
                            <option value="popular_asc">Popularity ↑</option>
                            <option value="popular_desc">Popularity ↓</option>
                        </select>
                    </div>
                </div>
                {/* Filter and cards */}
            <div className={`w-full sm:h-full h-[90%] border-[1px] border-solid border-slate-300 rounded-2xl flex items-center justify-between sm:flex-row flex-col`}>
                    {/* Filter */}
                    <FilterBar/>
                    {/* Cards */}
                    <div className='w-full h-full flex items-start justify-center'>
                        <ProductContainer items={browseData}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Page