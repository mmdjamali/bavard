import React , { useState , useRef , useCallback , createRef } from 'react'
import useSidebarChanger from '../hooks/useSidebarChanger'
import { NewPost } from '../features/posts';
import { useGetPosts } from '../features/storage/hooks';
import { Post } from '../features/posts';
import Loader from '../components/Loader';
import Repost from '../features/posts/components/Repost';
import SkeletonPost from '../features/posts/components/SkeletonPost';
import InfiniteScroll from '../utils/InfiniteScroll';

const Home = () => {
  useSidebarChanger("Home")
  const [max , setMax] = useState<number>(10)
  const [data , pending , error , hasMore] = useGetPosts(max)

  return (
    <div
    className='
    w-full
    xs:w-[min(calc(100%_-_79px),450px)]
    sm:w-[min(calc(100%_-_14rem),450px)]
    relative border-x-[1px] border-color
    min-h-screen flex flex-col
    '
    >
      
      <div
      className='
      fixed p-2
      bg-white/75 z-10
      backdrop-blur-sm
      '>
        <h2
        className='
        text-[1.25rem] font-semibold
        text-violet-dark
        '>
          Home
        </h2>
      </div>

      {/*placeholder for title*/}
      <div
      className='
      p-2 sticky top-0
      bg-white z-[8]
      '>
        <p
        className='
        text-[1.25rem] font-semibold
        text-transparent
        '>
          Home
        </p>
      </div>

      <div
      className="
      w-full relative
      "
      >

        <NewPost/>

        { data?.map((post : any , idx : number) => {

            if(post?.parent) return(
                <Repost
                key={idx+Math.random()}
                parent={post?.parent}
                postId={post?.ID}
                reposterId={post?.created_by}
                content={post?.content}
                />
            )

            return(<Post
            key={idx}
            ID={post?.ID}
            />)

          })
        }     

        {pending &&
        <Loader
        sx='h-fit py-4'/>
        }

        <InfiniteScroll
        setMax={setMax}
        pending={pending}
        data={data}
        hasMore={hasMore}
        />
   
      </div>
    </div>
  )
}

export default Home