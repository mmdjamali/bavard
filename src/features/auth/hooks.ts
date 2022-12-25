import { useState , useEffect } from "react"
import store from "../../redux/store";
import { setUser , setProfile } from "../../redux/AuthSlice";
import supabase from "../../libs/supabase";
import { AuthChangeEvent , Session} from "@supabase/supabase-js"
import { useNavigate } from "react-router-dom";

export const useAuthStateChange = () => {
    console.log(supabase.auth.getUser().then(data => console.log(data)))
}

export const useCheckForUser = () => {
    const navigate = useNavigate()

    useEffect(() => {
        const func = async () => {
        try{
            const data = await supabase.auth.getUser()
            console.log(data.data)
            if(!data.data.user){
                console.log("user haven't logged in")
                store.dispatch(setUser(null))
                return
            }

            store.dispatch(setUser(data.data.user.id))

            const profile = await supabase
                    .from("profiles")
                    .select()
                    .eq("uid",data?.data?.user?.id) 
                    .single()

            if(!profile?.data){
                navigate("/create-profile")
                store.dispatch(setProfile(null))
                return
            }

            store.dispatch(setProfile(
                profile.data
            ))
        }
        catch(err){
            console.log(err)
        }
        }
        func()
    },[])
    
}