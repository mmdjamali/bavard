import { useState , useEffect, useLayoutEffect } from "react"
import store from "../../redux/store";
import { setUser , setProfile , setPending , setError } from "../../redux/AuthSlice";
import supabase from "../../libs/supabase";
import { AuthChangeEvent , Session} from "@supabase/supabase-js"
import { useNavigate } from "react-router-dom";
import { getFile } from "../storage/utils";
import { setName , setProfileURL , setEmail } from "../../redux/DefaultProfileSlice"; 
export const useAuthStateChange = () => {
    const navigate = useNavigate()

    useLayoutEffect(() => {

    const watch = supabase.auth.onAuthStateChange(async (data , session) => {
        const dispatch = store.dispatch
        try{
            dispatch(setPending(true))

            if(!session?.user){
                dispatch(setPending(false))
                dispatch(setUser(null))
                dispatch(setProfile(null))
                navigate("/")
                return
            }

            const profile = await supabase
                    .from("profiles")
                    .select()
                    .eq("uid",session?.user?.id) 
                    .single()

            if(!profile?.data){
                dispatch(setPending(false))
                dispatch(setUser(session.user.id))
                dispatch(setProfile(null))
                navigate("/create-profile")
                return
            }

            dispatch(setPending(false))
            dispatch(setUser(session.user.id))
            dispatch(setProfile(profile.data))
            navigate("/home")
        }
        catch(err){
            dispatch(setPending(false))
        }
    })

    return () => watch?.data?.subscription?.unsubscribe()

    },[])
}

export const useCheckForUser = () => {
    const navigate = useNavigate()
    const dispatch = store.dispatch

    useEffect(() => {

        //check for user login history
        const func = async () => {
        
        try{
            dispatch(setPending(true))

            const data : {error : {status : number}} | any = await supabase.auth.getUser()
            
            if(data.error && data.error.status !== 401){
                dispatch(setPending(false))
                dispatch(setUser(null))
                dispatch(setProfile(null))
                return
            }

            if(!data.data.user){
                dispatch(setPending(false))
                dispatch(setUser(null))
                dispatch(setProfile(null))
                dispatch(setError(null))
                return
            }

            const profile = await supabase
                    .from("profiles")
                    .select()
                    .eq("uid",data?.data?.user?.id) 
                    .single()

            if(profile.error && profile.error.code !== "PGRST116"){
                console.log(profile.error)
                return
            }

            if(!profile.data){
                let user_metadata = data?.data?.user?.user_metadata;
                
                if(Object.keys(user_metadata).length !== 0){
                    let email = user_metadata.email;
                    let idx = email.indexOf("@");
                    email = email.slice(0,idx)

                    dispatch(setProfileURL(user_metadata?.picture))
                    dispatch(setName(user_metadata?.name))
                    dispatch(setEmail(email))
                }
                dispatch(setProfile(null))
                dispatch(setUser(data.data.user.id))
                setTimeout(() => {
                    dispatch(setPending(false))
                    navigate("/create-profile")
                } , 1000)
                return
            }

            dispatch(setUser(data.data.user.id))
            dispatch(setPending(false))
            dispatch(setProfile(
                profile.data
            ))

        }
        catch(err){
            console.log(err)
            dispatch(setPending(false))
            dispatch(setError(err?.toString()))
            dispatch(setUser(null))
        }
        }
        func()
    },[])
}

type profile = {
    profile_picture  : string,
    display_name : string | profile | ArrayBuffer,
    username : string
}

export const useGetUserProfile = (
    uid : string
  ) => {
    const [profile , setProfile] = useState<profile | undefined>()
    useLayoutEffect(() => {

        if(!uid) return

        const func = async () => {
            const {data , error} = await supabase
              .from("profiles")
              .select()
              .eq("uid" , uid)
              .single()
            
            if(error){
              console.log(error)
              return
            }            
            setProfile(data)

          }
          func()
    },[uid])
    

      return [profile]
}

export const useCheckForUserName = (
    username :string
) => {
    const [available , setAvailable] = useState<boolean>();

    useEffect(() => {
        const func = async () => {
            const { data , error } = await supabase
            .from("profiles")
            .select("username")
            .eq("username",username)

            if(error || !data){
                setAvailable(false)
                return
            }

            setAvailable(true)

        }
        func()
    },[username])

    return [available]
}