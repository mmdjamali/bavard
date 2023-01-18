import React from 'react'
import { horizontalSectionBar } from "../data";
import { interactWithPost, repost } from '../functions';
import InteractionButton from './InteractionButton';
import { useGetReposts } from '../hooks';
import { CgSpinner } from "react-icons/cg"
import RepostButton from './interactions/RepostButton';
import LikeButton from './interactions/LikeButton';
import ReplyButton from './interactions/ReplyButton';

type props = {
  post : any,
  user : string,
  sx? : string
};

const HorizontalActionBar : React.FC<props> = ({
  post,
  user,
  sx
}) => {

  if(!post) return <></>

  return (
    <div
    className={`
    flex 
    mt-3  
    justify-evenly 
    mr-4
    ${sx ? sx : ""}
    `}>
        {horizontalSectionBar.map((item , idx) => {
          switch(item.title){
            case("reposts") :
            return(
            <RepostButton
            key={idx}
            fillColor={item.fillColor}
            color={item.color}
            FilledIcon={item.filledIcon}
            LinedIcon={item.linedIcon}
            post={post}
            />
            )

            case("likes") :

            return(
              <LikeButton
              key={idx}
              fillColor={item.fillColor}
              color={item.color}
              FilledIcon={item.filledIcon}
              LinedIcon={item.linedIcon}
              post={post}
              />
            )

            case("replies"):
              return(
                <ReplyButton
                key={idx}
                fillColor={item.fillColor}
                color={item.color}
                FilledIcon={item.filledIcon}
                LinedIcon={item.linedIcon}
                post={post}
                />
              )

            default : 
            return(
              <></>
            )

          }
          
        })}
    </div>
  )
}

export default HorizontalActionBar