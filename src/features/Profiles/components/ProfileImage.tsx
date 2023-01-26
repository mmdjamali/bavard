import React from 'react'
import { RiUserLine } from 'react-icons/ri'

type props = {
    pp : string
}

const ProfileImage : React.FC<props> = ({
    pp
}) => {
  return (
    <>
    {pp ? 
        <img 
        loading='lazy'
        src={`${pp ? pp : ""}`}
        draggable="false"
        className="
        z-[9] 
        relative
        rounded-full
        w-[90px] 
        h-[90px] 
        mt-[-45px]
        xs:w-[100px] 
        xs:h-[100px] 
        xs:mt-[-50px]
        border-[4px]
        border-white
        object-cover
        mx-4
        cursor-pointer
        "
        /> 
        :
        <div
        className='
        w-[90px] 
        h-[90px] 
        mt-[-45px]
        xs:w-[100px] 
        xs:h-[100px] 
        xs:mt-[-50px]
        flex 
        z-[9]
        items-center 
        justify-center
        bg-violet-200 
        rounded-full
        text-violet-dark 
        text-[2rem]
        border-[4px]
        border-white
        mx-4
        cursor-pointer
        '>
            <RiUserLine/>
        </div>
    }
    </>
  )
}

export default ProfileImage