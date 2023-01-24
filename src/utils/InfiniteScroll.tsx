import React , { useRef , useCallback } from 'react'

type props = {
    hasMore : boolean,
    setMax : React.Dispatch<React.SetStateAction<number>>,
    pending : boolean,
    data : any,
    num ?: number
}

const InfiniteScroll : React.FC<props> = ({
    hasMore,
    setMax,
    pending,
    data,
    num = 10
}) => {
    const observer = useRef<IntersectionObserver | null>(null)

    const setupObserver = useCallback((node : any) => {
      if(pending) return
      if(observer.current) observer.current.disconnect()
      
      observer.current = new IntersectionObserver(entries => {
        if(entries[0].isIntersecting){
          if(pending || !hasMore) return
          setMax(prev => prev + num)
        }
      })
  
      if(node) observer.current.observe(node)
  
    },[pending , hasMore])
  return (
    <>
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
    </>
  )
}

export default InfiniteScroll