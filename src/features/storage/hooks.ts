import React, { useEffect, useLayoutEffect , useState } from "react";
import { getFile } from "./utils";
import supabase from "../../libs/supabase";

export const useGetPicture = (
    from : string,
    path : string 
    ) => {
      const [picrure , setPicture] = useState<string | ArrayBuffer | null>()

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

    return [picrure]
}

export const useGetPosts = () => {
  const [posts , setPosts] = useState<any>([])
  const [pending , setPending] = useState<boolean>(false)
  const [err , setErr] = useState<null | string>()
  useEffect(() => {
    const func = async () => {
      const {data , error} = await supabase
          .from("posts")
          .select()
      
      if(error || !data){
        setPending(false)
        setErr(error.toString())
        setPosts([])
        return
      }

      setPending(false)
      setErr(null)
      setPosts(data)

    }
    func()

  },[])
  
  return[posts,pending,err]

}