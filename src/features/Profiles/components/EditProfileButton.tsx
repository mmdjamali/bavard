import React, { useState } from 'react'
import { RiUserSettingsLine } from 'react-icons/ri'
import { useDispatch } from 'react-redux';
import { activateProfileEditor } from '../../../redux/PopupSlice';

const EditProfileButton = () => {
  const [ showIcon , setShowIcon ] = useState(true);
  const dispatch = useDispatch()

  return (
    <button
    onClick={() => {
        dispatch(activateProfileEditor(true))
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
    
    text-neutral-600
    rounded-full
    border-[1px]
    border-neutral-300
    hover:bg-neutral-100
    transition-all
    `}>
        {
        showIcon ? 
            <RiUserSettingsLine/>
        :
            <span className='select-none'>Edit Profile</span>
        }
    </button>
  )
}

export default EditProfileButton