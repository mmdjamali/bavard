import React , {useState} from 'react'
import { TypographyLG , TypographySM } from '../components/typographies'
import { ImageInput , Input } from '../components/inputs'
import { FullWidthButton } from '../components/buttons'
import { checkForUserName, createProfile, logout } from '../features/auth/utils'
import { useSelector } from 'react-redux'
import { rootType } from '../redux/store'
import CheckBox from '../components/inputs/CheckBox'
import { RiChatSmile2Fill , RiArrowLeftLine } from "react-icons/ri"
import { data } from '../data/interests'
import BannerInput from '../components/inputs/BannerInput'

const CreateProfile : React.FC = () => {
  const { profileURL , name : NAME , email } = useSelector((state : rootType) => state.DefaultProfileSlice)
  
  // for users who logged in with a provider
  const [imageURL , setImageURL] = useState<string | null>(profileURL || "")
  
  const [image , setImage] = useState<string | ArrayBuffer | File | null>("")
  const [banner , setBanner] = useState<string | ArrayBuffer | File | null>("")
  const [name , setName] = useState<string>(NAME || "")
  const [username , setUsername] = useState<string>(email || "")
  const [loading , setLoading] = useState<boolean>(false)
  const [interests , setInterests] = useState<string[] | []>([])
  const [show,setShow] = useState<boolean>(true)
  
  return (
    <div
    className='
    flex flex-row w-full relative overflow-auto
    '>

      <div
      className='
      min-h-screen
      md:w-[40%]
      lg:w-[50%] bg-violet-500
      hidden md:block
      sticky
      top-0
      left-0
      '>

      </div>

      <div 
      className='
      flex flex-col 
      justify-center 
      items-center
      w-full md:w-[60%]
      lg:w-[50%]
      pb-12
      min-h-screen
      '>
        {/* TODO: in future if steps become more than
        two add progressbar. */}
        {/* <div
        className='
        flex 
        items-center 
        justify-center
        my-[1rem]
        '>

          { show ?
          <>
            <span
            className='
            flex
            items-center
            justify-center
            bg-violet-500
            text-white
            w-[30px]
            h-[30px]
            rounded-md
            '>
              1
            </span>

            <span
            className='
            flex
            w-[25px]
            h-[3px]
            bg-violet-500
            '
            />

            <span
            className='
            flex
            w-[25px]
            h-[3px]
            bg-violet-200
            '
            />

            <span
            className='
            flex
            items-center
            justify-center
            bg-violet-200
            text-violet-dark
            w-[30px]
            h-[30px]
            rounded-md
            '>
              2
            </span>
          </>
          :
          <>
            <span
            className='
            flex
            items-center
            justify-center
            bg-violet-500
            text-white
            w-[30px]
            h-[30px]
            rounded-md
            '>
              1
            </span>

            <span
            className='
            flex
            w-[50px]
            h-[3px]
            bg-violet-500
            '
            />

            <span
            className='
            flex
            items-center
            justify-center
            bg-violet-500
            text-white
            w-[30px]
            h-[30px]
            rounded-md
            '>
              2
            </span>
          </>
        }

        </div> */}

        <form
        onSubmit={async (e) => {
          e.preventDefault()
          try{
            setLoading(true)
            await createProfile(name , image , imageURL , username , interests , banner)
            setLoading(false)
          }
          catch(err){
            setLoading(false)
          }
        }}
        className='
        flex flex-col justify-center
        w-[min(85%_,_20rem)]
        '>

          { 
            show ?
            <>
              <div
              className='
              flex
              gap-2
              items-center
              mb-[1rem]
              '>

              <button
                onClick={() => {
                  logout()
                }}
                type='button'
                className='
                text-[1.5rem]
                rounded-full
                p-2
                hover:bg-violet-50
                w-fit
                '>
                  <RiArrowLeftLine/>
                </button>

                <TypographyLG
                text="Your Profile"
                sx="
                text-left
                w-fit
                "
                />

              </div>

              <BannerInput
              value={banner}
              setValue={setBanner}
              setDefaultURL={() => {}}
              defaultURL={null}
              />

              <ImageInput
              defaultURL={imageURL}
              setDefaultURL={setImageURL}
              value={image}
              setValue={setImage}
              imageSX='
              w-[min(90px,20vw)]
              mt-[max(-45px,-10vw)]
              ml-[1rem]
              aspect-[1/1]
              '
              />

              <Input
              sx="mt-[1rem]"
              title="Name"
              value={name}
              setValue={setName}
              validationFunc={(data , setErr) => {
                  if(data?.length > 16){
                    setErr("Name is too long")
                    return false
                  }
                  setErr("")
                  return true
               }}
              />

              <Input
              sx="mt-[1rem]"
              title="User name"
              value={username}
              setValue={setUsername}
              validationFunc={async (value : string , setErr) => {
                if(!value){
                  setErr("")
                  return false
                }
  
                if(value?.length < 3) {
                  setErr("Username is short")
                  return false
                }
                
                let bool = await checkForUserName(value)
                if(!bool){
                  setErr("Username already exists")
                  return false
                }
                setErr("")
                return true
               }}
              />

              <FullWidthButton
              sx="mt-[1.25rem]"
              title='Continue'
              loading={loading}
              TYPE={"button"}
              onClick={async () => {
                try{

                  setLoading(true)

                  if(username && !await checkForUserName(username)){
                    setLoading(false)
                    return
                  }

                  if(name && name?.length > 16){
                    setLoading(false)
                    return
                  }

                  setShow(false)
                  setLoading(false)

                }
                catch(err){
                  setLoading(false)
                }
              }}
              />
            </>
            :
            <>
              <div
              className='
              flex
              items-center
              mt-[2rem]
              gap-2
              '>
                <button
                onClick={() => {
                  setShow(true)
                }}
                type='button'
                className='
                text-[1.5rem]
                rounded-full
                p-[.5rem]
                hover:bg-violet-50
                w-fit
                '>
                  <RiArrowLeftLine/>
                </button>

                <TypographyLG
                text="Your Interests"
                sx="w-fit"
                />
              </div>
              
              {
              data?.map((item , idx) => {
                return(
                  <>
                    <span
                    key={idx.toString() + item}
                    className='
                    mt-[1.5rem]
                    mb-[.5rem]
                    text-[1.25rem]
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
                  </>
                  )
                })
              }
              <FullWidthButton
              title='Continue'
              loading={loading}
              sx="mt-[1.5rem]"/>
            </>
          }

        </form>

      </div>

    </div>
  )
}

export default CreateProfile