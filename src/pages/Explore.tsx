import React from 'react'
import useSidebarChanger from '../hooks/useSidebarChanger'
import { SearchBox } from '../features/explore';
import { NewPost } from '../features/posts';

const Explore = () => {
  useSidebarChanger("Explore")
  return (
    <div
    className='
    w-[min(calc(100%_-_79px),450px)]
    sm:w-[min(calc(100%_-_14rem),450px)]    
    min-h-screen 
    relative border-x-[1px]
    flex flex-col
    '>

        <SearchBox/>
        <NewPost/>
        <NewPost/>
        <NewPost/>
        <NewPost/>
        <NewPost/>
        <NewPost/>
        <NewPost/>
        <NewPost/>
        <NewPost/>
        <NewPost/>
        <NewPost/>
        <NewPost/>
        <NewPost/>
        <NewPost/>
        <NewPost/>
        <NewPost/>
        <NewPost/>
        <NewPost/>
        <NewPost/>
    </div>
  )
}

export default Explore