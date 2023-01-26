import React , { useState , useEffect} from 'react';
import { FC , MouseEvent } from "react"
import { CgSpinner } from "react-icons/cg"
type props = {
    onClick? : (e : MouseEvent<HTMLButtonElement> ) => void,
    sx? : string | null,
    title : string | React.ReactNode | Element,
    Error? : string,
    loading? : boolean,
    TYPE? : "button" | "submit" | "reset" | undefined
}

const FullWidthButton : FC<props> = ({
    onClick , 
    sx , 
    title , 
    loading,
    TYPE,
    Error
}) => {

    return (
        <div>
            <button
            type={TYPE ? TYPE : "submit"}
            onClick={onClick}
            className={`
            ${!!loading ? "pointer-events-none" : ""}
            flex justify-center items-center
            bg-violet-500 text-white text-[1rem]
            py-[.5rem] w-full rounded-[.25rem] hover:bg-violet-600
            transition-colors delay-150 ease-linear font-medium 
            shadow-[0px_4px_6px] shadow-violet-400/50
            hover:shadow-[0px_4px_8px] hover:shadow-violet-400/70
            ${sx ? sx : ""}
            `}
            >
                {!!loading ? <CgSpinner className='text-[1.5rem] animate-spin'/> : <>{title}</>}
            </button>

            <span
            className='
            text-red-500
            text-[.9rem]
            '>
                {Error}
            </span>
        </div>
    );
}

export default FullWidthButton;
