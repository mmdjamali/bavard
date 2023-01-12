import React , { useState , useCallback, useEffect } from 'react'
import { RiSearchLine , RiCloseCircleLine , RiCloseCircleFill } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';

type props = {
  setSearchValue : React.Dispatch<React.SetStateAction<string | undefined>>
  searchValue : string | undefined
}

const SearchBox : React.FC<props> = ({
  setSearchValue,
  searchValue
}) => {
  const [value , setValue] = useState<string>(searchValue || "")

  const navigate = useNavigate()

  // useEffect(() => {
  //   setValue(searchValue)
  // }, [searchValue])
  

  return (
    <div
    className={`
    mx-3
    sticky top-0
    bg-gradient-to-b 
    from-white/90 to-white/50 z-10
    backdrop-blur-sm flex items-center justify-center
    `}>

    <div
    className='
    relative
    top-0
    flex items-center
    justify-between
    py-2 px-4
    gap-3
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
        min-w-10
        `}/>
        <form
        onSubmit={(e) => {
          e.preventDefault()
          setSearchValue(value)
          navigate("/explore/" + value.replace("#",""))
        }}>
          <input
          value={value}
          onChange={(e) => {
              setValue(e.target.value)
          }}
          className='
          w-[75%]
          outline-none
          bg-transparent
          text-[1rem]
          text-neutral-500
          '
          placeholder='Search...'
          type={"text"}
          />
        </form>

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