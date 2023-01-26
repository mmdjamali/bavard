import supabase from "../../libs/supabase"
import store from "../../redux/store"
import { setProfile } from "../../redux/AuthSlice"
import React from "react"

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
    email: string ,
    password: string
  ) => {
    if(!email || !password){
      throw "All fields are required"
    }
     const { data , error } = await supabase.auth.signUp({
      email,
      password
    })

    if(error){
      throw error.message
    }
}

export const createProfile  = async ( 
  name : string, 
  pp : any ,// string | ArrayBuffer | File | null,
  imageURL : string | null,
  username : string,
  interests : string[] | [],
  banner : any
  ) => {
  try{
    const {data , error} = await supabase.auth.getUser()
    let profilePic :any;
    let bannerPic :any;

    // console.log(data,error)
    if(error) return

    if(!imageURL && pp){
        profilePic = await supabase
        .storage
        .from("profiles")
        .upload(
          `public/${data.user.id}.png`,
          pp,{
            cacheControl : "60"
          }
        )
    }
    
    if(profilePic?.error) {
      return
    }

    if(banner){
      bannerPic = await supabase
        .storage
        .from("profiles")
        .upload(
          `public/${data.user.id + "Banner"}.png`,
          banner,{
            cacheControl : "60"
          }
        )
    }

    if(bannerPic?.error){
      return
    }

    const profile = await supabase
      .from("profiles")
      .insert({
        banner_picture : bannerPic?.data?.path || "",
        profile_picture : imageURL ? imageURL : profilePic ? profilePic.data?.path : "",
        uid : data?.user?.id,
        display_name : name || "unknown",
        username : username ? "@" + username : await createRandomUser(),
        email : data?.user?.email,
        interests
      })
      .select()
      .single()

    store.dispatch(setProfile(profile?.data))
  }
  catch(err){
    // console.log(err)
    throw err
  }
}

export const updateProfile = async (
  NAME : string | null,
  USERNAME : string | null,
  BIO : string | null,
  INTERESTS : string[] | [] | null,
  IMAGE : any,
  IMAGE_URL : string,
  PROFILE : any,
  BANNER : any,
  BANNER_URL : string
) => {
  if(!await checkForUserName(USERNAME || "") && USERNAME !== PROFILE?.username.replace("@","")) return

  if(IMAGE){
    const remove = await supabase
      .storage
      .from("profiles")
      .remove([PROFILE?.profile_picture])

    // console.log(remove)

    const insert = await supabase
      .storage
      .from("profiles")
      .upload(
        `public/${PROFILE?.uid}.png`,
        IMAGE,{
          cacheControl : "60"
        }
      )
      
    // console.log(insert)
    if(insert.error){
      
      return
    }
    
  }

  if(BANNER){
    const remove = await supabase
      .storage
      .from("profiles")
      .remove([PROFILE?.banner_picture])

    // console.log(remove)

    const insert = await supabase
      .storage
      .from("profiles")
      .upload(
        `public/${PROFILE?.uid}Banner.png`,
        BANNER,{
          cacheControl : "60"
        }
      )
      
    // console.log(insert)
    if(insert.error){
      
      return
    }
  }

  const updateProfile = await supabase
      .from("profiles")
      .update([{
          bio : BIO?.replaceAll("\n" , " ") || null,
          display_name : NAME || "unknown",
          username : "@" + USERNAME || await createRandomUser(),
          interests : INTERESTS,
          profile_picture : IMAGE ? `public/${PROFILE?.uid}.png` : IMAGE_URL,
          banner_picture : BANNER ? `public/${PROFILE?.uid}Banner.png` : BANNER_URL,
        }])
        .eq("uid",PROFILE?.uid);

      // console.log(updateProfile)

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
      // console.log(error)
      return
    }
      
    // console.log(data)
    return data
  }

  catch(err){
    // console.log(err)
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
  username : string,
) => {
  if(!/^[a-zA-Z][a-zA-Z0-9_#]*$/i.test(username)) return false

  if(username?.length < 3 || username?.length > 16) return false

  const { data , error } = await supabase
            .from("profiles")
            .select("username")
            .eq("username","@" + username)

            if(error) return false

            if(data.length === 0) return true
            
            return false
}