import React from 'react'
import { CgSpinner } from "react-icons/cg"

const Loader = () => {
  return (
    <div
    className='
    w-full h-screen
    flex items-center justify-center
    '>

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