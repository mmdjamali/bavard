import React , { useEffect, useRef, useState } from 'react'
import ProfileCard from '../features/Profiles/components/ProfileCard'
import { useGetUsersWithSameInterests } from '../features/Profiles/Hooks'
import { useSelector } from 'react-redux'
import { rootType } from '../redux/store'
import Loader from '../components/Loader'
import { useNavigate } from 'react-router-dom'

const  WhoToFollow = () => {
  const { user , profile } : any= useSelector((state : rootType) => state.AuthSlice);
  const navigate = useNavigate()
  const container = useRef<HTMLDivElement | null>(null)
  
  const [max , setMax] = useState<number>(10)
  const [distance , setDistance] = useState<number>(0)
  const [users , pending , err , hasMore] : any= useGetUsersWithSameInterests(max)

  useEffect(() => {
    setDistance((((container?.current?.offsetHeight || 0) + 0) - window.innerHeight) * -1)
  },[container])

  if(!user || !profile) return <></>

  return (
    <>
    <div
    ref={container}
    className='
    hidden
    sticky
    w-[350px]
    min-h-screen
    h-fit
    py-[1rem]
    lg:flex
    flex-col
    items-center
    '
    style={{
        "top" :  distance > 0 ? 0 : distance + "px"
    }}
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
                users ?
                users?.map((item : {uid : string} , idx : number) => {
                    return(
                        <ProfileCard
                        userID={item?.uid}
                        />
                    )
                })
                :
                <></>
                }
            </div>


            {
                pending &&
                <Loader
                sx='h-fit'
                />
            }

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

        </div>

        <div
        className='
        my-1
        flex
        flex-wrap
        gap-2
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
    </>
  )
}

export default WhoToFollow