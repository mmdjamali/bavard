import React from 'react'
import { horizontalSectionBar } from "../data";
import { interactWithPost, repost } from '../functions';
import InteractionButton from './InteractionButton';
import { useGetReposts } from '../hooks';
import { CgSpinner } from "react-icons/cg"

type props = {
  post : any,
  user : string
};

const HorizontalActionBar : React.FC<props> = ({
  post,
  user
}) => {
  const [REPOST_COUNT , ERR , PENDING , REPOSTED] = useGetReposts(post?.id , user);

  return (
    <div
    className='
    flex mt-3  justify-evenly mr-4
    '>
        {horizontalSectionBar.map((item , idx) => {
          switch(item.title){

            case("reposts") :

            if(PENDING) return <CgSpinner key={idx} className="text-violet-500 animate-spin" />

            return(
              <InteractionButton
              key={idx+Math.random()}
              color={item.color}
              fillColor={item.fillColor}
              onClick={() => {
                repost(post , REPOSTED)
              }}
              data={REPOST_COUNT}
              FilledIcon={item.filledIcon}
              LinedIcon={item.linedIcon}
              user={user}
              interacted={REPOSTED}
              />
            )

            default : 
            return(
              <InteractionButton
              key={idx+Math.random()}
              color={item.color}
              fillColor={item.fillColor}
              onClick={() => {
                interactWithPost(item.property , post.id)
              }}
              data={post[item.property]?.length}
              FilledIcon={item.filledIcon}
              LinedIcon={item.linedIcon}
              user={user}
              interacted={post[item.property]?.includes(user)}
              />
            )

          }
          
        })}
    </div>
  )
}

export default HorizontalActionBar