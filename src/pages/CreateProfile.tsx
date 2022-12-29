import React , {useState} from 'react'
import { TypographyLG , TypographySM } from '../components/typographies'
import { ImageInput , Input } from '../components/inputs'
import { FullWidthButton } from '../components/buttons'
import { createProfile } from '../features/auth/utils'

const CreateProfile : React.FC = () => {
  const [image , setImage] = useState<string | ArrayBuffer | File | null>("")
  const [name , setName] = useState<string>("")
  const [loading , setLoading] = useState<boolean>(false)
  
  return (
    <div
    className='flex flex-row w-full'>

      <div
      className='
      w-[40%] h-screen bg-violet-500
      hidden md:block
      '>

      </div>

      <div 
      className='
      flex w-[100%] h-screen flex-col justify-center 
      items-center 
      '>

        <form
        onSubmit={async (e) => {
          e.preventDefault()
          try{
            setLoading(true)
            await createProfile(name , image)
            setLoading(false)
          }
          catch(err){
            setLoading(false)
          }
        }}
        className='
        flex flex-col justify-center items-center
        w-[min(80%_,_20rem)]
        '>

          <TypographySM
          text="Complete your profile and continue!"
          sx="mb-[1.5rem]"
          />

          <ImageInput
          value={image}
          setValue={setImage}/>

          <Input
          sx="my-[1rem]"
          placholder="Name"
          value={name}
          setValue={setName}/>

          <FullWidthButton
          title='Continue'
          loading={loading}
          />

        </form>

      </div>

    </div>
  )
}

export default CreateProfile