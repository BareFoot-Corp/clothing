/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { ChangeEvent, ReactNode, useContext, useEffect, useMemo, useState } from 'react';
import isEqual from "lodash.isequal";
import { ChevronsDown } from 'lucide-react';

import Checkbox from '../Checkbox';
import ColorCheckbox from '../ColorCheckbox';
import RadioGroupFilter from '../RadioGroupFilter';

import { tFilter } from '@/lib/type';
// import { browseData } from '@/lib/type';
import { FilterContext, tFilterOptions } from '@/providers/FilterOptions/FilterOptions.Context';
import { getAllProducts } from '@/lib/db';
// import { filterArray } from '@/lib/utils';

function Index(): ReactNode {
    
    let browseData;

    const [ extendedColorMenu, setExtendedColorMenu ] = useState<boolean>(false);
    const [ extendedSizeMenu, setExtendedSizeMenu ] = useState<boolean>(false);
    const [ extendedCollectionMenu, setExtendedCollectionMenu ] = useState<boolean>(false);
    const [ enableApply, setEnableApply ] = useState<boolean>(false);
    
    
    const allPrices = browseData?.map(data => data.price);
    
    const minPrice = Math.min(...allPrices);
    const maxPrice = Math.max(...allPrices);
    
    const { filterOptions, setFilterOptions } = useContext(FilterContext);
    const [initialFilterOptions, setInitialFilterOptions] = useState<tFilter>(filterOptions.filter);

    const allColors: string[] = [];
    browseData?.forEach(data => data.colors.forEach(color => !allColors.includes(color) ? allColors.push(color): null));

    const allSizes: string[] = [];
    browseData?.forEach(data => data.size.forEach(size => !allSizes.includes(size) ? allSizes.push(size): null));

    const allCollections: string[] = ["male", "female", "kids"];
    
    const toggleColorMenu = () => {
        setExtendedColorMenu(!extendedColorMenu);
    }
    
    const toggleSizeMenu = () => {
        setExtendedSizeMenu(!extendedSizeMenu);
    }
    
    const toggleCollectionMenu = () => {
        setExtendedCollectionMenu(!extendedCollectionMenu);
    }

    const changeCheckedFilter = (category: keyof tFilter, value: string) => {
        if(category === 'stock'){
            setFilterOptions({
                ...filterOptions,
                filter: {
                    ...filterOptions.filter,
                    stock: value
                }
            })
        }
        else if(category !== 'price'){
            setFilterOptions((prevState) => {
                const categoryValues = prevState.filter[category];
                const updatedArray = categoryValues.includes(value) ? categoryValues.filter((item: string) => item !== value) : [...categoryValues, value]; 
                
                return {
                    ...prevState,
                    filter: {
                        ...prevState.filter,
                        [category]: updatedArray
                    }
                }
            
            });
        }
    }

    const changeRadioFilter = (value: string) => {
        setFilterOptions({
            ...filterOptions,
            filter: {
                ...filterOptions.filter,
                stock: value
            }
        })
    }

    const priceChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if(value){
            setFilterOptions({
                ...filterOptions,
                filter: {
                    ...filterOptions.filter,
                    price: {
                        ...filterOptions.filter.price,
                        [name]: parseFloat(value)
                    }
                }
            });
            return;
        }

        switch(name){
            case 'max':
                setFilterOptions({
                    ...filterOptions,
                    filter: {
                        ...filterOptions.filter,
                        price: {
                            ...filterOptions.filter.price,
                            max: 999999
                        }
                    }
                });
                break;
            case 'min':
                setFilterOptions({
                    ...filterOptions,
                    filter: {
                        ...filterOptions.filter,
                        price: {
                            ...filterOptions.filter.price,
                            min: 0
                        }
                    }
                });
                break;
            default:
                break;
        }
    }

    // Filter Reset
    const resetFilterOptions = () => {
        setFilterOptions((prevState) => {
            return {
                ...prevState,
                filter: { ...initialFilterOptions }
            }
        })
    }

    // Checks whether the state changed or not
    const hasStateChanged = useMemo(() => !isEqual(filterOptions.filter, initialFilterOptions), [filterOptions.filter, initialFilterOptions]);
    
    // Apply Button Press
    const handleApply = () => {
        // filterArray(filterOptions.filter, browseData);
        resetFilterOptions();
    }

    // Cancel Button Press
    const handleCancel = () => {
        resetFilterOptions();
    }

    useEffect(() => {
        setEnableApply(hasStateChanged);

        
    }, [filterOptions.filter, initialFilterOptions])

    return (
        <div className='sm:w-40 sm:h-[95%] px-2 py-1 border-r-[1px] hidden sm:flex sm:flex-col sm:items-start sm:justify-start gap-2 overflow-y-auto'>
            {/* ITEM AVAILIBILITY */}
            <div className='flex flex-col items-center justify-between'>
                <RadioGroupFilter items={['In Stock', 'Coming Soon', 'All']} style={{ width: '100%' }} radioChange={changeRadioFilter}/>
            </div>
            {/* COLOR MENU */}
            <div className='w-full py-1 flex flex-col items-start justify-between text-black'>
                <span className='w-full flex items-center justify-between'>
                    <span className='text-md'>Colors</span>
                    <span 
                        className={`${extendedColorMenu ? 'rotate-180' : 'rotate-0'} cursor-pointer transition-all duration-300 ease-in-out`} 
                        onClick={toggleColorMenu}
                    >
                        <ChevronsDown/>
                    </span>
                </span>
                <span 
                    className={`w-full border-solid border-slate-200 flex flex-wrap items-start justify-start gap-2 transition-all duration-100 ease-in-out`}
                    style={{ height: extendedColorMenu ? "auto" : "0px", overflowY: 'auto', overflowX: "hidden", padding: extendedColorMenu ? '0.625rem 0': '0', borderBottomWidth: extendedColorMenu ? '1px' : '0px'}}
                >
                    {
                        allColors.map(
                            (color, idx) => 
                                <span key={idx} className={`px-1 py-2 border border-solid border-slate-200 drop-shadow-lg rounded-xl ${extendedColorMenu ? "flex items-center justify-between gap-3" : "hidden"} `}>
                                    <ColorCheckbox color={color} stateFunction={() => changeCheckedFilter('colors', color)} checked={ filterOptions.filter.colors.includes(color) ? true : false }/>
                                </span>
                        )
                    }
                </span>
            </div>
            {/* SIZE MENU */}
            <div className='w-full py-1 flex flex-col items-start justify-between text-black'>
                <span className='w-full flex items-center justify-between'>
                    <span className='text-md'>Size</span>
                    <span 
                        className={`${extendedSizeMenu ? 'rotate-180' : 'rotate-0'} cursor-pointer transition-all duration-300 ease-in-out`} 
                        onClick={toggleSizeMenu}
                    >
                        <ChevronsDown/>
                    </span>
                </span>
                <span 
                        className={`w-full border-solid border-slate-200 flex flex-wrap items-start justify-start gap-2 transition-all duration-100 ease-in-out`}
                        style={{ height: extendedSizeMenu ? "auto" : "0px", overflowY: 'auto', overflowX: "hidden", padding: extendedSizeMenu ? '0.625rem 0': '0', borderBottomWidth: extendedSizeMenu ? '1px' : '0px'}}
                    >
                    {
                        allSizes.map(
                            (size, idx) => 
                                <span 
                                    key={idx} 
                                    className={`min-w-12 p-2 border border-solid border-slate-200 drop-shadow-lg rounded-xl ${extendedSizeMenu ? "flex items-center justify-between" : "hidden"} text-sm`}
                                >
                                    <Checkbox label={ size } stateFunction={() => changeCheckedFilter('sizes', size)} checked={ filterOptions.filter.sizes.includes(size) ? true : false }/>
                                </span>
                        )
                    }
                </span>
            </div>
            {/* COLLECTION MENU */}
            <div className='w-full py-1 flex flex-col items-start justify-between text-black'>
                <span className='w-full flex items-center justify-between'>
                    <span className='text-md'>Collection</span>
                    <span 
                        className={`${extendedCollectionMenu ? 'rotate-180' : 'rotate-0'} cursor-pointer transition-all duration-300 ease-in-out`} 
                        onClick={toggleCollectionMenu}
                    >
                        <ChevronsDown/>
                    </span>
                </span>
                <span 
                        className={`w-full border-solid border-slate-200 flex flex-wrap items-start justify-start gap-2 transition-all duration-100 ease-in-out`}
                        style={{ height: extendedCollectionMenu ? "auto" : "0px", overflowY: 'auto', overflowX: "hidden", padding: extendedCollectionMenu ? '0.625rem 0': '0', borderBottomWidth: extendedCollectionMenu ? '1px' : '0px'}}
                    >
                    {
                        allCollections.map(
                            (collection, idx) => 
                                <span 
                                    key={idx} 
                                    className={`min-w-20 px-4 py-2 border border-solid border-slate-200 drop-shadow-lg rounded-xl ${extendedCollectionMenu ? "flex items-center justify-between gap-3" : "hidden"} text-sm`}
                                >
                                    <Checkbox label={ collection.toUpperCase() } stateFunction={() => changeCheckedFilter('collections', collection)} checked={ filterOptions.filter.collections.includes(collection) ? true : false }/>
                                </span>
                        )
                    }
                </span>
            </div>
            {/* #################################----------- PRICE -----------################################# */}
            <div className='w-full py-1 flex flex-col items-start justify-between text-black'>
                <span className='w-full flex flex-col items-start justify-between gap-2'>
                    <span className='text-md'>Price</span>
                    <span className='w-full flex items-center justify-between gap-2'>
                        <input 
                            type="number" 
                            name='min'
                            placeholder={`${minPrice.toFixed(2)}`} 
                            className='w-2/3 rounded-md bg-white text-black outline-none border border-solid border-slate-200 text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none' 
                            onChange={priceChangeHandler}
                        />
                        <input 
                            type="number" 
                            name='max'
                            placeholder={`${maxPrice.toFixed(2)}`} 
                            className='w-2/3 rounded-md bg-white text-black outline-none border border-solid border-slate-200 text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
                            onChange={priceChangeHandler}
                        />
                    </span>
                </span>  
            </div>

            <div className='w-full h-fit py-1 mt-auto mb-2 flex items-center justify-between text-black'>
                <div className={`px-2 py-1 rounded-md ${ enableApply ? 'bg-black pointer-events-auto hover:cursor-pointer' : 'bg-gray-300 pointer-events-none hover:cursor-not-allowed'} text-white`} onClick={handleApply}>APPLY</div>
                <div className='px-2 py-1 rounded-md border border-solid border-black cursor-pointer' onClick={handleCancel}>CANCEL</div>
            </div>
        </div>
    )
}

export default Index;