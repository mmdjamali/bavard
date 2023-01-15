import { useState , useEffect } from "react";
import supabase from "../../libs/supabase";
import type { PostgrestError } from "@supabase/supabase-js";

export const useGetPostByQuery = (query : string ,  column : string , max? :number ) => {
    const [posts , setPosts] = useState<any[] | null>(null)
    const [count , setCount] = useState<number | null>(0)
    const [pending , setPending] = useState<boolean>(true)
    const [err , setErr] = useState<PostgrestError | null>()

    useEffect(() => {
        const func = async () => {
            const { data , error , count } = await supabase
            .from("posts")
            .select("ID",{count : "exact"})
            .order(column, { ascending: false })
            .textSearch("content",`${query}`,{
                config : "english"
            })
            .range(0,max ? max : 10)

            if(error){
                setErr(error)
                setPosts(null)
                setCount(0)
                setPending(false)
                return
            }

            if(data){
                setErr(null)
                setPosts(data)
                setCount(count)
                setPending(false)
                return
            }
        }

        func()
    },[query])
    return [posts,count,pending,err]
}