import { PostgrestError } from '@supabase/supabase-js'
import React, { useState , useCallback, useEffect, useRef, LegacyRef } from 'react'
import { IconType } from 'react-icons/lib'
import { RiQuillPenLine } from "react-icons/ri";
import { repost } from '../../functions';
import { useCheckForRepost } from '../../hooks';
import { useDispatch, useSelector } from 'react-redux';
import { rootType } from '../../../../redux/store';
import { setActive as setPopupActive , setProperty , setValue } from '../../../../redux/NewPostPopupSlice';

type props = {
    FilledIcon : IconType,
    LinedIcon : IconType,
    color : string,
    fillColor : string,
    post : any,
    showNumber?: boolean,
    iconSize ?: string
}
const RepostButton : React.FC<props> = ({
    FilledIcon , 
    LinedIcon ,
    color,
    fillColor,
    post,
    showNumber = true,
    iconSize
}) => {
  const user = useSelector((state : rootType) => state.AuthSlice.user)
  const [reposted] = useCheckForRepost(post?.ID , user || "")
  const [ reposts , setReposts ] = useState<number>(post.reposts)
  const [ active , setActive ] = useState<boolean>(false)

  const container = useRef<any>()

  const dispatch = useDispatch()
  
  return (
    <div
    className='
    flex justify-center items-center
    relative
    '>
      <button
      onClick={() => {
        setActive(true)
        container.current.focus()
      }}
      className={`
      transition-colors
      rounded-full group
      p-1.5
      ${color}
      text-neutral-600
      `}>
        
        { reposted ? 
          
          <FilledIcon
          className={`
          ${fillColor}
          ${iconSize ? iconSize : "text-[1rem]"}
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
          { reposts?.toString() || "0"}
      </span>
      }

      <div
      ref={container}
      onBlur={() => {
        setActive(false)
      }}
      tabIndex={1}
      className={`
      absolute bottom-0
      bg-white
      text-[.9rem]
      text-neutral-800
      left-[50%]
      translate-x-[-50%]
      flex
      flex-col
      items-start
      whitespace-nowrap
      ${ active ? "scale-100" : "scale-0"}
      rounded-md
      overflow-hidden
      transition-all
      delay-150
      shadow-[0_2px_5px]
      shadow-emerald-700/20
      `}>

        <button
        onClick={() => {
          dispatch(setPopupActive(true))
          dispatch(setProperty("parent"))
          dispatch(setValue(post.ID))
        }}
        className='
        hover:text-emerald-600
        hover:bg-emerald-100
        transition-colors
        px-3 
        py-1 
        flex 
        justify-center 
        items-center
        gap-2
        '>
            <RiQuillPenLine/> Quote Repost
        </button>

        <button
        onClick={() => {
            repost(post , false)
        }}
        className='
        hover:text-emerald-600
        transition-colors
        px-3 
        py-1 
        flex 
        justify-center 
        items-center
        gap-2
        '>
            <FilledIcon/> Repost
        </button>
        
      </div>

    </div>
  )
}

export default RepostButton