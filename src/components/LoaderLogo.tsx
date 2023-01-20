import React from 'react'
import Icon from "/app-icon.svg"

type props = {
    sx? : string
}

const LoaderLogo : React.FC<props> = ({
    sx
}) => {
  return (
    <div
    className={`
    w-full h-screen relative
    flex items-center justify-center
    flex-col
    ${sx ? sx : ""}
    `}>

        <img 
        src={Icon}
        width="60"
        className='
        animate-slide-down
        '/>

    </div>
  )
}

export default LoaderLogo