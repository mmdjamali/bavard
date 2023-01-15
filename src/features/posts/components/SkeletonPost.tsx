import React from 'react'

type props = {
  sx : string
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
          '>

            <p
            className='
            font-medium
            text-neutral-700
            text-[.9rem]
            overflow-hidden text-ellipsis
            '>
            </p>

            <p
            className='
            mx-1 font-normal
            text-neutral-500
            text-[.9rem]
            overflow-hidden text-ellipsis
            '>
            </p>

            <p
            className='
            mx-1 font-normal
            text-neutral-500
            text-[.8rem]
            overflow-hidden text-ellipsis
            '>
            </p>

            {/* VeriticalActionBar */}
            

          </div>

          {/* Content section for post */}
          <div
          className='
          relative w-[100%] pr-4
          '>
            <p
            className='
            break-words text-neutral-700
            text-[.9rem]
            '>
            
            </p>
          </div>

            {/* HorizontalActionBar */}

        </div>

    </div>
  )
}

export default SkeletonPost