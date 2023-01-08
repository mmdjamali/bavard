import React, { useState } from 'react'
import { IconType } from 'react-icons/lib'

type props = {
    onClick : () => void,
    color : string,
    fillColor : string,
    FilledIcon : IconType,
    LinedIcon : IconType,    
    data : number | null,
    user : string,
    interacted : boolean
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
  const [length , setLength] = useState<number | null>(data)
  const [disable , setDisable] = useState<boolean>(interacted)
  return (
    <div
    className='
    flex justify-center items-center
    '>
      <button
      onClick={() => {
        if(!disable){
        onClick()
        setLength(prev => prev + 1)
        setDisable(true)
        console.log(length)
        return
        }
        onClick()
        setLength(prev => prev - 1)
        setDisable(false)
        console.log(length)
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
          { length || "0"}
      </span>

    </div>
  )
}

export default InteractionButton