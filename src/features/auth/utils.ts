import supabase from "../../libs/supabase"
import store from "../../redux/store"
import { setProfile } from "../../redux/AuthSlice"

type returnString = () => Promise<string>

type createProfile = (
  name : string,
  profilepic : any // string | ArrayBuffer | File | null
) => void

export const logout = () => {
  supabase.auth.signOut()
}

export const createRandomUser : returnString =  async () => {
    let username : string | Promise<string> = "@user" + Math.round(Math.random() * 100000000)
    const {data , error} = await supabase
        .from("profiles")
        .select()
        .eq("username" , username)

    if(data){
        createRandomUser()
        .then(d => username = d)
    }
    
    return username
}

export const SignUpWithEmail = async (
    e: React.FormEvent<HTMLFormElement>,
    email: string ,
    password: string
  ) => {
    e.preventDefault()
     const { data , error } = await supabase.auth.signUp({
      email,
      password
    })
}

export const createProfile : createProfile = async ( name , profilepic) => {
  try{
    const {data , error} = await supabase.auth.getUser()
    if(error) return

    const pic = await supabase
        .storage
        .from("profiles")
        .upload(
          `public/${data.user.id}.png`,
           profilepic
        )


    const profile = await supabase
      .from("profiles")
      .insert({
        profile_picture : pic.data?.path,
        uid:data?.user?.id,
        display_name : name || "unknown",
        username : await createRandomUser(),
        email : data?.user?.email
      })
      .select()

    store.dispatch(setProfile(profile?.data))
  }
  catch(err){
    throw err
  }
}

export const getUserProfile = async (
  uid : string
) => {
  try{
    const {data , error} = await supabase
      .from("profiles")
      .select()
      .eq("uid" , uid)
      .single()
    
    if(error){
      console.log(error)
      return
    }
      
    console.log(data)
    return data
  }

  catch(err){
    console.log(err)
  }
}
