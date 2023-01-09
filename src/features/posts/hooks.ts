import React , {useState , useLayoutEffect, useEffect} from "react"
import supabase from "../../libs/supabase"
import type { PostgrestError, PostgrestResponse } from "@supabase/supabase-js"
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

    useEffect(() => {
        func()
    },[pId])

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
        
    },[pId])

    return [post,err,pending]

}

export const useGetReposts = (pId : string , user : string) => {
    const [count, setCount] = useState<number | null>(0)
    const [pending, setPending] = useState<boolean>(true)
    const [reposted, setReposted] = useState<boolean>(false)
    const [err, setErr] = useState<PostgrestError | null>(null)

    useEffect(() => {
        const func = async () => {
            const {data , error , count } :  any  = await supabase
                .from("posts")
                .select("created_by" , { count : "exact"})
                .eq("original_post" , pId)

            setPending(false)
            setReposted(data?.some((item : any) => item.created_by === user))
            setErr(error)
            setCount(count)
        }

        func()

    },[pId])

    return [count , err , pending , reposted]
}
