import React , { useState } from 'react'
import { RiUserLine } from 'react-icons/ri'
import { HiOutlineDotsHorizontal } from 'react-icons/hi'
import { useGetUserProfile } from '../../auth/hooks'
import { useGetPicture } from '../../storage/hooks' 
import TimeFormater from '../../../utils/timeFormater';
import { useSelector } from 'react-redux'
import { rootType } from '../../../redux/store'
import { followUser } from '../../auth/utils'
import HorizontalActionBar from './HorizontalActionBar'

type props = {
  post : any
}
const Post :React.FC<props> = ({
  post
}) => {
  const auth : any = useSelector((state : rootType) => state.AuthSlice);
  const [show , setShow] = useState<boolean>(false)
  const [profile] = useGetUserProfile(post?.created_by);
  const [pp] = useGetPicture("profiles" , profile?.profile_picture || "")

  let time = TimeFormater(post.created_at)

  return (
    <div
    className='
    bg-white hover:bg-violet-50
    flex w-full relative
    border-b-[1px]
    cursor-pointer
    transition-colors
    '>

        {/* Left section of post*/}

        <div
      className='relative'>

          { pp ? <img 
              src={`${pp ? pp : ""}`}
              draggable="false"
              className="
              z-[9] relative
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

            <p
            className='
            mx-1 font-normal
            text-neutral-500
            text-[.8rem]
            overflow-hidden text-ellipsis
            '>
              {time || "..."}
            </p>

            <button
            onClick={() => {
              setShow(prev => !prev)
            }}
            className='
            rounded-full ml-auto
            hover:bg-violet-100 p-1
            '>
              <HiOutlineDotsHorizontal/>
            </button>

            <div
            className={`
            ${!show && "scale-0"}
            absolute
            bg-white
            right-10
            shadow-[0_0_6px_rgba(40,40,40,.16)]
            p-1 rounded-md
            z-10
            `}>
              <button
              onClick={() => {
                followUser(post?.created_by)
              }}
              className='
              text-[.9rem]
              '>
                {`${auth?.profile?.followed?.includes(post.created_by) ? "unfollow " : "follow "}`}
                {`${profile?.display_name}`}
              </button>
            </div>

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
            { post.content || "" }
            </p>
          </div>

          <HorizontalActionBar
          post={post}
          user={auth.user}/>

        </div>

    </div>
  )
}

export default Post