import React from 'react'
import { sidebarSections } from '../../data/sidebar'
import { Link } from 'react-router-dom'
import { FullWidthButton } from '../buttons'
import { ProfileButton } from '../../features/auth'
import { useSelector } from 'react-redux'
import { rootType } from '../../redux/store'
import { RiQuillPenLine } from "react-icons/ri";

const BottomNavbar = () => {
  const current = useSelector((state : rootType) => state.SidebarSlice.current)
  const { profile , user , pending } = useSelector((state : rootType) => state.AuthSlice)

  if(!profile ||!user || pending) return(<></>)

  return (
    <div
    className='
    flex xs:hidden
    w-full h-[3.5rem]
    z-10 justify-center
    bg-white sticky bottom-0 left-0
    shadow-[0px_-2px_12px_2px] shadow-black/10
    '>
        <div
        className='
        w-full
        flex justify-evenly items-center
        '>
            {sidebarSections.map((item , idx) => {
            if(!item?.icon) return
            
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
                w-fit sm:w-[auto]
                cursor-pointer flex gap-2
                p-2 rounded-md
                `}>
                    <item.icon
                    className='text-[1.5rem]'/>
                    <p
                    className='hidden sm:inline'
                    >
                        {item.title}
                    </p>
                </Link>
            )
          } )}

        </div>
    </div>
  )
}

export default BottomNavbar