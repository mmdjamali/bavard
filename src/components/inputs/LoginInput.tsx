import React, { ReactNode , FC , Dispatch , SetStateAction } from "react"
import { useState , useRef} from 'react';

type props = {
    value : string,
    setValue : Dispatch<SetStateAction<string>>,
    icon : ReactNode,
    placeholder : string,
    pattern : RegExp,
    sx? : string
}

const LoginInput : FC<props> = ({
    icon , placeholder , value , setValue , pattern , sx
}) => {
    const [firstLoad , setFirstLoad] = useState<boolean>(true)
    const [empty , setEmpty] = useState<boolean>(false)
    const [valid , setValid] = useState<boolean>(false)

    const checkInput = useRef<NodeJS.Timeout | null>(null)

    return (
    <div
        className={`${sx ? sx : ""}`}>
            <div
            className={`
            flex border-[2px] transition-all
            ${ firstLoad ? "border-violet-300 text-violet-300 bg-violet-50/50" : "" } 
            ${ !firstLoad ? (valid ? "border-emerald-400 text-emerald-400 bg-emerald-50" : "border-red-400 text-red-400 bg-red-50") : ""}
            ${ !firstLoad ? (!empty ? "" : "border-red-500/90 text-red-500/90 bg-red-50" ) : "" }
            justify-start items-center rounded-[.25rem]
            w-full
            `}>
                <div
                className='p-1.5 text-[1.5rem]'>
                    {icon}
                </div>
                
                <input
                onChange={(e : React.ChangeEvent<HTMLInputElement>) => {
                    let targetValue = e.target.value;

                    setValue(targetValue)

                    if(checkInput.current){
                    clearTimeout(checkInput.current)
                    }
                    checkInput.current = setTimeout(() => {
                        setValid(pattern.test(targetValue))
                        setFirstLoad(false)
                        setEmpty(false)
                    },1000)
                }}
                onFocus={() => {
                    setFirstLoad(true)
                    setEmpty(false)
                }}
                onBlur={() => {
                    setFirstLoad(false)
                    if(checkInput.current) 
                        clearTimeout(checkInput.current)
                    
                    if(!value){
                        setEmpty(true)
                        return
                    }
                    setValid(pattern.test(value))
                    setEmpty(false)
                }}
                className="
                bg-transparent
                outline-none
                text-gray-600
                text-[1rem]
                w-full
                px-1
                "
                placeholder={placeholder}
                />
            </div>

    </div>
    );
}

export default LoginInput;
