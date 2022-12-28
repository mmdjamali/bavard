import React , { useEffect, useLayoutEffect, useState } from 'react'
import { HiOutlineDotsHorizontal } from 'react-icons/hi'
import { logout } from '../utils'
import { getFile } from '../../storage/utils'

type props = {
    profile : any,
}

const ProfileButton : React.FC<props> = ({
    profile
}) => {
  const [show,setShow] = useState(false);
  const [pp , setPP] = useState<string | ArrayBuffer | null>()

  useLayoutEffect(() => {
    const func = async () => {
      let reader = new FileReader;
      let file = await getFile("profiles" , profile?.profile_picture)
      if(!file) return
      reader.readAsDataURL(file)
      reader.onload = () => {
        setPP(reader.result)
      }
    }

    func()
  },[profile])
  
  return (
    <div
    className='
    mt-auto mb-2 relative
    '>
        <div
        onClick={() => {
            setShow(prev => !prev)
        }}
        className="
        relative 
        p-2 rounded-md flex items-center justify-between
        bg-white cursor-pointer hover:bg-violet-100
        hover:shadow-[0_4px_6px] hover:shadow-[rgba(21,21,21,.16)]
        ">

            <img 
            src={`${pp ? pp : ""}`}
            className="
            rounded-full
            w-[40px] h-[40px] object-cover
            "
            />

            <div
            className='
            w-[72px]
            max-w[72px]
            flex flex-col
            '>
                <span
                className='
                text-neutral-700 text-[14px]
                text-ellipsis overflow-hidden
                '
                >
                {profile.display_name}
                </span>
                <span
                className='
                text-neutral-500 text-[12px]
                text-ellipsis overflow-hidden
                '>
                {profile?.username}
                </span>
            </div>

            <HiOutlineDotsHorizontal/>

        </div>

        <div
        className={`
        absolute flex
        ${show ? "scale-100" : "scale-0"}
        transition-all delay-75 ease-linear
        overflow-hidden
        bottom-[calc(100%_+_16px)] left-0
        w-full bg-red-50
        rounded-md items-center
        `}>

            <button
            onClick={() => {
                logout()
            }}
            className='
            bg-red-50 hover:bg-red-100 
            hover:text-red-500 text-red-400
            transition-colors delay-75
            w-full p-2
            '>
                Logout
            </button>

        </div>
    </div>
  )
}

export default ProfileButton