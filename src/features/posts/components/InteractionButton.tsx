import { PostgrestError } from '@supabase/supabase-js'
import React, { useState } from 'react'
import { IconType } from 'react-icons/lib'

type props = {
    onClick : () => void,
    color : string,
    fillColor : string,
    FilledIcon : IconType,
    LinedIcon : IconType,    
    data : number | boolean | PostgrestError | null,
    user : string,
    interacted : number | boolean | PostgrestError | null
}
const InteractionButton : React.FC<props> = ({
    onClick,
    color,
    fillColor,
    FilledIcon ,
    LinedIcon ,
    data,
    user,
    interacted
}) => {
  const [length , setLength] = useState<number | boolean | PostgrestError | null>(data)
  const [disable , setDisable] = useState<number | boolean | PostgrestError | null>(interacted)
  return (
    <div
    className='
    flex justify-center items-center
    '>
      <button
      onClick={() => {
        if(!disable){
        onClick()
        setLength((prev) => {
          if(typeof prev === "number") return prev + 1
          return 0
        })
        setDisable(true)
        return
        }
        onClick()
        setLength(prev => {
          if(typeof prev === "number") return prev - 1
          return 0
        })
        setDisable(false)
      }}
      className={`
      transition-colors
      rounded-full group
      p-1.5
      ${color}
      text-neutral-600
      `}>
        
        { disable ? 
          
          <FilledIcon
          className={`
          text-[1rem]
          ${fillColor}
          `}/>
        :
          <LinedIcon
          className={`
          text-[1rem]
          `}/>

        }

      </button>
      
      <span
      className='
      text-[.9rem]
      '>
          { length?.toString() || "0"}
      </span>

    </div>
  )
}

export default InteractionButton