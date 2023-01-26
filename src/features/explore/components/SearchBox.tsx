import React , { useState , useCallback, useEffect } from 'react'
import { RiSearchLine , RiCloseCircleLine , RiCloseCircleFill } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';

type props = {
  setSearchValue : React.Dispatch<React.SetStateAction<string | undefined>>
  setSection : React.Dispatch<React.SetStateAction<string>>
  searchValue : string | undefined
}

const SearchBox : React.FC<props> = ({
  setSearchValue,
  setSection ,
  searchValue
}) => {
  const [value , setValue] = useState<string>(searchValue || "")

  const navigate = useNavigate()

  useEffect(() => {
    setValue(searchValue || "")
  }, [searchValue])
  

  return (
    <div
    className={`
    sticky top-0
    bg-white
    z-10
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
    mx-4
    border-2 border-transparent
    focus-within:border-violet-500 
    focus-within:text-violet-500
    focus-within:bg-white 
    text-violet-dark/75
    
    '>

        <RiSearchLine
        className={`
        text-[1.25rem]
        min-w-[20px]
        `}/>

        <form
        className='
        overflow-hidden

        '
        onSubmit={(e) => {
          e.preventDefault()
          setSearchValue(value)
          navigate("/explore/" + value.replace("#",""))
          setSection("Search")
        }}>
          <input
          value={value}
          onChange={(e) => {
              setValue(e.target.value)
          }}
          className='
          w-full
          overflow-hidden
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
        min-w-[20px]

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