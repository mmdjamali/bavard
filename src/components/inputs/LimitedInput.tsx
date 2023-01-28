import React, { useEffect, useRef, useState } from 'react'

type props = {
    sx? : string,
    value  :string,
    setValue : React.Dispatch<React.SetStateAction<string>>
    limit : number,
    title : string
}

const LimitedInput : React.FC<props> = ({
  sx , 
  value , 
  setValue,
  limit,
  title
}) => {
  return (
    <div
    className={sx ? sx : ""}>
      <span
      className='
      mt-[1rem]
      mb-[.25rem]
      text-[.9rem]
      text-neutral-500
      '>
        {title}
      </span>

      <div
      className={`
      flex border-[1px] transition-all
      px-4
      py-2
      ${
        !value ?
        "border-neutral-300 text-violet-300 bg-white"
        :
          value.length <= limit ?
          "border-emerald-400 text-emerald-400 bg-emerald-50/50"
          :
          "border-red-400 text-red-400 bg-red-50/50"
      }
      justify-between items-center rounded-[.25rem]
      w-full
      `}>
          <input
          value={value}
          onChange={(e : React.ChangeEvent<HTMLInputElement>) => {
              let targetValue = e.target.value
              setValue(targetValue)
          }}
          className="
          text-[.9rem]
          bg-transparent
          outline-none
          text-neutral-700
          w-[calc(100%_-_35px)]
          "
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
          min-w-[22px]
          min-h-[22px]
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
              w-[18px]
              h-[18px]
              `}>
              </span>
          </div>

      </div>
      <span
      className='
      text-[.9rem]
      text-red-500
      '>
        {value?.length > limit && "Bio can't contain more than : " + limit + " characters"}
      </span>
    </div>
    
  )
}

export default LimitedInput