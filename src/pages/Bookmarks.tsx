import React , { useState , useCallback , useRef } from 'react'
import useSidebarChanger from '../hooks/useSidebarChanger'
import { useGetBookmarkedPosts } from '../features/bookmark/hooks'
import BookMarkedPosts from '../features/bookmark/components/BookMarkedPosts'
import Loader from '../components/Loader'
import InfiniteScroll from '../utils/InfiniteScroll'

const Bookmarks = () => {
  useSidebarChanger("Bookmarks")
  const [max, setMax] = useState<number>(10)

  const [posts , hasMore , pending , err] = useGetBookmarkedPosts(max)

  console.log(posts)

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
    xs:w-[min(calc(100%_-_79px),450px)]
    sm:w-[min(calc(100%_-_14rem),450px)]    
    min-h-screen border-x-[1px] border-color
    '
    >

      {
        posts &&
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

      {!posts && !pending && <p>No bookmarks yet</p>}

    </div>
  )
}

export default Bookmarks