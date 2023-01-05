import React from 'react'
import { horizontalSectionBar } from "../data";
import { interactWithPost } from '../functions';

type props = {
  post : any,
  user : string
};

const HorizontalActionBar : React.FC<props> = ({
  post,
  user
}) => {
  return (
    <div
    className='
    flex mt-3  justify-evenly mr-4
    '>
        {horizontalSectionBar.map((item , idx) => {
          let color = ` hover:bg-${item.color}-200/50 hover:text-${item.color}-500 `
          let fillColor = ` text-${item.color}-500 `
          return(
          <div
          key={idx}
          className='
          flex justify-center items-center
          '>
            <button
            onClick={() => {
              interactWithPost(item.property , post.id)
            }}
            className={`
            rounded-full
            ${color}
            group
            p-1.5
            `}>
              
              { post[item.property]?.includes(user) ? 
                <item.filledIcon
                className={`
                text-[1rem]
                ${fillColor}
                `}/>
              :
                <item.linedIcon
                className={`
                text-[1rem]
                  
                `}/>
              }

            </button>
            
            <span
            className='
            text-[.9rem]
            '>
                {post[item.property]?.length || "0"}
            </span>

          </div>
          )
        })}
    </div>
  )
}

export default HorizontalActionBar