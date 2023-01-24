import React from 'react'
import { getUserProfile } from '../../auth/utils'
import { useGetUserProfile } from '../../auth/hooks'
import { getFile } from '../../storage/utils'
import { RiUserLine } from 'react-icons/ri'
import { Link } from 'react-router-dom'
import FollowButtonMobile from './FollowButtonMobile'
import FollowButton from './FollowButton'

type props = {
    userID : string
}

const ProfileCardMobile : React.FC<props> = ({
    userID
}) => {
  const [profile , pending , err] : any = useGetUserProfile(userID || "");
  const pp = getFile("profiles" ,profile?.profile_picture || "")
  return (
    <div
    className='
    w-full
    flex
    items-center
    cursor-pointer
    py-2
    border-t-[1px]
    border-color
    transition-all
    '>
          {    
            pp ? 
            <img 
            loading='lazy'
            src={`${pp ? pp : ""}`}
            draggable="false"
            className="
            z-[9] 
            relative
            rounded-full
            w-[40px]
            h-[40px]
            min-w-[40px]
            min-h-[40px]
            xs:w-[50px] 
            xs:h-[50px] 
            xs:min-w-[50px] 
            xs:min-h-[50px] 
            object-cover
            mx-2
            xs:mx-4
            cursor-pointer
            "
            /> 
            :
            <div
            className='
            w-[40px]
            h-[40px]
            min-w-[40px]
            min-h-[40px]
            xs:w-[50px] 
            xs:h-[50px] 
            xs:min-w-[50px] 
            xs:min-h-[50px] 
            flex 
            z-[9]
            items-center 
            justify-center
            bg-violet-200 
            rounded-full
            text-violet-dark 
            text-[1.25rem]
            xs:text-[1.5rem]
            mx-2
            xs:mx-4
            cursor-pointer
            '>
                <RiUserLine/>
            </div>
          }

          <div
          className='
          flex
          flex-col
          text-ellipsis 
          overflow-hidden
          '>
            <Link 
            to={"/profile/" + profile?.username}
            className='
            hover:underline
            text-neutral-700 
            text-[.9rem]
            xs:text-[1rem]
            text-ellipsis 
            overflow-hidden
            whitespace-nowrap
            w-full
            '
            >
                {profile?.display_name || ""}
            </Link>
            <span
            className='
            text-neutral-500 
            text-[.8rem]
            xs:text-[.9rem]
            text-ellipsis overflow-hidden
            whitespace-nowrap
            w-full
            '>
                {profile?.username || ""}
            </span>
          </div>

          <div
          className='
          ml-auto
          mr-2
          xs:mr-4
          '>

          <FollowButtonMobile
          userID={profile?.uid}
          />

          </div>

    </div>
  )
}

export default ProfileCardMobile