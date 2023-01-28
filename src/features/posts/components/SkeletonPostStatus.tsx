import React from 'react'
import { RiUserLine } from 'react-icons/ri'

function SkeletonPostStatus() {
  return (
    <div
    className={`
    bg-white md:hover:bg-violet-50
    flex w-full relative
    cursor-pointer
    flex-col
    z-[4]
    `}>

      <div
      className={`
      flex w-full relative
      border-b-[1px] border-color
      transition-colors
      `}>
          
          {/* Right section of post*/}

          <div
          className='
          relative
          w-full
          my-3
          '>

            {/* Top section for post */}
            <div
            className='
            relative
            flex w-[100%] pr-4
            '>

                <div
                className='
                w-[45px] h-[45px] flex items-center justify-center
                bg-violet-200 rounded-full
                text-violet-dark text-[1.25rem] 
                m-4
                mt-0
                animate-pulse
                '>
                </div>

              <div
              className='
              flex
              flex-col
              '>

                <span
                className='
                bg-neutral-200
                rounded-full
                h-[12px]
                w-[70px]
                animate-pulse
                '>
                </span>

                <span
                className='
                mt-2
                bg-neutral-200
                rounded-full
                h-[12px]
                w-[70px]
                animate-pulse
                '/>

              </div>

            </div>

            {/* Content section for post */}
            <div
            className='
            relative w-[100%] 
            px-4
            flex
            flex-col
            gap-2
            '>
              <span
              className='
              bg-neutral-200
              h-[14px]
              w-full
              rounded-full
              animate-pulse
              '>
              </span>
              <span
              className='
              bg-neutral-200
              h-[14px]
              w-[90%]
              rounded-full
              animate-pulse
              '>
              </span>
              <span
              className='
              bg-neutral-200
              h-[14px]
              w-[20%]
              rounded-full
              animate-pulse
              '>
              </span>
            </div>

            <div
            className='
            relative w-[100%] 
            px-4
            py-2
            '>
              <span
              className='
              flex
              bg-neutral-200/80
              h-[10px]
              w-[100px]
              mt-2
              rounded-full
              animate-pulse
              '>
              </span>
            </div>

            <span
            className='
            flex
            bg-neutral-200/80
            h-[1px]
            mx-4
            '
            />

            <div
            className='
            flex
            items-center
            px-4
            py-3
            gap-2
            text-neutral-700
            '>

              <span
              className='
              flex
              bg-neutral-200/80
              h-[11px]
              w-[60px]
              rounded-full
              animate-pulse
              '/>
              <span
              className='
              flex
              bg-neutral-200/80
              h-[11px]
              w-[60px]
              rounded-full
              animate-pulse
              '/>
              <span
              className='
              flex
              bg-neutral-200/80
              h-[11px]
              w-[60px]
              rounded-full
              animate-pulse
              '/>

            </div>

            <span
            className='
            flex
            bg-neutral-200/80
            h-[1px]
            mx-4
            '
            />

            <div
            className='
            flex
            items-center
            mx-4
            mt-3
            justify-evenly
            '>

              <span
              className='
              flex
              bg-neutral-200/80
              h-[32px]
              w-[32px]
              rounded-full
              animate-pulses
              '/>
              <span
              className='
              flex
              bg-neutral-200/80
              h-[32px]
              w-[32px]
              rounded-full
              animate-pulses
              '/>
              <span
              className='
              flex
              bg-neutral-200/80
              h-[32px]
              w-[32px]
              rounded-full
              animate-pulses
              '/>

            </div>

          </div>

      </div>
    </div>
  )
}

export default SkeletonPostStatus