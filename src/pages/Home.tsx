import React from 'react'
import useSidebarChanger from '../hooks/useSidebarChanger'

const Home = () => {
  useSidebarChanger("Home")
  return (
    <div
    className='
    md:w-[calc(100%_-_14rem)]
    min-h-screen
    '
    >Home</div>
  )
}

export default Home