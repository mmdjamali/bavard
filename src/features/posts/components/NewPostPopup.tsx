import React , {ReactNode, useEffect, useState} from 'react'
import { RiCloseFill } from "react-icons/ri";
import { useDispatch, useSelector } from 'react-redux'
import { rootType } from '../../../redux/store'
import NewPost from './NewPost';
import PostCard from './PostCard';
import { useLocation, useNavigate } from 'react-router-dom';
import { useGetPost } from '../hooks';

const NewPostPopup = () => {
  const queries = new URLSearchParams(useLocation().search)
  const action = queries.get("action") || null
  const postID = queries.get("post") || null

  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  return (
    <div
    className={`
    top-0
    fixed
    w-full
    h-full
    bg-black/50
    z-50
    flex
    items-center
    justify-center
    p-4
    `}>

        <div
        className='
        w-[min(400px,100%)]
        bg-white
        rounded-md
        relative
        flex
        flex-col
        justify-center
        p-2
        '>

          <div
          className='
          flex
          items-center
          w-full
          '>

            <button
            onClick={() => {
              navigate(location.pathname.replace("/newpost",""))
            }}
            type='button'
            className='
            text-[1.25rem]
            p-1
            text-violet-dark
            hover:bg-neutral-200
            rounded-full
            '>
              <RiCloseFill/>
            </button>

            <span
            className='
            text-neutral-800
            font-medium
            ml-1
            '>
              {(() => {
                if(!action) return "New post"
                switch(action){
                  case("parent") :
                    return "Reposting :"

                  case("replying") : 
                    return "Replying to :"
                }
              })()
            }
            </span>

          </div>

          { postID && 
          <div
          className='
          mt-3
          relative
          overflow-hidden
          border-[1px]
          rounded-md
          mx-2
          '>
            <PostCard
            sx="border-none"
            ID={postID}
            noInteraction={true}
            />
          </div> 
          }

          

            <NewPost
            sx="border-none mt-3"
            placeholder={(() =>{ 
              if(!action) return "What's up?"

              switch(action){
                case("parent"):
                  return "Write your thoughts"

                case("replying"):
                  return "Write your reply"

                default:
                  return "What's up?"
              }
            })()}
            property={action}
            value={postID}
            cleanup={() => {
              navigate(location.pathname.replace("/newpost",""))
            }}/>

        </div>

    </div>
  )
}

export default NewPostPopup