import React , { useState , useRef } from 'react'
import { HiOutlineDotsHorizontal } from 'react-icons/hi'
import { useGetUserProfile } from '../../auth/hooks'
import { useSelector } from 'react-redux'
import { rootType } from '../../../redux/store'
import { changeReposts, deletePost } from '../functions'
import { followUser } from '../../auth/utils'
import { RiDeleteBin7Line , RiUserUnfollowLine , RiUserAddLine } from "react-icons/ri"

type props = {
    ID : string,
    created_by : string,
    creator : any,
    parent? : string
}
const VeriticalActionBar : React.FC<props> = ({
    ID,
    created_by,
    creator,
    parent
}) => {
    const [show , setShow] = useState<boolean>(false)
    const {user} : any = useSelector((state : rootType) => state.AuthSlice);
    const [profile] : any = useGetUserProfile(show ? user : "")

    const container = useRef<HTMLDivElement | null>(null)
        
    return (
    <div
    className='
    relative ml-auto
    '>
        <button
        onClick={() => {
            setShow(true)
            container.current?.focus();
        }}
        className='
        rounded-full
        hover:bg-violet-100 p-1
        '>
            <HiOutlineDotsHorizontal/>
        </button>

        <div
        tabIndex={1}
        onBlur={() => {
            setShow(false)
        }}
        ref={container}
        className={`
        ${!show && "scale-0"}
        absolute
        bg-white
        shadow-[0_0_6px_rgba(40,40,40,.16)]
        rounded-md
        z-10 flex flex-col
        items-start
        whitespace-nowrap
        top-0
        right-0
        overflow-hidden
        transition-all
        delay-150
        `}>
            { profile && <>
                { created_by === user ?
                <button
                onClick={async () => {
                 await deletePost(ID)
                changeReposts(parent || "")
                }}
                className='
                text-[.9rem] text-red-500
                hover:bg-red-100
                px-2
                py-1
                text-left
                w-full
                flex
                items-center
                justify-center
                gap-2
                '>
                <RiDeleteBin7Line/>
                Delete
                </button>
                :
                <button
                onClick={() => {
                    followUser(created_by || "")
                }}
                className='
                text-[.9rem]
                px-2
                py-1
                flex
                items-center
                justify-center
                gap-2
                '>
                {profile?.followed?.includes(created_by) ? <> <RiUserUnfollowLine/> Unfollow </> : <> <RiUserAddLine/>Fallow </>}
                {`${creator?.display_name}`}
                </button>
                }

            
            </>
            }
        </div>

    </div>
  )
}

export default VeriticalActionBar