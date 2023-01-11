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
  const [data , count , pending , error] = useGetPostByQuery(query , "likes")
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
            {
                pending && <Loader sx='py-4 h-fit'/>
            }

            {data && data?.map((post , idx) => {
                return <Post
                sx={`border-b-[0px] ${ idx !== 0 ? "border-t-[1px]" : ""}`}
                key={idx+Math.random()}
                post={post}
                />
            })}

            { data &&
                <div
                className='
                p-1 px-2
                text-violet-500
                hover:text-violet-600
                '>
                    <Link to={"/explore/"+query}>Show more</Link>
                </div>
            }

        </div>
    </div>
  )
}

export default HashTagRelated