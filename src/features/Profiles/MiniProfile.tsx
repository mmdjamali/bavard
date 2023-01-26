import React from 'react'
import { getFile } from '../storage/utils'
import { RiUser2Line } from 'react-icons/ri'

type props = {
    show : boolean,
    profile : any,
}

const MiniProfile : React.FC<props> = ({
    show,
    profile
}) => {

  const profile_picture = getFile("profiles",profile?.profile_picture || "")
  const banner_picture = getFile("profiles",profile?.banner_picture || "")

  if(!show) return <></>

  return (
    <div
    className='
    w-[300px]
    p-3
    rounded-lg
    bg-white
    shadow-[0_0_10px_rgba(16,16,16,.16)]
    absolute
    z-20
    bottom-[50%]
    translate-y-[50%]
    right-[105%]
    '>

        <div>
            {
                profile_picture ? 
                <img
                className='
                w-[60px]
                aspect-square
                object-cover
                rounded-full
                '
                src={profile_picture}
                />
                :
                <div
                className='
                min-w-[60px]
                aspect-square
                bg-violet-50
                '>
                    <RiUser2Line/>
                </div>
            }

        </div>

        <div
        className='
        flex
        flex-col
        '>
            <span
            className="
            text-[1rem]
            font-medium
            text-neutral-800
            mt-1
            ">
                {profile?.display_name}
            </span>

            <span
            className="
            text-[.9rem]
            text-neutral-600/90
            ">
                {profile?.username}
            </span>
        </div>

    </div>
  )
}

export default MiniProfile