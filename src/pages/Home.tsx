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
    w-[calc(100%_-_79px)]
    sm:w-[calc(100%_-_14rem)]
    relative
    min-h-screen flex flex-col
    '
    >
      <div
      className='
      sticky w-full p-2
      '>
        Home
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