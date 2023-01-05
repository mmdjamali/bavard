import React from 'react'
import useSidebarChanger from '../hooks/useSidebarChanger'

const Messages = () => {
  useSidebarChanger("Messages")
  return (
    <div
    className='
    w-[min(calc(100%_-_79px),450px)]
    sm:w-[min(calc(100%_-_14rem),450px)]    
    min-h-screen
    '
    >Messages</div>
  )
}

export default Messages