import React , { useState , useEffect} from 'react';
import { FC , MouseEvent } from "react"
import { CgSpinner } from "react-icons/cg"
type props = {
    onClick? : (e : MouseEvent<HTMLButtonElement> ) => void,
    sx? : string | null,
    title : string | React.ReactNode | Element,
    loading? : boolean
}

const FullWidthButton : FC<props> = ({onClick , sx , title , loading}) => {

    return (
        <button
        type="submit"
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
    );
}

export default FullWidthButton;
