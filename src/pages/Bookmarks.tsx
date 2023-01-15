import React , { useState , useCallback , useRef } from 'react'
import useSidebarChanger from '../hooks/useSidebarChanger'
import { useGetBookmarkedPosts } from '../features/bookmark/hooks'
import BookMarkedPosts from '../features/bookmark/components/BookMarkedPosts'
import Loader from '../components/Loader'

const Bookmarks = () => {
  useSidebarChanger("Bookmarks")
  const [max, setMax] = useState<number>(10)

  const [posts , hasMore , pending , err] = useGetBookmarkedPosts(max)
  const observer = useRef<IntersectionObserver | null>();

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
          posts={posts}
          setMax={setMax}/>
          <div
          ref={setupObserver}
          />
        </>
      }

      {!posts && !pending && <p>No bookmarks yet</p>}

    </div>
  )
}

export default Bookmarks