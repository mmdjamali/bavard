import React from 'react'
import useSidebarChanger from '../hooks/useSidebarChanger'
import { NewPost } from '../features/posts';
import { useGetPosts } from '../features/storage/hooks';
import { Post } from '../features/posts';

const Home = () => {
  useSidebarChanger("Home")
  const [data , pending] = useGetPosts()

  return (
    <div
    className='
    w-[min(calc(100%_-_79px),450px)]
    sm:w-[min(calc(100%_-_14rem),450px)]
    relative border-x-[1px]
    min-h-screen flex flex-col
    '
    >
      <div
      className='
      fixed p-2
      bg-white/50 z-10
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

        {
          data.map((post : any , idx : number) => {
            return <Post 
            key={idx}
            post={post}
            />
          })
        }        
      </div>
    </div>
  )
}

export default Home