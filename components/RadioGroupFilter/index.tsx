'use client'

import { HTMLAttributes, ReactNode, useContext, useEffect, useState } from "react";
import { FilterContext } from "@/providers/FilterOptions/FilterOptions.Context";

interface iRadioProps extends HTMLAttributes<HTMLDivElement>{
    items: string[];
    radioChange: (value: string) => void;
}

const Index = ({ items, radioChange }: iRadioProps): ReactNode  => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const { filterOptions, setFilterOptions } = useContext(FilterContext);

  const selectButton = (index: number) => {
    setSelectedIndex(index); // Update the selected index
    switch(index){
        case 0:
            radioChange('stock');
            break;
        case 1:
            radioChange('soon');
            break;
        case 2:
            radioChange('all');
            break;
        default:
            break;
    }
  };

  useEffect(() => {
    switch(filterOptions.filter.stock){
      case 'stock':
        setSelectedIndex(0);
        break;
      case 'soon':
        setSelectedIndex(1);
        break;
      case 'all':
        setSelectedIndex(2);
        break;
      default:
        break;
    }
  }, [filterOptions.filter.stock])

  return (
    <div className="flex flex-col items-start justify-start">
      {items.map((item, index) => (
        <div   
            key={index}
            className="flex items-center justify-start gap-2"
        >
            <div
            onClick={() => selectButton(index)}
            style={{
                backgroundColor: selectedIndex === index ? "#333" : "transparent",
            }}
            className="w-3 h-3 border-2 border-solid border-black rounded-full cursor-pointer"
            />
            <div className="text-black">{ item }</div>
        </div>
      ))}
    </div>
  );
};

export default Index;
