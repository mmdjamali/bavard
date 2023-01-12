import React from 'react'
import { useGetPostByQuery } from '../hooks'
import { Post } from '../../posts'
import { Link } from 'react-router-dom'
import Loader from '../../../components/Loader'

type props = {
    query : string
}

const HashTagRelated : React.FC<props> = ({
    query
}) => {
  const [data , count , pending , error] : any = useGetPostByQuery(query , "likes")
  
  if(pending)
  return(<Loader sx='py-4 h-fit'/>)
  
  return (
    <div
    className=''>
        <div
        className='
        w-full bg-white
        p-2 text-[1.1rem]
        border-t-[1px]
        '>
            <h3
            className='
            font-medium
            text-neutral-700
            '
            >
                Popular on <span className='text-violet-500'>{query}</span>
            </h3>
        </div>
        <div>

            {data && data?.map((post : any , idx : number) => {
                return <Post
                sx={`border-b-0 ${ idx !== 0 ? "border-t-[1px]" : ""}`}
                key={idx+Math.random()}
                post={post}
                />
            })}

            { data &&
                <div
                className='
                p-1 px-2 border-none
                text-violet-500
                hover:text-violet-600
                '>
                    <Link to={"/explore/"+query.replace("#",'')}>Show more</Link>
                </div>
            }

        </div>
    </div>
  )
}

export default HashTagRelated