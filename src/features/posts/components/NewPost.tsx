import React, { useState , useRef } from 'react'
import { useGetPicture } from '../../storage/hooks'
import { createPost } from '../functions'
import { useSelector } from 'react-redux'
import { rootType } from '../../../redux/store'
import { RiUserLine } from 'react-icons/ri'
import { CgSpinner } from "react-icons/cg"

const NewPost :React.FC = () => {
  const {user , profile} : any = useSelector((state : rootType) => state.AuthSlice)
  const [content , setContent] = useState<string>("")
  const [loading , setLoading] = useState<boolean>(false)
  
  const input = useRef<any>();
  
  const [pp] = useGetPicture("profiles" , profile?.profile_picture || "")

  return (
    <div
    className='
    flex w-full
    border-b-[1px]
    '
    >

        {!!pp ? <img 
            src={`${pp ? pp : ""}`}
            className="
            rounded-full
            w-[45px] h-[45px] object-cover
            my-2 mr-4 ml-3
            "
            /> 
            :
            <div
            className='
            w-[45px] h-[45px] flex items-center justify-center
            bg-violet-200 rounded-full
            text-violet-dark text-[1.25rem] m-2
            '>
                <RiUserLine/>
            </div>
        }

        <div
        className='
        flex flex-col
        w-[calc(100%_-_75px)]
        '>

          <textarea
          rows={1}
          placeholder="What's up?"
          className='
          resize-none outline-none
          m-2
          '
          ref={input}
          value={content}
          onChange={(e) => {
            let target = e.target
            setContent(target.value)
            target.style.height = "0px"
            target.style.height = target.scrollHeight + "px"
            
          }}
          >
          </textarea>

          <div
          className='
          inline w-[97.5%] h-[1px]
          bg-neutral-200
          self-center
          '/>
          
          <div
          className='
          flex w-full my-2 
          justify-end
          '>

            <div
            style={{"backgroundImage" 
            : 
            `conic-gradient(
              ${content.length <= 360 ? "#8B5CF6" : "rgb(239 68 68)"} 
              ${content.length + "deg"} ,#eee ${content.length + "deg"} )`}}
            className={`
            w-[30px] h-[30px]
            relative flex items-center justify-center
            rounded-full after:content-[""""]
            after:inline-block after:w-[80%] after:h-[80%]
            after:bg-white after:rounded-full
            `}
            />

            {/* TODO! */}
            {/* Create a custom component for this button */}
            <button
            onClick={async () => {
              if(!content && (content.length >= 360)) return
              
              try{
                setLoading(true)
                await createPost(content , user)
                setLoading(false)
                setContent("")
              }
              catch(err){
                console.log(err)
                setLoading(false)
              }
            }}
            className={`
            ${(content && (content.length <= 360)) ? "bg-violet-500" : "bg-violet-300 pointer-events-none"} 
            text-white
            px-3 py-1 rounded-md mx-4
            `}>
              { loading ? 
              <CgSpinner
              className='text-[1.5rem] mx-[5px] animate-spin'/> : "Post"}
            </button>

          </div>

        </div>
        
    </div>
  )
}

export default NewPost