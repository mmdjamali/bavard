import React , { useState } from 'react'
import { RiUserLine } from 'react-icons/ri'
import { HiOutlineDotsHorizontal } from 'react-icons/hi'
import { useGetUserProfile } from '../../auth/hooks'
import { useGetPicture } from '../../storage/hooks' 
import TimeFormater from '../../../utils/timeFormater';


type props = {
  post : any
}
const Post :React.FC<props> = ({
  post
}) => {

  const [profile] = useGetUserProfile(post?.created_by);
  const [pp] = useGetPicture("profiles" , profile?.profile_picture || "")

  let time = TimeFormater(post.created_at.toString())

  console.log(time)

  return (
    <div
    className='
    flex w-full relative
    border-b-[1px]
    border-b-neutral-100
    cursor-pointer
    '>

        {/* Left section of post*/}

        <div
      className='relative'>

          { pp ? <img 
              src={`${pp ? pp : ""}`}
              draggable="false"
              className="
              rounded-full
              w-[45px] h-[45px] object-cover
              m-3
              "
              /> 
              :
              <div
              className='
              w-[40px] h-[40px] flex items-center justify-center
              bg-violet-200 rounded-full
              text-violet-dark text-[1.25rem] m-2
              '>
                  <RiUserLine/>
              </div>
          }

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
          flex w-[100%] pr-4
          '>

            <p
            className='
            font-medium
            text-neutral-700
            text-[.9rem]
            overflow-hidden text-ellipsis
            '>
              {profile?.display_name.toString() || "..."}
            </p>

            <p
            className='
            mx-1 font-normal
            text-neutral-500
            text-[.9rem]
            overflow-hidden text-ellipsis
            '>
              {profile?.username.toString() || "..."}
            </p>

            <button
            className='
            rounded-full ml-auto
            hover:bg-violet-100 p-1
            '>
              <HiOutlineDotsHorizontal/>
            </button>

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
            {post.content || ""}
            </p>
          </div>

        </div>

    </div>
  )
}

export default Post