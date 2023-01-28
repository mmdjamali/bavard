import React , { useState , useEffect } from 'react'
import { RiArrowLeftLine } from 'react-icons/ri'
import useSidebarChanger from '../hooks/useSidebarChanger'
import { useNavigate, useParams } from 'react-router-dom'
import { useGetPost } from '../features/posts/hooks'
import PostStatus from '../features/posts/components/PostStatus'
import SkeletonPostStatus from '../features/posts/components/SkeletonPostStatus'
import Replies from '../features/posts/components/Replies'

const Post = () => {
  const { postID } = useParams();
  const [ID , setID] = useState<string>()
  useSidebarChanger("Post")
  const navigate = useNavigate()
  const [post , err , pending] : any = useGetPost(ID || "")

  useEffect(() => {
    setID(postID)
  },[postID])

  return (
    <div
    className='
    w-full
    xs:w-[min(calc(100%_-_79px),450px)]
    sm:w-[min(calc(100%_-_14rem),450px)]
    relative border-x-[1px] border-color
    min-h-screen flex flex-col
    '>

      <div
      style={{
        backfaceVisibility: "hidden"
      }}
      className='
      sticky py-2 px-4
      bg-white/75 z-[10]
      backdrop-blur-sm
      top-0
      flex
      w-full
      border-b-[1px]
      border-color
      items-center
      gap-2
      '>

        <button
        onClick={() => {
          navigate(-1)
        }}
        className='
        p-1
        text-[1.5rem]
        rounded-full
        xs:hover:bg-violet-50
        '>
          <RiArrowLeftLine/>
        </button>

        <div
        className='
        '>
          <h2
          className='
          text-[1.25rem] font-medium
          text-violet-dark/90
          '>
            Post
          </h2>
        </div>
      </div>
        {
          pending && !post ?

          <SkeletonPostStatus/>
          :
          <PostStatus
          postID={post?.ID}
          />
        }

        {
          <Replies
          ID={post?.ID}
          />
        }

    </div>
  )
}

export default Post