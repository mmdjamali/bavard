import React from 'react'
import useSidebarChanger from '../hooks/useSidebarChanger'

const Messages = () => {
  useSidebarChanger("Messages")
  return (
    <div
    className='
    md:w-[calc(100%_-_14rem)]
    min-h-screen
    '
    >Messages</div>
  )
}

export default Messages