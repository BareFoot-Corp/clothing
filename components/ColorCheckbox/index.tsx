'use client'

import { HTMLAttributes, ReactNode, useEffect, useState } from "react";
import { Check } from 'lucide-react';

interface iCheckbox extends HTMLAttributes<HTMLInputElement>{
    checked?: boolean;
    color: string;
    stateFunction?: (checked: boolean) => void;
}

function Index({ checked = false, stateFunction, color }: iCheckbox): ReactNode{
    const [isChecked, setIsChecked] = useState<boolean>(checked);

    const changeChecked = () => {
        setIsChecked(!isChecked);
        stateFunction?.(isChecked); // If stateFunction exists
    }

    useEffect(() => {
    })
    return(

        <div className="flex items-center justify-start gap-2">
            <div 
                className="relative w-3 h-3 rounded-[0.25rem] flex items-center justify-center bg-slate-300 cursor-pointer"
                onClick={changeChecked}
            >
                { 
                    isChecked 
                        && 
                    <Check className="w-11/12 h-11/12 font-bold text-black" /> 
                }
            </div>
            <div 
                style={{background: color}} 
                className='w-3 h-3 border-solid border-black border-[1px] rounded-full'
                onClick={changeChecked}
            >
                
            </div>
        </div>
    ) 
}

export default Index;