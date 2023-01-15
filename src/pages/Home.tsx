import React , { useState , useRef , useCallback , createRef } from 'react'
import useSidebarChanger from '../hooks/useSidebarChanger'
import { NewPost } from '../features/posts';
import { useGetPosts } from '../features/storage/hooks';
import { Post } from '../features/posts';
import Loader from '../components/Loader';
import Repost from '../features/posts/components/Repost';

const Home = () => {
  useSidebarChanger("Home")
  const [max , setMax] = useState<number>(10)
  const [data , pending , error , hasMore] = useGetPosts(max)

  const observer = useRef<IntersectionObserver | null>(null)

  const setupObserver = useCallback((node : any) => {
    if(pending) return
    if(observer.current) observer.current.disconnect()
    
    observer.current = new IntersectionObserver(entries => {
      if(entries[0].isIntersecting){
        if(pending || !hasMore) return
        setMax(prev => prev + 10)
      }
    })

    if(node) observer.current.observe(node)

  },[pending , hasMore])

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
                repostID={post?.ID}
                key={idx+Math.random()}
                created_at={post?.created_at}
                pId={post?.parent}
                rId={post?.created_by}
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

        {
          !pending && data &&
          <div
          ref={setupObserver}
          className="
          h-[1px]
          w-full
          "
          />
        }
   
      </div>
    </div>
  )
}

export default Home