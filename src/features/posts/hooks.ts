import React , {useState , useLayoutEffect, useEffect} from "react"
import supabase from "../../libs/supabase"
import type { PostgrestError, PostgrestResponse } from "@supabase/supabase-js"
import store from "../../redux/store"

export const useGetPost = (pId : string ,...dep: any) => {
    const [post, setPost] = useState(null)
    const [err, setErr] = useState<PostgrestError | null>(null)
    const [pending, setPending] = useState(true)

    useEffect(() => {
        if(!pId) {
            setPending(false)
            return
        }
        const func = async () => {
            const { data , error } = await supabase
                .from("posts")
                .select()
                .eq("ID",pId)
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
        func()
    },[pId,...dep])

    // useEffect(() => {
        
    //     const channel = supabase
    //         .channel("nohing" + pId)
    //         .on(
    //             "postgres_changes",
    //             {event:"UPDATE",schema:"public",table:"posts",filter : "ID=eq." + pId},
    //             (payload : any) => {
    //                 setPost(payload.new)
    //             }
    //         )
    //         .subscribe()

    //         return () => {
    //             supabase.removeChannel(channel)
    //         }
    // },[])

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

export const useCheckForRepost = (
    postID :string,
    user : string
) => {
    const [reposted , setReposted] = useState<boolean>(false)

    useEffect(() => {

        if(!postID ||!user) return

        const func = async () => {
            const { error , data } = await supabase
                    .from("posts")
                    .select("ID")
                    .match({"parent" : postID , "created_by" : user})
                    
            if(error || !data[0]) {
                setReposted(false)
                return
            }

            if(data[0]){
                setReposted(true)
                return 
            }
        }
        func()

    },[postID,user])

    return [reposted]
}

export const useCheckForLike = (
    pId : string
) => {
    const [liked , setLiked] = useState<boolean>(false)
    
    useEffect(() => {
        let user :any = store.getState().AuthSlice.user;
        
        const func = async () => {
            const profile = await supabase
                    .from("profiles")
                    .select("liked")
                    .eq("uid",user)
                    .single()
            
                    if(!profile.data || !profile?.data.liked) {
                setLiked(false)
                return
            }
    
            setLiked(profile?.data?.liked?.includes(pId))
        }

        func()

    },[pId])

    return [liked , setLiked]
}

export const useCheckForReply = (
    postID : string,
    user :string | null
) => {
    const [replied , setReplied] = useState<boolean>(false)

    useEffect(() => {
        if(!postID ||!user) return

        const func = async () => {
            const { error , data } = await supabase
                    .from("posts")
                    .select("ID")
                    .match({"replying" : postID , "created_by" : user})
                    
            if(error || !data[0]) {
                setReplied(false)
                return
            }

            if(data[0]){
                setReplied(true)
                return 
            }
        }
        func()
    },[postID , user])

    return [replied]
}

export const useGetReplies = (
    max : number = 10,
    postID : string
) => {
    const [posts , setPosts] = useState<any>([])
    const [pending , setPending] = useState<boolean>(false)
    const [err , setErr] = useState<null | string>()
    const [hasMore , setHasMore] = useState<boolean>(false)

    useEffect(() => {
        const func = async () => {
            
          if(!postID){
            setPending(false)
            setHasMore(false)
            setPosts(null)
            return
          }

          setPending(true)
    
          const {count , data , error} = await supabase
              .from("posts")
              .select("ID",{count : "exact"})
              .eq("replying",postID)
              .order('created_at', { ascending: false })
              .range(0, max)
          
          if(error || !data){
            setPending(false)
            setErr(error.toString())
            setPosts([])
            setHasMore(false)
            return
          }
    
          setPending(false)
          setErr(null)
          setPosts(data)
          setHasMore(max - 1 < (count || 0))
        }
        func()
    },[max,postID])

    useEffect(() : any => {

    let handleChanges = async (payload : any) => {

        if(!postID){
            setPending(false)
            setHasMore(false)
            setPosts(null)
            return
        }

        const {count , data , error} = await supabase
            .from("posts")
            .select("ID",{count : "exact"})
            .eq("replying",postID)
            .order('created_at', { ascending: false })
            .range(0 , max)
        
        if(error || !data){
        // console.log(error)
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
    
    const channel = supabase.channel('custom-all-channel')
    .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'posts', filter:"replying=eq." + postID },
        async (payload : any) => {

        handleChanges(payload)

        }
    )
    .subscribe()

    return () => supabase.removeChannel(channel)

    },[max,postID])

    return[posts,pending,err,hasMore]
}
