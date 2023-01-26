import React from 'react'
import { RiUserLine } from 'react-icons/ri'

const SkeletonProfile = () => {
  return (
    <div
      className='
      flex
      flex-col
      border-b-[1px]
      border-color
      '>
        <div
        className='
        bg-neutral-300
        w-full
        aspect-[4/1]
        z-[9]
        animate-pulse
        '
        />
        <div
        className='
        flex 
        items-center
        '>
          
            <div
            className='
            w-[100px] 
            h-[100px] 
            flex 
            mt-[-50px]
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
          
        </div>
        
        <div
        className='
        px-5
        my-2
        mb-3
        flex
        flex-col
        gap-2
        '>

          <span
          className='
          bg-neutral-300
          h-[14px]
          w-[70px]
          rounded-full
          animate-pulse
          '/>

        </div>

          <div
          className='
          px-5
          pb-1
          flex
          flex-col
          gap-2
          '>

            <span
            className='
            bg-neutral-200
            w-full
            h-[10px]
            flex
            rounded-full
            animate-pulse
            '/>

            <span
            className='
            flex
            bg-neutral-200
            text-[.9rem]
            w-[40%]
            h-[10px]
            rounded-full
            animate-pulse
            '/>

        </div>

        <div
        className='
        mx-5 text-[.9rem]
        my-2
        flex
        gap-2
        '>
          <span
          className='
          bg-neutral-200
          h-[10px]
          w-[50px]
          cursor-pointer
          rounded-full
          animate-pulse
          '/>

          <span
          className='
          bg-neutral-200
          h-[10px]
          w-[50px]
          cursor-pointer
          rounded-full
          animate-pulse
          '/>
        </div>

      </div>
  )
}

export default SkeletonProfile