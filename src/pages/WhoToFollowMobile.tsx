import React , { useEffect, useRef, useState } from 'react'
import ProfileCard from '../features/Profiles/components/ProfileCard'
import { useGetUsersWithSameInterests } from '../features/Profiles/Hooks'
import { useSelector } from 'react-redux'
import { rootType } from '../redux/store'
import Loader from '../components/Loader'
import { Link, useNavigate } from 'react-router-dom'
import ProfileCardMobile from '../features/Profiles/components/ProfileCardMobile'

const  WhoToFollowMobile = () => {
  const { user , profile } : any= useSelector((state : rootType) => state.AuthSlice);
  const navigate = useNavigate()
  const container = useRef<HTMLDivElement | null>(null)
  
  const [max , setMax] = useState<number>(10)
  const [users , pending , err , hasMore] : any= useGetUsersWithSameInterests(max)


  if(!user || !profile) return <></>

  return (
    <div
    ref={container}
    className='
    w-full
    h-fit
    py-[1rem]
    flex
    flex-col
    items-center
    '
    >

        <div
        className='
        rounded-xl
        flex
        flex-col
        w-[90%]
        h-fit
        bg-violet-50
        overflow-hidden
        '>
  
            {
            profile?.interests.length === 0 ?
            <div
            className='
            py-2
            px-4
            '>
                <p
                className='
                text-neutral-600
                text-[.9rem]
                '>
                    Add your interests to your 
                    <Link
                    to="/profile"
                    className='
                    text-violet-500
                    hover:underline
                    mx-1
                    '>Profile</Link>
                    to find people with same interests
                </p>
            </div>
            :
            <>
                <span
                className='
                px-4
                py-2
                text-[1.15rem]
                font-semibold
                text-neutral-700
                '>
                    Who to follow
                </span>

                <div>
                    { 
                    users?.length !== 0 ?
                    users?.map((item : {uid : string} , idx : number) => {
                        return(
                            <ProfileCardMobile
                            userID={item?.uid}
                            key={idx}
                            />
                        )
                    })
                    :
                    <div
                    className='
                    border-t-[1px]
                    border-color
                    py-2
                    px-4
                    '>
                        <p
                        className='
                        text-neutral-600
                        text-[.9rem]
                        '>
                            No users to be found
                        </p>
                    </div>
                    }
                </div>


                {
                    pending &&
                    <Loader
                    sx='h-fit my-4'
                    />
                }

                { users?.length !== 0 && hasMore && 
                <span
                onClick={() => {
                    if(pending) return

                    if(!hasMore){
                        navigate("/explore")
                        return
                    }

                    setMax(prev => prev + 10)
                }}
                className='
                hover:bg-violet-100
                px-4
                py-2
                text-[.9rem]
                text-violet-500
                border-t-[1px]
                border-color
                cursor-pointer
                '>
                    Show more
                </span>
                }
            </>
            }

        </div>

        <div
        className='
        my-1
        flex
        flex-wrap
        gap-2
        justify-center
        '>

            <a
            href="https://github.com/1stMmD/bavard.git"
            className='
            text-[.8rem]
            text-neutral-500
            hover:underline
            cursor-pointer
            '>
                Star us on GitHub.
            </a>

            <a
            href="https://github.com/1stMmD/bavard.git"
            className='
            text-[.8rem]
            text-neutral-500
            hover:underline
            cursor-pointer
            '>
                Contribute with us.
            </a>

        </div>
        
        <span
        className='
        px-4
        text-[.8rem]
        text-neutral-500
        '>
            © 2023 
            <a 
            href="https://www.linkedin.com/in/mmdjamali/"
            className='
            hover:underline
            ml-1
            '
            >
                Mohammad Jamali
            </a>
        </span>

    </div>
  )
}

export default WhoToFollowMobile