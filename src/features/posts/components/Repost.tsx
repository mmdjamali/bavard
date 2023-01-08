import React , { useState } from 'react'
import { useGetPost } from '../hooks'
import { useGetUserProfile } from '../../auth/hooks'
import { useGetPicture } from '../../storage/hooks'
import { RiUserLine } from 'react-icons/ri'
import TimeFormater from '../../../utils/timeFormater'
import { HiOutlineDotsHorizontal } from 'react-icons/hi'
import { followUser } from '../../auth/utils'
import { useSelector } from 'react-redux'
import { rootType } from '../../../redux/store'
import HorizontalActionBar from './HorizontalActionBar'
import { Link } from 'react-router-dom'
import Loader from '../../../components/Loader'
import { deletePost } from '../functions'

type props = {
  pId : string,
  rId : string,
  created_at : string,
  repostID : string
}
const Repost : React.FC<props> = ({
  pId,
  rId,
  created_at,
  repostID
}) => {
  const auth : any = useSelector((state : rootType) => state.AuthSlice);
  const [show , setShow] = useState<boolean>(false)

  const [post,err,pending] : any = useGetPost(pId);
  const [reposter] = useGetUserProfile(rId);
  const [profile] = useGetUserProfile(post?.created_by || "");
  const [pp] = useGetPicture("profiles" , profile?.profile_picture || "")

  let time = TimeFormater(created_at)

  if(pending)return(
    <Loader sx="h-fit my-3"/>
  )

  return (
      <div
      className='
      bg-white hover:bg-violet-50
      transition-colors
      flex flex-col
      border-b-[1px]
      cursor-pointer
      '>
        <span
        className='
        ml-3 py-1 flex
        text-[.9rem]
        font-medium
        text-neutral-600
        gap-1
        '>

          <p>{"reposted by"}</p>
          <Link
          className='
          hover:text-neutral-700
          hover:underline
          '
          to={""}>
            {reposter?.username}
          </Link>

        </span>
        <div
        className='
        flex w-full relative
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
                  m-3 mt-0
                  "
                  /> 
                  :
                  <div
                  className='
                  w-[45px] h-[45px] flex items-center justify-center
                  bg-violet-200 rounded-full
                  text-violet-dark text-[1.25rem] m-3 mt-0
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
              mb-3 pl-1
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
                p-1 px-3 rounded-md
                z-10
                flex flex-col gap-1
                `}>

                  { rId === auth.user ?
                  <button
                  onClick={() => {
                    deletePost(repostID)
                  }}
                  className='
                  text-[.9rem] text-red-500
                  hover:font-medium
                  '>
                    Delete
                  </button>
                  :
                  ""
                  }

                  <button
                  onClick={() => {
                    followUser(post?.created_by)
                  }}
                  className='
                  text-[.9rem]
                  '>
                    {`${auth?.profile?.followed?.includes(post?.created_by) ? "unfollow " : "follow "}`}
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
                { post?.content.replaceAll("\n"," mm✧mm ").split(" ").map((item : string , idx : number) => {
                if(item === "mm✧mm") return <br/>
                
                if(item[0] === "#")
                return(<span
                key={idx}
                className='text-violet-600'
                >
                {item + " "}
                </span>)

              return item + " "

            }) || "" }
                </p>
              </div>
    
              <HorizontalActionBar
              post={post}
              user={auth.user}/>
    
            </div>
    
        </div>
      </div>
  )
}

export default Repost