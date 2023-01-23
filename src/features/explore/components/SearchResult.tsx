import React, { useState } from 'react'
import { useGetPostByQuery } from '../hooks'
import { Post } from '../../posts'
import Loader from '../../../components/Loader'
import Repost from '../../posts/components/Repost'

type props = {
    query : string
}
const SearchResult : React.FC<props> = ({
    query
}) => {

  const [max , setMax] = useState<number>(10)
  const [filter , setFilter] = useState<string>("likes")
  
  const [posts , count , pending , err] : any = useGetPostByQuery(query , filter , max)
  
  if(pending) return <Loader sx='h-fit py-4'/>

  return (
    <div>
        {posts && posts.map((item : any , idx : number) => {
            if(item?.parent)return(
              <Repost
              postId={item?.ID}
              reposterId={item?.created_by}
              parent={item?.parent}
              content={item?.content}
              />
            )
            
            return (
            <Post
            ID={item?.ID}
            key={idx}
            />)
        })}
    </div>
  )
}

export default SearchResult