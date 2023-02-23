import React , { useState , useRef } from 'react'
import { HiOutlineDotsHorizontal } from 'react-icons/hi'
import { useGetUserProfile } from '../../auth/hooks'
import { useSelector } from 'react-redux'
import { rootType } from '../../../redux/store'
import { bookmarkPost, changeReposts, deletePost } from '../functions'
import { followUser } from '../../auth/utils'
import { 
    RiDeleteBin7Line , 
    RiUserUnfollowLine , 
    RiUserAddLine ,
    RiBookmarkLine ,
    RiBookmarkFill
} from "react-icons/ri"
import { CgSpinner } from 'react-icons/cg'

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
    transition-all
    '>
        <button
        onClick={(e) => {
            e.stopPropagation()
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
            { profile ? <>
                { created_by === user ?
                <button
                onClick={async (e) => {
                    e.stopPropagation()
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
                justify-left
                gap-2
                '>
                <RiDeleteBin7Line/>
                Delete
                </button>
                :
                <button
                onClick={(e) => {
                    e.stopPropagation()
                    followUser(created_by || "")
                }}
                className='
                text-[.9rem] text-neutral-700
                hover:bg-violet-100
                px-2
                py-1
                text-left
                w-full
                flex
                flex-row
                items-center
                justify-left
                gap-2
                '>
                {profile?.followed?.includes(created_by) ? <> <RiUserUnfollowLine/> Unfollow </> : <> <RiUserAddLine/>Fallow </>}
                {`${creator?.display_name}`}
                </button>
                }

                    <button
                    onClick={(e) => {
                        e.stopPropagation()
                        bookmarkPost(profile,ID)
                    }}
                    className='
                    text-[.9rem] text-neutral-700
                    hover:bg-violet-100
                    px-2
                    py-1
                    text-left
                    w-full
                    flex
                    flex-row
                    items-center
                    justify-left
                    gap-2
                    '>
                      {
                      profile?.bookmarked?.includes(ID) ?

                        <><RiBookmarkFill/> Remove Bookmark </>

                        :

                        <><RiBookmarkLine/> Add Bookmark </>

                      }
                    </button>
            
            </>
            :
            <CgSpinner
            className='
            text-[1.5rem]
            text-neutral-700
            animate-spin
            m-4
            '/>
            }
        </div>

    </div>
  )
}

export default VeriticalActionBar