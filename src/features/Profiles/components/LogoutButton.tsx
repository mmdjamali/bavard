import React, { useState } from 'react'
import { RiLogoutBoxRLine } from 'react-icons/ri'
import { useDispatch } from 'react-redux';
import { logout } from '../../auth/utils';

const LogoutButton = () => {
  const [ showIcon , setShowIcon ] = useState(true);

  return (
    <button
    onClick={() => {
        logout()
    }}
    onMouseEnter={() => {
        setShowIcon(false)
    }}
    onMouseLeave={() => {
        setShowIcon(true)
    }}
    className={`
    grid
    place-items-center
    ${showIcon ? "w-[35px] text-[1.2rem]" : "px-4 text-[1rem] font-medium"}
    h-[35px]
    
    text-red-400
    rounded-full
    border-[1px]
    border-red-300
    hover:bg-red-50
    transition-all
    `}>
        {
        showIcon ? 
            <RiLogoutBoxRLine/>
        :
            <span className='select-none'>Logout</span>
        }
    </button>
  )
}

export default LogoutButton