import React from 'react'
import useSidebarChanger from '../hooks/useSidebarChanger'

const Profile = () => {
  useSidebarChanger("Profile")
  return (
    <div
    className='
    w-full
    xs:w-[min(calc(100%_-_79px),450px)]
    sm:w-[min(calc(100%_-_14rem),450px)]    
    min-h-screen
    '
    >
      Profile
    </div>
  )
}

export default Profile