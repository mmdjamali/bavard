import React , {ReactNode, useEffect, useState} from 'react'
import { RiCloseFill } from "react-icons/ri";
import { useDispatch, useSelector } from 'react-redux'
import { rootType } from '../../../redux/store'
import NewPost from './NewPost';
import { setActive, setProperty, setValue } from '../../../redux/NewPostPopupSlice';
import PostCard from './PostCard';

const NewPostPopup = () => {
  const {active , property , value} : {
  active : boolean;
  property : null | string;
  value : null | string;
  } = useSelector((state : rootType) => state.NewPostPopupSlice)
  
  const dispatch = useDispatch()
  
  if(!active) return <></>

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
              dispatch(setActive(false))
              dispatch(setProperty(null))
              dispatch(setValue(null))
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
                if(!property) return "New post"
                switch(property){
                  case("parent") :
                    return "Reposting :"

                  case("replying") : 
                    return "Replying to :"
                }
              })()
            }
            </span>

          </div>

          { value && 
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
            ID={value}
            noInteraction={true}
            />
          </div> 
          }

          

            <NewPost
            sx="border-none mt-3"
            placeholder={(() =>{ 
              if(!property) return "What's up?"

              switch(property){
                case("parent"):
                  return "Write your thoughts"

                case("replying"):
                  return "Write your reply"

                default:
                  return "What's up?"
              }
            })()}
            property={property}
            value={value}
            cleanup={() => {
              dispatch(setActive(false))
              dispatch(setProperty(null))
              dispatch(setValue(null))
            }}/>

        </div>

    </div>
  )
}

export default NewPostPopup