import React, { useState } from 'react'
import { useGetPostByQuery } from '../hooks'
import { Post } from '../../posts'
import Loader from '../../../components/Loader'

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
            return <Post post={item} key={idx}/>
        })}
    </div>
  )
}

export default SearchResult