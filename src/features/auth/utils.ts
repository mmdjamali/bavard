import supabase from "../../libs/supabase"
import store from "../../redux/store"
import { setProfile } from "../../redux/AuthSlice"

type returnString = () => Promise<string>

export const logout = () => {
  supabase.auth.signOut()
}

export const createRandomUser : returnString =  async () => {
    let username : string | Promise<string> = "@user" + Math.round(Math.random() * 1000000000)
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

export const createProfile  = async ( 
  name : string, 
  profilePic : any ,// string | ArrayBuffer | File | null,
  imageURL : string | null,
  username : string,
  interests : string[] | []
  ) => {
  try{
    const {data , error} = await supabase.auth.getUser()
    let pic :any;
    if(error) return

      if(!imageURL){
          pic = await supabase
          .storage
          .from("profiles")
          .upload(
            `public/${data.user.id}.png`,
            profilePic
          )
      }

    if(pic?.error) return


    const profile = await supabase
      .from("profiles")
      .insert({
        profile_picture : imageURL ? imageURL : pic.data?.path,
        uid:data?.user?.id,
        display_name : name || "unknown",
        username : username ? "@" + username : await createRandomUser(),
        email : data?.user?.email,
        interests
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

export const followUser = async (uid : string) => {
  let { user } = store.getState().AuthSlice;
  const profile = await supabase
        .from("profiles")
        .select()
        .eq("uid" , user)
        .single()
        
  if(profile?.data?.followed){

    if(profile?.data?.followed?.includes(uid)){

      let array = [...profile?.data?.followed]
      let idx = profile?.data?.followed.findIndex((data : string) => data === uid);
      array.splice(idx , 1)

      const { error } = await supabase
        .from("profiles")
        .update({"followed" : array})
        .eq("uid" , user)

      return
    }

    const { error } = await supabase
        .from("profiles")
        .update({"followed" : [...profile?.data?.followed , uid]})
        .eq("uid" , user)

    return
  }

  const { error } = await supabase
        .from("profiles")
        .update({"followed" : [uid]})
        .eq("uid" , user)

}

export const likePost = async (pid : string) => {
  let { user } = store.getState().AuthSlice;
  const profile = await supabase
        .from("profiles")
        .select()
        .eq("uid" , user)
        .single()

  if(profile?.data?.bookmarks){

    if(profile?.data?.bookmarks.includes(pid)){
      let idx = profile?.data?.bookmarks.findIndex((data : string) => data === pid);
      const { error } = await supabase
        .from("profiles")
        .update({"bookmarks" : [...profile?.data?.bookmarks].splice(idx , 1)})
        .eq("uid" , user)
        
      return
    }
    const { error } = await supabase
        .from("profiles")
        .update({"bookmarks" : [...profile?.data?.bookmarks , pid]})
        .eq("uid" , user)

    return
  }

  const { error } = await supabase
        .from("profiles")
        .update({"followed" : [pid]})
        .eq("uid" , user)

}

export const signInWithLinkedin = async () => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider : "linkedin"
  })
}

export const checkForUserName = async (
  username : string
) => {

  if(username?.length < 3 || username?.length > 16) return false

  const { data , error } = await supabase
            .from("profiles")
            .select("username")
            .eq("username","@" + username)

            if(error) return false

            if(data.length === 0) return true

            return false
}