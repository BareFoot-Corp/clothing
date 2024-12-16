import { ChangeEvent, HTMLAttributes, ReactNode } from "react";

interface iCustomInput extends HTMLAttributes<HTMLDivElement>{
  label: string;
  name: string;
  value: string;
  type: string;
  error?: string;
  required?: boolean;
  changeHandler: (event: ChangeEvent<HTMLInputElement>) => void;
}

function Index({ label, name, value, type, changeHandler, error="", required=false }: iCustomInput): ReactNode {
    return(
        <div className='relative w-full flex flex-col items-start justify-start'>
          <label className={`w-full flex items-center ${required ? "justify-between" : "justify-start"}`}>
            <span>{ label }:</span>
            { required && <span className="text-red-600 text-lg">*</span>}
          </label>
          <input 
            type={ type } 
            required 
            className={`w-full md:h-9 h-7 px-2 rounded-md border border-solid ${error ? "border-red-600":"border-black"} outline-none bg-white`}
            onChange={ changeHandler }
            value={ value }
            name={ name }
            autoComplete="false"
          />
          {
            error && <span className="absolute left-full top-1/2 md:w-full w-1/2 ml-2 p-1 bg-red-200 text-red-800 text-sm">{ error }</span>
          }
        </div>
    )
}

export default Index;