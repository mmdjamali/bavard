import React, { useEffect, useState } from 'react'
import useSidebarChanger from '../hooks/useSidebarChanger'
import { SearchBox } from '../features/explore';
import { useParams } from 'react-router-dom';
import SearchResult from '../features/explore/components/SearchResult';
import Topics from '../features/explore/components/Topics';
import AllPosts from '../features/explore/components/AllPosts';

const Explore = () => {
  const { query } = useParams()
  const [section , setSection] = useState<string>(query ? "Search" : "All")

  const [searchValue , setSearchValue] = useState<string | undefined>(query ? "#" + query : "")

  useSidebarChanger("Explore")
  
  const [max , setMax] = useState<number>(0)

  useEffect(() => {
    setSearchValue(query ? "#" + query : "")
    setSection(query ? "Search" : "All")
  },[query])

  return (
    <div
    className='
    w-full
    xs:w-[min(calc(100%_-_79px),450px)]
    sm:w-[min(calc(100%_-_14rem),450px)]
    relative border-x-[1px] border-color
    min-h-screen flex flex-col
    '>
      <div
      className='
      sticky
      top-0
      flex
      flex-col
      z-[10]
      border-b-[1px]
      border-color
      '>
        <SearchBox
        setSearchValue={setSearchValue}
        searchValue={searchValue}
        setSection={setSection}/>

        <div
        className='
        bg-white
        w-full
        flex
        '>
          {
            buttons.map((item : string , idx :number) => {
              return(
                <button
                onClick={() => {
                  setSection(item)
                }}
                key={idx}
                className={`
                hover:bg-violet-50
                w-full
                whitespace-nowrap
                px-4
                text-[.9rem]
                text-neutral-700
                grid
                place-items-center
                transition-all
                `}>
                  <p
                  className={`
                  ${
                    section === item ?
                    "border-b-4 border-violet-500 font-medium"
                  :
                    "border-b-4 border-transparent"
                  }
                  py-2
                  px-1
                  w-fit
                  transition-all
                  `}>
                    {item}
                  </p>
                </button>
              )
            })
          }
        </div>
      </div>

        {
          (() => {
            switch(section){
              case("All") :
                return(
                  <AllPosts/>
                )

              case("Search") :
                return(
                  <>
                    {
                      searchValue ? 
                      <SearchResult query={searchValue} />
                      :
                      <div
                      className='
                      relative
                      w-full
                      '
                      >
                        <Topics/>
                      </div>
                    }
                  </>
                )
            }
          })()
        }

    </div>
  )
}

export default Explore

const buttons = ["Search","All"]