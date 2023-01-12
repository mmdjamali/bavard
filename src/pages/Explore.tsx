import React, { useEffect, useState } from 'react'
import useSidebarChanger from '../hooks/useSidebarChanger'
import { SearchBox } from '../features/explore';
import { NewPost } from '../features/posts';
import { useGetPostByQuery } from '../features/explore/hooks';
import { useParams } from 'react-router-dom';
import HashTagRelated from '../features/explore/components/HashTagRelated';
import SearchResult from '../features/explore/components/SearchResult';

const Explore = () => {
  const { query } = useParams()

  const [searchValue , setSearchValue] = useState<string | undefined>(query ? "#" + query : "")

  useSidebarChanger("Explore")
  
  const [max , setMax] = useState<number>(0)

  useEffect(() => {
    setSearchValue(query ? "#" + query : "")
  },[query])

  return (
    <div
    className='
    w-full
    xs:w-[min(calc(100%_-_79px),450px)]
    sm:w-[min(calc(100%_-_14rem),450px)]
    relative border-x-[1px]
    min-h-screen flex flex-col
    '>

        <SearchBox
        setSearchValue={setSearchValue}
        searchValue={searchValue}/>

        <div
        className='
        fixed
        w-[min(calc(100%_-_80px),calc(450px_-_2px)]
        sm:w-[min(calc(100%_-_14rem),calc(450px_-_2px))]
        bg-white h-[60px] z-[8]
        '/>
        {
          searchValue ? <SearchResult query={searchValue} />
          :
          <div
          className='
          relative
          w-full
          '
          >
            <HashTagRelated query={"#hokage"}/>
            <HashTagRelated query={"#FreeIran"}/>
          </div>
        }
    </div>
  )
}

export default Explore