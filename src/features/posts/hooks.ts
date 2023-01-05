import React , {useState , useLayoutEffect, useEffect} from "react"
import supabase from "../../libs/supabase"
import type { PostgrestError } from "@supabase/supabase-js"
import store from "../../redux/store"

export const useGetPost = (pId : string) => {
    const [post, setPost] = useState(null)
    const [err, setErr] = useState<PostgrestError | null>(null)
    const [pending, setPending] = useState(true)

    const func = async () => {
        const { data , error } = await supabase
            .from("posts")
            .select()
            .eq("id",pId)
            .single()

        if(error){
            setPending(false)
            setErr(error)
            setPost(null)
            return
        }

        setPending(false)
        setErr(null)
        setPost(data)
        return
    }

    useLayoutEffect(() => {
        func()
    },[])

    useEffect(() : any => {
        const channel = supabase
            .channel("getting" + pId)
            .on(
            "postgres_changes",
            { event: '*', schema: 'public', table: 'posts' , filter : "id=eq."+pId },
            async () => {
                await func()
            }
            )
            .subscribe()
        
        return () => supabase.removeChannel(channel);
        
    },[])

    return [post,err,pending]

}
