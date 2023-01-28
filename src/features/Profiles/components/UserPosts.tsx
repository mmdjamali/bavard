import React , { useState } from 'react'
import InfiniteScroll from '../../../utils/InfiniteScroll'
import { useGetUserPosts } from '../Hooks'
import Repost from '../../posts/components/Repost'
import { PostCard } from '../../posts'
import Loader from '../../../components/Loader'

type props = {
    username : string
}

const UserPosts : React.FC<props> = ({
    username
}) => {
    const [max,setMax] = useState<number>(10)
    const [posts,pending,err,hasMore] = useGetUserPosts(max , username || "")
    return (
    <div>
        {
          posts &&
          posts?.map((post : any, idx : number) => {
            if(post?.parent) return(
              <Repost
              key={idx+Math.random()}
              parent={post?.parent}
              postId={post?.ID}
              reposterId={post?.created_by}
              content={post?.content}
              />
            )

            return(<PostCard
            key={idx}
            ID={post?.ID}
            />)
          })
        }

        {
            pending &&
            <Loader
            sx="
            h-fit
            py-4
            "
            />
        }

        <InfiniteScroll
        setMax={setMax}
        pending={pending}
        data={posts}
        hasMore={hasMore}
        />

      </div>
  )
}

export default UserPosts