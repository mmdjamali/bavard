import React from 'react'
import { sidebarSections } from '../../data/sidebar'
import { Link } from 'react-router-dom'
import { FullWidthButton } from '../buttons'
import { ProfileButton } from '../../features/auth'
import { useSelector } from 'react-redux'
import { rootType } from '../../redux/store'
import {HiOutlineDotsHorizontal} from "react-icons/hi";

const Sidebar :React.FC = () => {
  const { profile , user , pending } : {profile : any , user : string | null , pending : boolean} = useSelector((state : rootType) => state.AuthSlice)
  const { current } = useSelector((state : rootType) => state.SidebarSlice) 
  
  if(!profile ||!user || pending) return(<></>)
  
  return (
    <div
    className='
    sticky w-[16rem] h-screen
    bg-white flex justify-center
    border-r-[1px]
    '>

      <div
      className='
      relative w-[10rem]
      h-screen flex flex-col
      '>


        <img 
        src="/app-icon.svg" 
        width="30"
        className='mx-2 mt-5'/>

        <div
        className='
        flex flex-col gap-3 mt-5
        '>

          {sidebarSections.map((item , idx) => {
            if(!item?.icon) return(
                <p
                key={idx}
                className={`
                px-[9px] text-[12px]
                text-neutral-500 font-medium
                ${idx !== 0 ? "mt-4" : ""}
                `}
                >
                  {item.title}
                </p>
            )
            
            return(
                <Link
                key={idx}
                to={item?.path}
                className={`
                ${item?.title === current ? 
                "bg-violet-100 hover:bg-violet-200 text-violet-600"
                :
                "hover:bg-violet-100 hover:text-violet-600 text-neutral-600"
                }
                cursor-pointer flex gap-2
                p-2 rounded-md
                `}>
                    <item.icon
                    className='text-[1.5rem]'/>
                    <p>
                        {item.title}
                    </p>
                </Link>
            )
          } )}

        </div>

        <FullWidthButton
        title='New Tweet'
        sx="mt-6"/>

        <ProfileButton
        profile={profile}/>

      </div>

    </div>
  )
}

export default Sidebar