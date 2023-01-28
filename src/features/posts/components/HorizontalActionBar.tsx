import React from 'react'
import { horizontalSectionBar } from "../data";
import RepostButton from './interactions/RepostButton';
import LikeButton from './interactions/LikeButton';
import ReplyButton from './interactions/ReplyButton';

type props = {
  post : any,
  user : string,
  sx? : string,
  showNumber ?: boolean,
  iconSize ?: string 
};

const HorizontalActionBar : React.FC<props> = ({
  post,
  user,
  sx,
  iconSize,
  showNumber
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
            iconSize={iconSize}
            showNumber={showNumber}
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
              iconSize={iconSize}
              showNumber={showNumber}
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
                iconSize={iconSize}
                showNumber={showNumber}
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