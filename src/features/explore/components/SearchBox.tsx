import React , { useState , useCallback } from 'react'
import { RiSearchLine , RiCloseCircleLine , RiCloseCircleFill } from "react-icons/ri";

type props = {

}

const SearchBox : React.FC<props> = () => {
  const [value , setValue] = useState<string>("")

  return (
    <div
    className='
    sticky top-0
    bg-white/50 z-10
    backdrop-blur-sm flex items-center justify-center
    '>

    <div
    className='
    relative
    w-[80%]  top-0
    flex items-center
    justify-between
    py-2 px-4
    gap-4
    bg-violet-50
    rounded-lg
    my-2
    border-2 border-transparent
    focus-within:border-violet-500 
    focus-within:text-violet-500 
    focus-within:bg-white 
    text-violet-dark/75
    
    '>

        <RiSearchLine
        className={`
        text-[1.25rem]
        
        `}/>

        <input
        value={value}
        onChange={(e) => {
            setValue(e.target.value)
        }}
        className='
        w-[65%]
        outline-none
        bg-transparent
        text-[1rem]
        text-neutral-500
        '
        placeholder='Search...'
        type={"text"}
        />

        <RiCloseCircleFill
        className={`
        text-[1.25rem]
        cursor-pointer

        ${!value ? " pointer-events-none opacity-0 " : ""}
        `}
        onClick={() => {
            setValue("")
        }}
        />

    </div>

    </div>
  )
}

export default SearchBox