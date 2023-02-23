import { PostgrestError } from '@supabase/supabase-js'
import React, { useState , useCallback , useEffect } from 'react'
import { IconType } from 'react-icons/lib'
import { RiQuillPenLine } from "react-icons/ri";
import { likePost, repost } from '../../functions';
import { useCheckForLike, useCheckForRepost } from '../../hooks';
import { useSelector } from 'react-redux';
import { rootType } from '../../../../redux/store';

type props = {
    FilledIcon : IconType,
    LinedIcon : IconType,
    color : string,
    fillColor : string,
    post : any,
    showNumber?: boolean,
    iconSize ?: string
}
const LikeButton : React.FC<props> = ({
    FilledIcon , 
    LinedIcon ,
    color,
    fillColor,
    post,
    showNumber = true,
    iconSize
}) => {
  const [liked , setLiked] : any = useCheckForLike(post.ID)
  const [ likes , setLikes ] = useState<number>(post.likes)
  const [disable , setDisable] = useState<boolean>(false)

  useEffect(() => {
    setLikes(post?.likes)
  },[post])

  return (
    <div
    className='
    flex justify-center items-center
    relative
    '>
      <button
      onClick={async (e) => {
        e.stopPropagation()
        if(disable) return
        setDisable(true)
        if(liked){
          likePost(post?.ID)
          setLikes(prev => prev - 1)
          setLiked(false)
          setDisable(false)
          return
        }

        likePost(post?.ID)
        setLikes(prev => prev + 1)
        setLiked(true)
        setDisable(false)

      }}
      className={`
      transition-colors
      rounded-full group
      p-1.5
      ${color}
      text-neutral-600
      `}>
        
        { liked ? 
          
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
      {
      showNumber &&
      <span
      className='
      text-[.9rem]
      '>
          {likes?.toString() || "0"}
      </span>
      }

    </div>
  )
}

export default LikeButton