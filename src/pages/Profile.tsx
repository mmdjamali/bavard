import React , { useState } from 'react'
import useSidebarChanger from '../hooks/useSidebarChanger'
import { useSelector } from 'react-redux';
import { rootType } from '../redux/store';
import { getFile } from '../features/storage/utils';
import { RiUserLine } from 'react-icons/ri';
import { useGetUserPosts } from '../features/posts/hooks';
import { Post } from '../features/posts';
import Repost from '../features/posts/components/Repost';
import { useGetFollowers, useGetUserProfile } from '../features/auth/hooks';
import { SkeletonProfile } from '../features/auth';

const Profile = () => {
  useSidebarChanger("Profile")
  const [max,setMax] = useState<number>(10)
  const user : any = useSelector((state : rootType) => state?.AuthSlice?.user);
  const [profile , P_pending] : any = useGetUserProfile(user || "");

  const [posts,pending,err,hasMore] = useGetUserPosts(max , user || "")
  
  const [followers , F_pending , F_err] = useGetFollowers(profile?.uid || "")

  const pp = getFile("profiles",profile?.profile_picture || "");

  if(
    F_pending ||
    P_pending
    )return(
    <div
    className='
    w-full
    xs:w-[min(calc(100%_-_79px),450px)]
    sm:w-[min(calc(100%_-_14rem),450px)]    
    min-h-screen
    border-x-[1px]
    border-color
    '
    >

      <div
      className='
      fixed p-2
      bg-white/75 z-10
      w-full
      xs:w-[min(calc(100%_-_79px),450px)]
      sm:w-[min(calc(100%_-_14rem),calc(450px_-_2px))]    
      backdrop-blur-sm
      '>
        <h2
        className='
        text-[1.25rem] font-semibold
        text-violet-dark
        '>
          Profile
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
          Profile
        </p>
      </div>

      <SkeletonProfile/>

    </div>
  )

  return (
    <div
    className='
    w-full
    xs:w-[min(calc(100%_-_79px),450px)]
    sm:w-[min(calc(100%_-_14rem),450px)]    
    min-h-screen
    border-x-[1px]
    border-color
    '
    >

      <div
      className='
      fixed p-2
      bg-white/75 z-10
      w-full
      xs:w-[min(calc(100%_-_79px),450px)]
      sm:w-[min(calc(100%_-_14rem),calc(450px_-_2px))]    
      backdrop-blur-sm
      '>
        <h2
        className='
        text-[1.25rem] font-semibold
        text-violet-dark
        '>
          Profile
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
          Profile
        </p>
      </div>

      <div
      className='
      flex
      flex-col
      border-b-[1px]
      border-color
      '>
        <div
        className='
        bg-violet-400
        w-full
        h-[100px]
        z-[9]
        '
        />
        <div
        className='
        flex 
        items-center
        '>
          
          {    
            pp ? 
            <img 
            loading='lazy'
            src={`${pp ? pp : ""}`}
            draggable="false"
            className="
            z-[9] 
            relative
            rounded-full
            w-[90px] 
            h-[90px] 
            mt-[-45px]
            border-[4px]
            border-white
            object-cover
            mx-4
            cursor-pointer
            "
            /> 
            :
            <div
            className='
            w-[90px] 
            h-[90px] 
            flex 
            z-[9]
            mt-[-45px]
            items-center 
            justify-center
            bg-violet-200 
            rounded-full
            text-violet-dark 
            text-[2rem]
            border-[4px]
            border-white
            mx-4
            cursor-pointer
            '>
                <RiUserLine/>
            </div>
          }
          
          <button
          className='
          ml-auto
          mr-4
          bg-violet-500
          text-white
          px-4
          p-1
          rounded-full
          '>
            Follow
          </button>
          
        </div>
        
        <div
        className='
        px-5
        my-2
        flex
        flex-col
        '>

          <span
          className='
          font-semibold
          text-neutral-800
          text-[1.25rem]
          '>
            {profile?.display_name}
          </span>

          <span
          className='
          text-neutral-600/90
          text-[.9rem]
          '>
            {profile?.username}
          </span>



        </div>

        { !profile?.description &&
          <div
          className='
          px-5
          pb-1
          '>

            
              <span
              className='
              text-neutral-700
              text-[.9rem]
              break-words
              '>
                {profile?.description}
              </span>

          </div>
        }

        <div
        className='
        mx-5 text-[.9rem]
        mb-2
        flex
        gap-3
        '>
          <span
          className='
          text-neutral-500
          cursor-pointer
          text-[.8rem]
          '>
            <span className='mr-1 text-neutral-700'>{profile?.followed?.length}</span>Following
          </span>

          <span
          className='
          text-neutral-500
          cursor-pointer
          text-[.8rem]
          '>
            <span className='mr-1 text-neutral-700'>{`${followers || "0"}`}</span>Followers
          </span>
        </div>

      </div>

      <div>
        {
          posts &&
          posts?.map((post : any, idx : number) => {
            if(post?.parent) return(
              <Repost
              repostID={post?.ID}
              key={idx+Math.random()}
              parent={post?.parent}
              pId={post?.ID}
              rId={post?.created_by}
              content={post?.content}
              />
            )

            return(<Post
            key={idx}
            ID={post?.ID}
            />)
          })
        }
      </div>

    </div>
  )
}

export default Profile