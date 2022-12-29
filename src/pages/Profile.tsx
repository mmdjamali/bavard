import React from 'react'
import useSidebarChanger from '../hooks/useSidebarChanger'

const Profile = () => {
  useSidebarChanger("Profile")
  return (
    <div
    className='
    md:w-[calc(100%_-_14rem)]
    min-h-screen
    '
    >Profile</div>
  )
}

export default Profile