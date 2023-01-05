import React from 'react'
import { CgSpinner } from "react-icons/cg"
type props = {
  sx? : string
}
const Loader : React.FC<props> = ({sx}) => {
  return (
    <div
    className={`
    w-full h-screen
    flex items-center justify-center
    ${sx ? sx : ""}
    `}>

        <CgSpinner
        className='
        animate-spin text-violet-500
        text-[1.5rem]
        '
        />

    </div>
  )
}

export default Loader