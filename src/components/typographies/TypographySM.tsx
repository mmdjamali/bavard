import React from 'react'

type props = {
    sx? : string,
    text : string
}

const TypographySM : React.FC<props> = ({sx , text}) => {
  return (
    <p
    className={`
    text-center 
    text-[.9rem] 
    xs:text-[1rem]
    text-neutral-600
    mb-[3rem]
    ${sx ? sx : ""}
    `}
    >
        {text ? text : "..."}
    </p>
  )
}

export default TypographySM