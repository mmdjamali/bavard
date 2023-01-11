import React, { useState } from 'react'
import { useGetPostByQuery } from '../hooks'
import { Post } from '../../posts'

type props = {
    query : string
}
const SearchResult : React.FC<props> = ({
    query
}) => {

  const [max , setMax] = useState<number>(10)
  const [filter , setFilter] = useState<string>("likes")
  
  const [posts , count , pending , err] : any = useGetPostByQuery(query , filter , max)
  
  return (
    <div>
        {posts && posts.map((item , idx) => {
            return <Post post={item} key={idx}/>
        })}
    </div>
  )
}

export default SearchResult