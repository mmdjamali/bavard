import React , { useEffect, useState } from 'react'
import { RiChat1Line, RiUserLine } from 'react-icons/ri'
import { HiOutlineDotsHorizontal } from 'react-icons/hi'
import { useGetUserProfile } from '../../auth/hooks'
import TimeFormater from '../../../utils/timeFormater';
import { useSelector } from 'react-redux'
import { rootType } from '../../../redux/store'
import { followUser } from '../../auth/utils'
import HorizontalActionBar from './HorizontalActionBar'
import { deletePost } from '../functions'
import { Link, useNavigate } from 'react-router-dom'
import { useGetPost } from '../hooks'
import VeriticalActionBar from './VeriticalActionBar'
import Loader from '../../../components/Loader'
import SkeletonPostCard from './SkeletonPostCard'
import { getFile } from '../../storage/utils'

type props = {
  ID : any,
  sx? : string,
  noInteraction? : boolean
}
const PostCard : React.FC<props> = ({
      ID , 
      sx ,
      noInteraction
}) => {
  const navigate = useNavigate()
  const auth : any = useSelector((state : rootType) => state.AuthSlice);
  const [post , error , pending] : any = useGetPost(ID)
  const [repliedPost , repliedError , repliedPending] : any = useGetPost(post?.replying || "")
  const [profile] : any = useGetUserProfile(post?.created_by || "");
  const [repliedProfile] : any = useGetUserProfile(repliedPost?.created_by || "");
  // const [pp] = useGetPicture("profiles" , profile?.profile_picture || "")
  const pp = getFile("profiles" , profile?.profile_picture || "")
  let time = TimeFormater(post?.created_at || "")
    
  if(
    pending || 
    repliedPending|| 
    !post || 
    !profile ||
    (repliedPost && !repliedProfile)
    ) return(
    <SkeletonPostCard/>
  )

  return (
    <div
    onClick={(e) => {
      e.stopPropagation()
      navigate("/post/" + post?.ID)
    }}
    className={`
    bg-white md:hover:bg-violet-50
    flex w-full relative
    cursor-pointer
    flex-col
    z-[4]
    `}>

      { 
        repliedPost &&
        <span
        className='
        flex
        flex-row
        gap-1
        items-center
        text-[.9rem] pl-3 pt-1
        font-normal
        text-neutral-700
        '>
          replying to<Link 
          onClick={(e) => e.stopPropagation()}
          to={"/profile/" + repliedProfile?.username} className='text-violet-500 hover:underline'>{repliedProfile?.uid === auth?.user ? "You" : repliedProfile?.username }</Link>
        </span>
      }

      <div
      className={`
      flex w-full relative
      border-b-[1px] border-color
      transition-colors
      ${sx ? sx : ""}
      `}>

          {/* Left section of post*/}

          <div
        className='relative'>

            { pp ? <img 
                loading='lazy'
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
                w-[45px] h-[45px] flex items-center justify-center
                bg-violet-200 rounded-full
                text-violet-dark text-[1.25rem] m-3
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
              whitespace-nowrap
              overflow-hidden 
              text-ellipsis
              '>
                {profile?.display_name.toString() || "..."}
              </p>

              <Link
              onClick={(e) => e.stopPropagation()}
              to={"/profile/"+profile?.username}
              className='
              mx-1 font-normal
              text-neutral-500
              text-[.9rem]
              overflow-hidden text-ellipsis
              hover:underline
              '>
                {profile?.username.toString() || "..."}
              </Link>

              <p
              className='
              mx-1 font-normal
              text-neutral-500
              text-[.8rem]
              overflow-hidden text-ellipsis
              '>
                {time || "..."}
              </p>

              { !noInteraction && 
              <VeriticalActionBar
              creator={profile}
              created_by={post?.created_by}
              ID={post?.ID}
              />}

            </div>

            {/* Content section for post */}
            <div
            className='
            relative w-[100%] pr-4
            '>
              <p
              dir={
                post?.content.split("").filter((item : string) => /[ء-ي]/.test(item)).length > post?.content.split("").filter((item : string) => /[a-zA-Z]/.test(item)).length ?
                "rtl" : 
                "ltr"
              }
              className={`
              break-words text-neutral-700
              text-[.9rem]
              justify-center
              
              }
              `}>
              { post?.content.replaceAll("\n"," \n ").split(" ").map((item : string , idx : number) => {
                  if(item === "\n") return <br key={idx}/>

                  if(/^#[a-zA-Z0-9_ء-ي]{1,}$/.test(item)) 
                  return(
                  <Link
                  onClick={(e) => e.stopPropagation()}
                  to={"/explore/"+item.replaceAll(/[^a-zA-Z0-9_ء-ي]/g, '') }
                  key={idx}
                  className='
                  text-violet-600
                  hover:underline
                  '
                  >
                  {item + " "}
                  </Link>)

                  if(/^@[a-zA-Z0-9_ء-ي]{1,}$/.test(item)) 
                  return(
                  <Link
                  onClick={(e) => e.stopPropagation()}
                  to={"/profile/"+ item }
                  key={idx}
                  className='
                  text-violet-600
                  hover:underline
                  '
                  >
                  {item + " "}
                  </Link>)

                  return (
                    <span
                    key={idx}>
                      {item + " "}
                    </span>
                  )

              }) || "" 
              }
              </p>
            </div>

            <HorizontalActionBar
            sx={noInteraction ? "pointer-events-none" : ""}
            post={post}
            user={auth.user}/>

          </div>

      </div>
    </div>
  )
}

export default PostCard