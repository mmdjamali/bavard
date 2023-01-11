import React, { useEffect, useLayoutEffect , useState } from "react";
import { getFile } from "./utils";
import supabase from "../../libs/supabase";
import store from "../../redux/store";

export const useGetPicture = (
    from : string,
    path : string 
    ) => {
      const [picture , setPicture] = useState<string | ArrayBuffer | null>()

      useEffect(() => {

        if(!path) return

        // in order to reduce request numbers
        // we are saving picture on session storage
        const storedPic = JSON.parse(sessionStorage.getItem(path) || "{}")
        if(Object.keys(storedPic).length !== 0){
          setPicture(storedPic)
          return
        }

        const func = async () => {
          let reader = new FileReader;
          let file = await getFile(from , path)
          if(!file) return
          if(file.size === 0) return
          reader.readAsDataURL(file)
          reader.onload = () => {
            setPicture(reader.result)

            // svaing to session storage
            sessionStorage.setItem(
              path,
              JSON.stringify(reader.result)
            )
          }
        }
    
        func()
      },[path , from])

    return [picture]
}

export const useGetPosts = (max : number) => {
  const [posts , setPosts] = useState<any>([])
  const [pending , setPending] = useState<boolean>(false)
  const [err , setErr] = useState<null | string>()
  const [hasMore , setHasMore] = useState<boolean>(false)
  
  useEffect(() => {
    let profile : {followed : string[] , uid : string } | null = store.getState().AuthSlice.profile;

    const func = async () => {
      if(!profile) return
      let array = [...profile?.followed,profile.uid]

      setPending(true)

      const {count , data , error} = await supabase
          .from("posts")
          .select("*",{count : "exact"})
          .in("created_by", array)
          .order('created_at', { ascending: false })
          .range(0 , max)
      
      if(error || !data){
        console.log(error)
        setPending(false)
        setErr(error.toString())
        setPosts([])
        setHasMore(false)
        return
      }

      setPending(false)
      setErr(null)
      setPosts(data)
      setHasMore(max - 1 <= (count || 0))

    }
    func()

  },[max])

  useEffect(() : any => {

    let handleChanges = async (payload : any) => {

      if(!profile) return
      let array = [...profile?.followed,profile.uid]

      setPending(true)

      const {count , data , error} = await supabase
          .from("posts")
          .select("*",{count : "exact"})
          .in("created_by", array)
          .order('created_at', { ascending: false })
          .range(0 , max)
      
      if(error || !data){
        console.log(error)
        setPending(false)
        setErr(error.toString())
        setPosts([])
        setHasMore(false)
        return
      }

      setPending(false)
      setErr(null)
      setPosts(data)
      setHasMore(max - 1 <= (count || 0))
    }
    
    let profile : {followed : string[] , uid : string } | null = store.getState().AuthSlice.profile;
    let user : string | null = store.getState().AuthSlice.user;

    const channel = supabase.channel('custom-all-channel')
    .on(
      'postgres_changes',
      { event: 'DELETE', schema: 'public', table: 'posts', filter:"created_by=eq." + user },
      async (payload : any) => {

        handleChanges(payload)

      }
    )
    .on(
      'postgres_changes',
      { event: 'INSERT', schema: 'public', table: 'posts', filter:"created_by=eq." + user },
      async (payload : any) => {

        handleChanges(payload)

      }
    )
    .subscribe()

    return () => supabase.removeChannel(channel)

  },[posts,max])
  
  return[posts,pending,err,hasMore]

}