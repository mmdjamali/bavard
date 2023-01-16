import React from 'react'

type props = {
  sx ?: string
}

const SkeletonPost : React.FC<props> = ({
  sx
}) => {
  return (
    <div
    className={`
    bg-white md:hover:bg-violet-50
    flex w-full relative
    border-b-[1px] border-color
    cursor-pointer
    transition-colors
    ${sx ? sx : ""}
    `}>

        {/* Left section of post*/}

      <div
      className='relative'>

              <div
              className='
              w-[45px] h-[45px] flex items-center justify-center
              bg-violet-200 rounded-full
              text-violet-dark text-[1.25rem] m-3
              animate-pulse
              '>
              </div>
          

        </div>
        
        {/* Left section of post*/}

        <div
        className='
         relative
         w-[calc(100%_-_75px)]
         my-3 pl-1
        '>

          {/* Top section for post */}
          <div
          className='
          relative
          flex w-[100%] pr-4
          gap-2
          '>

            <span
            className='
            bg-neutral-400
            inline-block
            w-[2.5rem]
            h-2
            animate-pulse
            rounded-md
            overflow-hidden text-ellipsis
            '/>

            <span
            className='
            bg-neutral-400
            inline-block
            w-[4rem]
            h-2
            animate-pulse
            rounded-md
            overflow-hidden text-ellipsis
            '/>

            <span
            className='
            bg-neutral-400
            inline-block
            w-[1.5rem]
            h-2
            animate-pulse
            rounded-md
            overflow-hidden text-ellipsis
            '/>

            {/* VeriticalActionBar */}
            

          </div>

          {/* Content section for post */}
          <div
          className='
          relative w-[100%] pr-4
          flex flex-col
          gap-1.5
          '>

            <span
            className='
            bg-neutral-300
            inline-block
            w-[80%]
            mt-3
            h-2
            animate-pulse
            rounded-md
            overflow-hidden text-ellipsis
            '/>

            <span
            className='
            bg-neutral-300
            inline-block
            w-[90%]
            h-2
            animate-pulse
            rounded-md
            overflow-hidden text-ellipsis
            '/>

            <span
            className='
            bg-neutral-300
            inline-block
            w-[40%]
            h-2
            animate-pulse
            rounded-md
            overflow-hidden text-ellipsis
            '/>
            
            
          </div>

            <div
            className='
            flex
            items-center
            justify-evenly
            mt-3
            '>

              <span
              className='
              w-5 h-5
              rounded-full
              bg-neutral-300
              animate-pulse
              '
              />

              <span
              className='
              w-5 h-5
              rounded-full
              bg-neutral-300
              animate-pulse
              '/>

              <span
              className='
              w-5 h-5
              rounded-full
              bg-neutral-300
              animate-pulse
              '/>

            </div>

        </div>

    </div>
  )
}

export default SkeletonPost