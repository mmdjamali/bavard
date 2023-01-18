import React from 'react'

type props = {
    sx? : string
}

const LoaderLogo : React.FC<props> = ({
    sx
}) => {
  return (
    <div
    className={`
    w-full h-screen
    flex items-center justify-center
    ${sx ? sx : ""}
    `}>

        <img 
        src="/app-icon.svg" 
        width="60"
        className='
        animate-slide-down
        '/>

    </div>
  )
}

export default LoaderLogo