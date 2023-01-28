import React from 'react'
import { RiChat3Fill } from "react-icons/ri";
import { useGetPostByQuery } from '../hooks';
import Repost from '../../posts/components/Repost';
import { PostCard } from '../../posts';
import Loader from '../../../components/Loader';
import { useNavigate } from 'react-router-dom';

type props = {
    topic : string
}

const TopicRelatedPosts : React.FC<props> = ({
    topic
}) => {
  const navigate = useNavigate()
  const [posts , count , pending , err] :any = useGetPostByQuery("#" + topic.replaceAll(" ","_"),"likes",10)

  if(posts?.length === 0 && !pending) return <></>

  return (
    <div
    className='
    flex
    flex-col
    '>

        <div
        className='
        flex
        items-center
        px-4
        py-2
        border-b-[1px]
        border-color
        gap-2
        '>

            <RiChat3Fill
            className='
              text-violet-500
              text-[1.75rem]
            '/>

            <span
            className='
            text-neutral-600
            text-[1.25rem]
            font-medium
            '>
              {topic} 
            </span>

        </div>

        <div>
        {
          pending &&
          <Loader
          sx='
          h-fit my-10
          '
          />
        }

        {
          posts &&
          posts?.map((item : any,idx : number) => {
            if(item?.parent) return(
              <Repost
              key={idx}
              content={item?.content}
              parent={item?.parent}
              postId={item?.ID}
              reposterId={item?.created_by}
              />
            )

            return(
              <PostCard
              key={idx}
              ID={item?.ID}
              />
            )
          })
        }

        </div>

        <span
        onClick={() => {
          navigate("/explore/" + topic)
        }}
        className='
        hover:bg-violet-100
        px-4
        py-2
        text-[.9rem]
        text-violet-500
        cursor-pointer
        border-b-[1px]
        border-color
        '>
          Show more
        </span>

    </div>
  )
}

export default TopicRelatedPosts