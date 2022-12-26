import React from 'react'

type props = {
    sx? : string,
    text : string
}

const TypographyLG : React.FC<props> = ({sx , text}) => {
  return (
    <p
    className={`
    text-center text-[2rem] font-semibold
  text-neutral-800
    ${sx ? sx : ""}
    `}
    >
        {text ? text : "..."}
    </p>
  )
}

export default TypographyLG