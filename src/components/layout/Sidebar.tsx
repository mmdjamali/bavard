import React from 'react'
import { sidebarSections } from '../../data/sidebar'
import { Link } from 'react-router-dom'
import { FullWidthButton } from '../buttons'
import { ProfileButton } from '../../features/auth'
import { useSelector } from 'react-redux'
import { rootType } from '../../redux/store'
import { RiQuillPenLine } from "react-icons/ri";

const Sidebar :React.FC = () => {
  const { profile , user , pending } = useSelector((state : rootType) => state.AuthSlice)
  const { current } = useSelector((state : rootType) => state.SidebarSlice) 
  
  if(!profile ||!user || pending) return(<></>)
  
  return (
    <div
    className='
    sticky 
    w-[80px] md:w-[14rem] h-screen
    bg-white flex justify-center
    border-r-[1px]
    '>

      <div
      className='
      relative w-[75%] md:w-[10rem]
      h-screen flex flex-col 
      items-center md:items-stretch
      '>


        <img 
        src="/app-icon.svg" 
        width="30"
        className='mx-2 mt-5'/>

        <div
        className='
        flex flex-col gap-3 mt-5 
        items-center md:items-stretch
        '>

          {sidebarSections.map((item , idx) => {
            if(!item?.icon) return(
                <p
                key={idx}
                className={`
                md:px-[9px] text-[12px]
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
                w-fit md:w-[auto]
                cursor-pointer flex gap-2
                p-2 rounded-md
                `}>
                    <item.icon
                    className='text-[1.5rem]'/>
                    <p
                    className='hidden md:inline'
                    >
                        {item.title}
                    </p>
                </Link>
            )
          } )}

        </div>

        <FullWidthButton
        title={
          <>
          <span
          className='hidden md:inline'
          >
            New tweet
          </span>
          <RiQuillPenLine
          className='md:hidden text-[1.5rem]'/>
          </>
        }
        sx="
        mt-6
        w-fit md:w-full 
        md:p-0 md:py-2 p-2
        "/>

        <ProfileButton
        profile={profile}/>

      </div>

    </div>
  )
}

export default Sidebar