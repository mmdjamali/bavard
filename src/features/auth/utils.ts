import supabase from "../../libs/supabase"
import store from "../../redux/store"
import { setProfile } from "../../redux/AuthSlice"

type returnString = () => Promise<string>

type createProfile = (
  name : string,
  profilepic : string | ArrayBuffer | null
) => void

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

    const profile = await supabase
      .from("profiles")
      .insert({
        profile_picture : profilepic,
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
