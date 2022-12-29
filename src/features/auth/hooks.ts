import { useState , useEffect, useLayoutEffect } from "react"
import store from "../../redux/store";
import { setUser , setProfile , setPending } from "../../redux/AuthSlice";
import supabase from "../../libs/supabase";
import { AuthChangeEvent , Session} from "@supabase/supabase-js"
import { useNavigate } from "react-router-dom";

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

    useLayoutEffect(() => {
        const func = async () => {
        try{
            const data = await supabase.auth.getUser()
            console.log(data.data)
            if(!data.data.user){
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
                store.dispatch(setProfile(null))
                navigate("/create-profile")
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