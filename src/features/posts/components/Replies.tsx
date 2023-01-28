import React , { useState } from 'react'
import { useGetReplies } from '../hooks'
import Loader from '../../../components/Loader'
import PostCard from './PostCard'
import InfiniteScroll from '../../../utils/InfiniteScroll'

type props = {
    ID  : string | null
}

const Replies : React.FC<props> = ({
    ID
}) => {
  const [max , setMax] = useState<number>(10)
  const [posts , hasMore , pending , err] = useGetReplies(max , ID || "")

  if(
    pending ||
    !ID
    ){
    return(
        <Loader
        sx="h-fit py-8"
        />
    )
  }

  return (
    <div>
        {
        posts &&
        posts?.map((item : {ID : string} , idx : number) => {
            return(
                <PostCard
                key={idx}
                ID={item?.ID}
                />
            )
        })}

        <InfiniteScroll
        hasMore={hasMore}
        data={posts}
        setMax={setMax}
        pending={pending}
        />
    </div>
  )
}

export default Replies