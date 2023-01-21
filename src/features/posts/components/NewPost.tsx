import React, { useState , useRef } from 'react'
import { createPost } from '../functions'
import { useSelector } from 'react-redux'
import { rootType } from '../../../redux/store'
import { RiUserLine } from 'react-icons/ri'
import { CgSpinner } from "react-icons/cg"
import { getFile } from '../../storage/utils'

type props = {
  sx? : string,
  placeholder? : string,
  property? : string | null,
  value? : string | null,
  cleanup? : () => void
}

const NewPost :React.FC<props> = ({
  sx,
  placeholder,
  property,
  value,
  cleanup

}) => {
  const {user , profile} : any = useSelector((state : rootType) => state.AuthSlice)
  const [content , setContent] = useState<string>("")
  const [loading , setLoading] = useState<boolean>(false)
  
  const input = useRef<any>();
  
  const pp = getFile("profiles" , profile?.profile_picture || "")

  return (
    <div
    className={`
    flex w-full
    border-b-[1px] border-color
    ${sx ? sx : ""}
    `}
    >

        { pp ? <img 
            src={`${pp ? pp : ""}`}
            className="
            z-[9]
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

        <form
        onSubmit={async (e) => {
          e.preventDefault()

          if(!content && (content.length > 180)) return
          
          try{
            setLoading(true)
            await createPost(content , user , property || "" , value || "")
            setLoading(false)
            setContent("")
            cleanup && cleanup()
          }
          catch(err){
            console.log(err)
            setLoading(false)
            cleanup && cleanup()
          }
        }}
        className='
        flex flex-col
        w-[calc(100%_-_75px)]
        '>

          <textarea
          rows={1}
          placeholder={placeholder || "What's up?"}
          className='
          w-[90%]
          relative
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
          inline w-[95%] h-[1px]
          bg-neutral-200
          
          '/>
          
          <div
          className='
          flex w-full my-4 
          justify-end
          '>

            <div
            style={{
            "backgroundImage" 
              : 
            `conic-gradient(
              ${content.length <= 160 ? "#8B5CF6" : ""}
              ${content.length > 160 && content.length <= 180 ? "rgb(253,224,71)" : ""}
              ${content.length > 180 ? "#EF4444" : ""}
              ${(content.length * 2 )+ "deg"} ,#eee ${(content.length * 2) + "deg"} )
            `}}

            className={`
            w-[30px] h-[30px]
            relative flex items-center justify-center
            rounded-full 
            after:content-[""""]
            after:inline-block 
            after:w-[80%] after:h-[80%]
            after:bg-white 
            after:rounded-full
            `}
            >
              <span
              className={`
              absolute
              text-[.75rem]
              ${content.length <= 160 ? "text-neutral-500" : ""}
              ${(content.length > 160 && content.length <= 180 ) ? "text-yellow-300" : ""}
              ${(content.length > 180 ) ? "text-red-500" : ""}
              `}>
                {content && 180 - content.length}
              </span>
            </div>

            {/* TODO! */}
            {/* Create a custom component for this button */}
            <button
            className={`
            ${(content && (content.length <= 180)) ? "bg-violet-500" : "bg-violet-300 pointer-events-none"} 
            text-white
            px-3 py-1 rounded-md mx-4
            `}>
              { loading ? 
              <CgSpinner
              className='text-[1.5rem] mx-[5px] animate-spin'/> : "Post"}
            </button>

          </div>

        </form>
        
    </div>
  )
}

export default NewPost