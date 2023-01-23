import React, { useEffect, useRef, useState } from 'react'

type props = {
    sx? : string,
    placeholder : string,
    value  :string,
    setValue : React.Dispatch<React.SetStateAction<string>>
    limit : number
}

const LimitedInput : React.FC<props> = ({
  sx , placeholder , value , setValue,
  limit
}) => {
  return (
    <div
    className={`
    flex border-[2px] transition-all
    p-1.5 
    ${
      !value ?
      "border-violet-300 text-violet-300 bg-violet-50/50"
      :
        value.length <= limit ?
        "border-emerald-400 text-emerald-400 bg-emerald-50/50"
        :
        "border-red-400 text-red-400 bg-red-50/50"
    }
    justify-between items-center rounded-[.25rem]
    w-full
    ${sx ? sx : ""}
    `}>
        <input
        value={value}
        onChange={(e : React.ChangeEvent<HTMLInputElement>) => {
            let targetValue = e.target.value
            setValue(targetValue)
        }}
        className="
        text-[1rem]
        bg-transparent
        outline-none
        text-neutral-700
        w-[calc(100%_-_35px)]
        "
        placeholder={placeholder}
        />
        
        <div
        style={{
        "backgroundImage" 
        : 
        `conic-gradient(
        ${value.length <= limit - 20 ? "#8B5CF6" : ""}
        ${value.length > limit - 20 && value.length <= limit ? "rgb(253,224,71)" : ""}
        ${value.length > limit ? "#EF4444" : ""}
        ${((((value.length * 100) / limit) / 100) * 360) + "deg"} ,#e1e1e1 ${((((value.length * 100) / limit) / 100) * 360) + "deg"} )
        `}}
        className='
        min-w-[26px]
        min-h-[26px]
        rounded-full
        grid
        place-items-center
        text-neutral-700
        text-[.75rem]
        '>
            <span
            className={`
            bg-white
            rounded-full
            w-[20px]
            h-[20px]
            `}>
            </span>
        </div>

    </div>
  )
}

export default LimitedInput