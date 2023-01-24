import React , { useState , useCallback , useRef } from 'react'
import useSidebarChanger from '../hooks/useSidebarChanger'
import { useGetBookmarkedPosts } from '../features/bookmark/hooks'
import BookMarkedPosts from '../features/bookmark/components/BookMarkedPosts'
import Loader from '../components/Loader'
import InfiniteScroll from '../utils/InfiniteScroll'
import { RiBookmarkFill, RiBookmarkLine } from 'react-icons/ri'

const Bookmarks = () => {
  useSidebarChanger("Bookmarks")
  const [max, setMax] = useState<number>(10)

  const [posts , hasMore , pending , err] = useGetBookmarkedPosts(max)

  if(pending) return(
    <Loader
    sx='
    w-full
    xs:w-[min(calc(100%_-_79px),450px)]
    sm:w-[min(calc(100%_-_14rem),450px)]    
    min-h-screen border-x-[1px] border-color
    '/>
  )

  return (
    <div
    className='
    w-full
    xs:w-[min(calc(100%_-_79px),calc(450px-_2px))]
    sm:w-[min(calc(100%_-_14rem),calc(450px-_2px))]    
    min-h-screen border-x-[1px] border-color
    '
    >

      {
        posts && posts?.length !== 0 &&
        <>
          <BookMarkedPosts
          posts={posts}/>

          <InfiniteScroll
          hasMore={hasMore}
          setMax={setMax}
          data={posts}
          pending={pending}
          />
        </>
      }

      {
      posts?.length === 0 && !pending && 
      <div
      className='
      w-full
      h-screen
      flex
      flex-col
      items-center
      justify-center
      '
      >
        <RiBookmarkLine
        className='
        text-[4rem]
        text-neutral-600
        '
        />
        <p
        className='
        max-w-[75%]
        text-center
        mt-[.5rem]
        font-medium
        text-neutral-600
        '>
          You haven't bookmarked any posts
        </p>
      </div>
      }


    </div>
  )
}

export default Bookmarks