import React from 'react'
import { horizontalSectionBar } from "../data";
import { interactWithPost, repost } from '../functions';
import InteractionButton from './InteractionButton';
import { useGetReposts } from '../hooks';
import { CgSpinner } from "react-icons/cg"
import RepostButton from './interactions/RepostButton';
import LikeButton from './interactions/LikeButton';

type props = {
  post : any,
  user : string,
};

const HorizontalActionBar : React.FC<props> = ({
  post,
  user
}) => {

  if(!post) return <></>

  return (
    <div
    className='
    flex mt-3  justify-evenly mr-4
    '>
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

            default : 
            return(
              <InteractionButton
              key={idx+Math.random()}
              color={item.color}
              fillColor={item.fillColor}
              onClick={async () => {
                await interactWithPost(item.property , post.id)
              }}
              data={post[item?.property]}
              FilledIcon={item.filledIcon}
              LinedIcon={item.linedIcon}
              user={user}
              interacted={false}
              />
            )

          }
          
        })}
    </div>
  )
}

export default HorizontalActionBar