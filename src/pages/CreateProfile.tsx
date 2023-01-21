import React , {useState} from 'react'
import { TypographyLG , TypographySM } from '../components/typographies'
import { ImageInput , Input } from '../components/inputs'
import { FullWidthButton } from '../components/buttons'
import { checkForUserName, createProfile } from '../features/auth/utils'
import { useSelector } from 'react-redux'
import { rootType } from '../redux/store'
import CheckBox from '../components/inputs/CheckBox'
import { RiChatSmile2Fill , RiArrowLeftLine } from "react-icons/ri"

const data = [
  {
    category : "Knowledge",
    values : [
      "Online Learning",
      "Language Learning",
      "Books",
      "Reading",
      "Writing",
      "Articles",
      "Teaching",
      "Math",
      "Science",
    ]
  },
  {
    category : "Games & Music",
    values : [
      "Video Games",
      "Music",
      "E-Sports",
      "RPG Games",
      "Shooter Games",
      "Farming Games",

    ]
  },
  {
    category : "Tech",
    values : [
      "Web Development",
      "Game Development",
      "Mobile Application Development",
      "Coding",
      "Artificial Intelligence",
      "Machine Learning",
      "Bitcoin",
      "Blockchain",
      "Cybersecurity",
      "Robotics & Automatics"
    ]
  },
  {
    category : "Art & Culture",
    values : [
      "Painting",
      "Sculpture",
      "Photography",
      "Drawing",
      "Films",
      "Animations",
      "Anime",
      "Pixel Art",
      "Architecture",
      "Food",
      "Cooking",
      "History"
    ]
  },
  {
    category : "Vehicles",
    values : [
      "Cars",
      "Car Races",
      "Classic Cars",
      "Tracks",
      "Electronic Vehicles",
      "Car Repairing",
    ]
  },
  {
    category : "Sport & Health",
    values : [
      "Meditation",
      "Travel",
      "Football / Soccer",
      "Baseball",
      "Basketball",
      "Volleyball",
      "Tennis",
      "Golf",
    ]
  },
]

const CreateProfile : React.FC = () => {
  const { profileURL , name : NAME , email } = useSelector((state : rootType) => state.DefaultProfileSlice)

  const [imageURL , setImageURL] = useState<string | null>(profileURL || "")
  const [image , setImage] = useState<string | ArrayBuffer | File | null>("")
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
      min-h-fit
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
            await createProfile(name , image , imageURL , username , interests)
            setLoading(false)
          }
          catch(err){
            setLoading(false)
          }
        }}
        className='
        flex flex-col justify-center items-start
        w-[min(80%_,_20rem)]
        '>
          {
            !show &&
            <button
            onClick={() => {
              setShow(true)
            }}
            type='button'
            className='
            text-[2rem]
            rounded-full
            p-[.5rem]
            hover:bg-violet-50
            '>
              <RiArrowLeftLine/>
            </button>
          }

        { 
          show &&
          <>
          <TypographyLG
          text="Your Profile"
          sx="mb-[.5rem] mx-auto"
          />

          <TypographySM
          text="Complete your profile and continue!"
          sx="mb-[1rem] mx-auto"
          />

          <ImageInput
          defaultURL={imageURL}
          setDefaultURL={setImageURL}
          value={image}
          setValue={setImage}
          sx='mb-[.5rem] mx-auto'
          />

          <span
          className='
          text-neutral-700
          font-medium
          '>
            NAME
          </span>

          <Input
          sx="my-[.5rem]"
          placeholder="unknown..."
          value={name}
          setValue={setName}
          validationFunc={(value : string) => {
              if(value?.length > 16){
                return false
              }
              return true
          }}
          />

          <span
          className='
          text-neutral-700
          font-medium
          '>
            USERNAME
          </span>

          <Input
          sx="my-[.5rem] mb-[1rem]"
          placeholder="user999.."
          value={username}
          setValue={setUsername}
          validationFunc={async (value : string) => {
            let bool = await checkForUserName(value)
            return bool
          }}
          />

          <FullWidthButton
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
        }

        { !show &&
          <>
            <TypographyLG
            text="Your Interests"
            sx="mb-[.5rem] mx-auto"
            />

            <TypographySM
            text="Select your interested topics for a better user experience (optional)"
            sx="mb-[.25rem] mx-auto"
            />

          {
          data?.map((item , idx) => {
            return(
              <>
                <span
                key={idx.toString() + item}
                className='
                mt-[1rem]
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