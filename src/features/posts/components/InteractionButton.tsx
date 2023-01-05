import React from 'react'
import { IconType } from 'react-icons/lib'

type props = {
    onClick : () => void,
    color : string,
    fillColor : string,
    FilledIcon : IconType,
    LinedIcon : IconType,    
    data : string[],
    user : string
}
const InteractionButton : React.FC<props> = ({
    onClick,
    color,
    fillColor,
    FilledIcon ,
    LinedIcon ,
    data,
    user
}) => {
  return (
    <div
    className='
    flex justify-center items-center
    '>
      <button
      onClick={onClick}
      className={`
      transition-colors
      rounded-full group
      p-1.5
      ${color}
      text-neutral-600
      `}>
        
        { data?.includes(user) ? 
          
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
          { data?.length || "0"}
      </span>

    </div>
  )
}

export default InteractionButton