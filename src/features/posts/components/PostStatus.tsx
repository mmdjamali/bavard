import React from 'react'
import { useGetPost } from '../hooks'
import { useGetUserProfile } from '../../auth/hooks'
import { getFile } from '../../storage/utils'
import { RiUserLine } from 'react-icons/ri'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { rootType } from '../../../redux/store'
import VeriticalActionBar from './VeriticalActionBar'
import HorizontalActionBar from './HorizontalActionBar'
import TimeFormater from '../../../utils/timeFormater'
import PostCard from './PostCard'
import SkeletonPostStatus from './SkeletonPostStatus'

type props = {
  postID : string
}

const PostStatus : React.FC<props> = ({
  postID
}) => {
  const auth = useSelector((state : rootType) => state.AuthSlice)
  const [post , err , pending] : any = useGetPost(postID);
  const [profile , profile_pending] : any = useGetUserProfile(post?.created_by)
  const [R_post , R_err , R_pending] : any = useGetPost(post?.replying || "");
  const [R_profile , R_profile_pending] : any= useGetUserProfile(R_post?.created_by)
  const [P_post , P_err , P_pending] : any = useGetPost(post?.parent || "");
  const [P_profile , P_profile_pending] : any= useGetUserProfile(P_post?.created_by)
  
  const profilePic = getFile("profiles" , profile?.profile_picture || "");
  
  let date = new Date(post?.created_at).toUTCString()

  const numberFormater = new Intl.NumberFormat("en",{notation : "compact"})

  if(
    !post ||
    pending ||
    profile_pending ||
    R_pending ||
    R_profile_pending ||
    P_pending ||
    P_profile_pending
  ) return(
    <SkeletonPostStatus/>
  )

  return (
    <div
    className={`
    bg-white md:hover:bg-violet-50
    flex w-full relative
    cursor-pointer
    flex-col
    z-[4]
    `}>

      { 
      
        post?.replying &&
        R_profile &&
        <>
        <span
        className='
        flex
        flex-row
        gap-1
        items-center
        text-[.9rem] pl-4 pt-1
        font-normal
        text-neutral-700
        '>
          replying to<Link to={"/profile/" + R_profile?.username} className='text-violet-500 hover:underline'>{R_profile?.uid === auth?.user ? "You" : R_profile?.username }</Link>
        </span>

        <div
        className='
        mx-4
        my-2
        border-[1px]
        border-color
        rounded-md
        overflow-hidden
        '>
          <PostCard
          ID={R_post?.ID}
          sx="border-none"
          />
        </div>
      </>
      }

      

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

              { profilePic ? <img 
                loading='lazy'
                src={`${profilePic ? profilePic : ""}`}
                draggable="false"
                className="
                z-[9] relative
                rounded-full
                w-[45px] h-[45px] object-cover
                m-4 mt-0
                "
                /> 
                :
                <div
                className='
                w-[45px] h-[45px] flex items-center justify-center
                bg-violet-200 rounded-full
                text-violet-dark text-[1.25rem] 
                m-4
                mt-0
                '>
                    <RiUserLine/>
                </div>
              }

              <div
              className='
              flex
              flex-col
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
                to={"/profile/"+profile?.username}
                className='
                font-normal
                text-neutral-500
                text-[.9rem]
                overflow-hidden text-ellipsis
                hover:underline
                '>
                  {profile?.username.toString() || "..."}
                </Link>

              </div>

              <VeriticalActionBar
              creator={profile}
              created_by={post?.created_by}
              ID={post?.ID}
              />

            </div>

            {/* Content section for post */}
            <div
            className='
            relative w-[100%] 
            px-4
            '>
              <p
              dir={
                post?.content.split("").filter((item : string) => /[ء-ي]/.test(item)).length > post?.content.split("").filter((item : string) => /[a-zA-Z]/.test(item)).length ?
                "rtl" : 
                "ltr"
              }
              className='
              break-words text-neutral-700
              text-[1.1rem]
              '>
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

            { P_post && post?.parent &&
            <div
            className='
            mx-4
            my-2
            border-[1px]
            border-color
            rounded-md
            overflow-hidden
            '>
              <PostCard
              ID={P_post?.ID}
              sx="border-none"
              />
            </div>}

            <div
            className='
            relative w-[100%] 
            px-4
            py-2
            '>
              <p
              className='
              break-words text-neutral-400
              text-[.85rem]
              '>
              {date}
              </p>
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
            py-2
            text-[.9rem]
            gap-2
            text-neutral-700
            '>

              <p>
                {numberFormater.format(post?.replies)} <span className='text-neutral-500'>Replies</span>
              </p>

              <p>
                {numberFormater.format(post?.reposts)} <span className='text-neutral-500'>Reposts</span>
              </p>

              <p>
                {numberFormater.format(post?.likes)} <span className='text-neutral-500'>Likes</span>
              </p>

            </div>

            <span
            className='
            flex
            bg-neutral-200/80
            h-[1px]
            mx-4
            '
            />

            <HorizontalActionBar
            post={post}
            user={auth?.user || ""}
            showNumber={false}
            iconSize='text-[1.5rem]'
            />

          </div>

      </div>
    </div>
  )
}

export default PostStatus