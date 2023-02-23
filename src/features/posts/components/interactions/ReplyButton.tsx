import React , {useState , useEffect, useRef} from 'react'
import { IconType } from 'react-icons/lib'
import { useCheckForReply } from '../../hooks'
import { useSelector , useDispatch } from 'react-redux'
import { rootType } from '../../../../redux/store'
import { useNavigate } from 'react-router-dom'

type props = {
    FilledIcon : IconType,
    LinedIcon : IconType,
    color : string,
    fillColor : string,
    post : any,
    showNumber?: boolean,
    iconSize ?: string
}

const ReplyButton : React.FC<props> = ({
    FilledIcon , 
    LinedIcon ,
    color,
    fillColor,
    post,
    showNumber = true,
    iconSize
}) => {
  const user : string | null = useSelector((state : rootType) => state.AuthSlice.user);
  const [replies , setReplies] = useState<number>(post.replies);
  const [replied] = useCheckForReply(post?.ID, user);

  const navigate = useNavigate()

  return (
    <div
    className='
    flex justify-center items-center
    relative
    '>
      <button
      onClick={(e) => {
        e.stopPropagation()
        navigate(location.pathname + `/newpost?post=${post?.ID}&action=replying`)
      }}
      className={`
      transition-colors
      rounded-full group
      p-1.5
      ${color}
      text-neutral-600
      `}>
        
        { replied ? 
          
          <FilledIcon
          className={`
          ${iconSize ? iconSize : "text-[1rem]"}
          ${fillColor}
          `}/>
        :
          <LinedIcon
          className={`
          ${iconSize ? iconSize : "text-[1rem]"}
          `}/>
        }

      </button>
      
      { showNumber &&
      <span
      className='
      text-[.9rem]
      '>
          { replies?.toString() || "0"}
      </span>
      }
      
    </div>
  )
}

export default ReplyButton