'use client'

import { HTMLAttributes, ReactNode, useEffect, useState } from "react";
import { Check } from 'lucide-react';

interface iCheckbox extends HTMLAttributes<HTMLInputElement>{
    checked?: boolean;
    label: string;
    stateFunction?: (checked: boolean) => void;
}

function Checkbox({ label, checked = false, stateFunction }: iCheckbox): ReactNode{
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
                className="flex items-center justify-start text-black cursor-pointer"
                onClick={changeChecked}
            >
                { label }
            </div>
        </div>
    ) 
}

export default Checkbox;