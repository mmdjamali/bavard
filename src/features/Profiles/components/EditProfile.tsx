import React , { useState , useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { rootType } from '../../../redux/store'
import { useGetUserProfile } from '../../auth/hooks'
import { ImageInput, LimitedInput, TextArea } from '../../../components/inputs'
import { getFile } from '../../storage/utils'
import { RiCloseFill } from 'react-icons/ri'
import { activateProfileEditor } from '../../../redux/PopupSlice'
import { Input } from "../../../components/inputs"
import { checkForUserName, updateProfile } from '../../auth/utils'
import { data } from '../../../data/interests'
import CheckBox from '../../../components/inputs/CheckBox'
import { FullWidthButton } from '../../../components/buttons'
import BannerInput from '../../../components/inputs/BannerInput'

const EditProfile = () => {
  const profileEditor = useSelector((state : rootType) => state.PopupSlice.profileEditor)
  const user = useSelector((state : rootType) => state.AuthSlice.user)
  const dispatch = useDispatch()
  const [profile , pending] : any= useGetUserProfile(user || "")

  const [name , setName] = useState<string>(profile?.display_name || "")
  const [username , setUserName] = useState<string>(profile?.username || "")
  const [bio , setBio] = useState<string>(profile?.bio || "")
  const [profilePicture , setProfilePicture] = useState<string | ArrayBuffer | File | null>(null)
  const [pictureURL , setPictureURL] = useState<string | null>(profile?.profile_picture || "")
  const [banner , setBanner] = useState<string | ArrayBuffer | File | null>(null)
  const [bannerURL , setBannerURL] = useState<string | null>(profile?.banner_picture || "")
  const [interests , setInterests] = useState<string[]>(profile?.interests || [])
  
  const [loading , setLoading] = useState<boolean>(false)
  
  useEffect(() => {
    setName(profile?.display_name || "")
    setUserName(profile?.username.replace("@","") || "")
    setBio(profile?.bio || "")
    setPictureURL(profile?.profile_picture || "")
    setBannerURL(profile?.banner_picture || "")
    setInterests(profile?.interests || [])
  }, [profile , profileEditor])
  
  if(!profileEditor) return <></>

  return (
    <div
    className={`
    top-0
    fixed
    w-full
    h-fit
    min-h-full
    max-h-full
    bg-black/50
    z-50
    p-4
    flex
    flex-col
    items-center
    overflow-y-auto
    `}>

        <div
        className='
        w-[min(450px,100%)]
        bg-white
        rounded-md
        relative
        flex
        flex-col
        justify-center
        my-auto
        '>
            <button
            onClick={() => {
              dispatch(activateProfileEditor(false))
            }}
            type='button'
            className='
            text-[1.25rem]
            p-1
            w-fit
            ml-auto
            text-violet-dark
            hover:bg-neutral-200
            rounded-full
            '>
              <RiCloseFill/>
            </button>

            <BannerInput
            value={banner}
            setValue={setBanner}
            setDefaultURL={setBannerURL}
            defaultURL={bannerURL}
            />

            <ImageInput
            defaultURL={pictureURL}
            setDefaultURL={setPictureURL}
            value={profilePicture}
            setValue={setProfilePicture}
            imageSX='
            w-[min(90px,20vw)]
            mt-[max(-45px,-10vw)]
            ml-[.5rem]
            xs:ml-[2rem]
            aspect-[1/1]
            '
            />

            <Input
             setValue={setName}
             value={name}
             title="Name"
             validationFunc={(data , setErr) => {
              if(data?.length > 16){
                setErr("Name is too long")
                return false
              }
              setErr("")
              return true
             }}
             sx="
             mt-[1rem]
             xs:mx-[2rem] 
             mx-[.5rem] 
             w-auto
             "
            />

            <Input
             setValue={setUserName}
             value={username}
             title="User name"
             validationFunc={async (data , setErr) => {
              if(data === profile?.username?.replace("@","")){
                setErr("")
                return true
              }

              if(!data){
                setErr("")
                return false
              }

              if(data?.length < 3) {
                setErr("Username is short")
                return false
              }
              
              let bool = await checkForUserName(data)
              if(!bool){
                setErr("Username already exists")
                return false
              }
              setErr("")
              return true
             }}
             sx="
             mt-[1rem]
             xs:mx-[2rem] 
             mx-[.5rem] 
             w-auto
             "
            />

            <LimitedInput
            value={bio}
            setValue={setBio}
            title="Bio"
            sx="
            mt-[1rem]
            xs:mx-[2rem] 
            mx-[.5rem] 
            w-auto
            "
            limit={70}
            />

            {/* <div
            className='
            xs:mx-[2rem]
            mx-[.5rem]
            '>
            {
              data?.map((item , idx) => {
                return(
                  <div
                  className={`
                  mt-[1rem]
                  `}>
                    <span
                    key={idx.toString() + item}
                    className='
                    mb-[.5rem]
                    text-[1rem]
                    font-medium
                    text-neutral-700
                    '>
                      {item?.category}
                    </span>

                    <div
                    key={idx}
                    className='
                    flex 
                    flex-wrap
                    gap-x-3
                    gap-y-4
                    '>
                      {
                        item?.values?.map((item , idx) => {
                          return(
                            <CheckBox
                            checked={interests?.includes(item)}
                            key={idx.toString() + item}
                            value={item}
                            onChange={(e) => {
                              e.target.checked ?
                              setInterests(prev => [...prev,item])
                              :
                              setInterests(prev => {
                                let array = [...prev];
                                array.splice(array.findIndex((v) => v === item),1)
                                return [...array]
                              })
                            }}
                            />
                          )
                        })
                      }
                    </div>
                  </div>
                  )
                })
              }
            </div> */}

            <FullWidthButton
            loading={loading}
            onClick={async () => {
              if(name?.length > 16) return
              if(!await checkForUserName(username) && username !== profile?.username.replace("@",'')) return
              if(bio?.length > 80) return

              try{
                setLoading(true)
                await updateProfile(
                  name,
                  username,
                  bio,
                  interests,
                  profilePicture,
                  pictureURL || "",
                  profile,
                  banner,
                  bannerURL || ""
                )
                setLoading(false)
                window.location.reload()
              }
              catch(err){
                setLoading(false)
              }
            }}
            sx="
            mt-[1.5rem]
            xs:mx-[2rem]
            xs:ml-[auto]
            xs:mr-[2rem]
            mr-[.5rem]
            ml-[auto]
            w-[min(90%,10rem)]
            mb-4
            "
            title="Save"
            />

        </div>

    </div>
  )
}

export default EditProfile