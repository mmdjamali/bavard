import React , { useState } from 'react'
import { useGetAllPosts } from '../hooks'
import Loader from '../../../components/Loader';
import InfiniteScroll from '../../../utils/InfiniteScroll';
import Repost from '../../posts/components/Repost';
import { PostCard } from '../../posts';

const AllPosts = () => {
  const [max , setMax] = useState<number>(10)

  const [posts,hasMore,pending,err] : any = useGetAllPosts(max);

  return (
    <div>
        {
            posts &&
            posts?.map((item : any , idx : number) => {
                if(item?.parent) return(
                    <Repost
                    key={idx+Math.random()}
                    parent={item?.parent}
                    postId={item?.ID}
                    reposterId={item?.created_by}
                    content={item?.content}
                    />
                )
    
                return(<PostCard
                key={idx}
                ID={item?.ID}
                />)
            })
        }
        {
            pending &&
            <Loader
            sx="h-fit my-4"/>
        }
        <InfiniteScroll
        data={posts}
        hasMore={hasMore}
        setMax={setMax}
        pending={pending}
        num={10}
        />
    </div>
  )
}

export default AllPosts