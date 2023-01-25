import React from 'react'
import useSidebarChanger from '../hooks/useSidebarChanger'
import { RiMessage2Line } from 'react-icons/ri'

const Messages = () => {
  useSidebarChanger("Messages")
  return (
    <div
    className='
    w-full
    xs:w-[min(calc(100%_-_79px),450px)]
    sm:w-[min(calc(100%_-_14rem),450px)]   
    min-h-[calc(100vh_-_56px)]
    xs:min-h-screen 
    border-x-[1px]
    border-color
    '
    >
      <div
      className='
      fixed p-2
      bg-white/75 z-10
      backdrop-blur-sm
      '>
        <h2
        className='
        text-[1.25rem] font-semibold
        text-violet-dark
        '>
          Messages
        </h2>
      </div>

      {/*placeholder for title*/}
      <div
      className='
      p-2 sticky top-0
      bg-white z-[8]
      '>
        <p
        className='
        text-[1.25rem] font-semibold
        text-transparent
        '>
          Messages
        </p>
      </div>

      <div
      className='
      flex
      flex-col
      items-center
      justify-center
      min-h-[calc(100vh_-_102px)]
      xs:min-h-[calc(100vh_-_46px)]
      '>

        <RiMessage2Line
        className='
        text-neutral-500
        text-[3rem]
        '/>

        <p
        className='
        max-w-[75%]
        text-center
        mt-[.5rem]
        font-medium
        text-neutral-500
        '>
          This feature will be added soon
        </p>

      </div>

    </div>
  )
}

export default Messages