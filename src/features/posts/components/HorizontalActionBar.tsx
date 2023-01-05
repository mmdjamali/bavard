import React from 'react'
import { horizontalSectionBar } from "../data";
import { interactWithPost, repost } from '../functions';
import InteractionButton from './InteractionButton';

type props = {
  post : any,
  user : string
};

const HorizontalActionBar : React.FC<props> = ({
  post,
  user
}) => {
  if(!post) return <p>9</p>

  return (
    <div
    className='
    flex mt-3  justify-evenly mr-4
    transition-colors

    '>
        {horizontalSectionBar.map((item , idx) => {
          switch(item.title){

            case("reposts") :
            if(post.created_by === user) return
            return(
              <InteractionButton
              key={idx}
              color={item.color}
              fillColor={item.fillColor}
              onClick={() => {
                repost(post)
              }}
              data={post[item.property]}
              FilledIcon={item.filledIcon}
              LinedIcon={item.linedIcon}
              user={user}
              />
            )

            case("views") :
            if(post?.created_by !== user) return

            return(
              <InteractionButton
              key={idx}
              color={item.color}
              fillColor={item.fillColor}
              onClick={() => {

              }}
              data={post[item.property]}
              FilledIcon={item.filledIcon}
              LinedIcon={item.linedIcon}
              user={user}
              />
            )

            default : 
            return(
              <InteractionButton
              key={idx}
              color={item.color}
              fillColor={item.fillColor}
              onClick={() => {
                interactWithPost(item.property , post.id)
              }}
              data={post[item.property]}
              FilledIcon={item.filledIcon}
              LinedIcon={item.linedIcon}
              user={user}
              />
            )

          }
          
        })}
    </div>
  )
}

export default HorizontalActionBar