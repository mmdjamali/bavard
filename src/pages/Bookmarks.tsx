import React from 'react'
import useSidebarChanger from '../hooks/useSidebarChanger'

const Bookmarks = () => {
  useSidebarChanger("Bookmarks")
  return (
    <div
    className='
    md:w-[calc(100%_-_14rem)]
    min-h-screen
    '
    >Bookmarks</div>
  )
}

export default Bookmarks