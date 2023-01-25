import {useState , useEffect } from "react";
import store from "../../redux/store";
import supabase from "../../libs/supabase";
import { PostgrestError } from "@supabase/supabase-js";

export const useGetLikedPosts = (
    max : number = 10,
    user : string
) => {
    const [posts , setPosts] = useState<any>([])
    const [pending , setPending] = useState<boolean>(false)
    const [err , setErr] = useState<null | string>()
    const [hasMore , setHasMore] = useState<boolean>(false)

    useEffect(() => {
        const func = async () => {
          if(!user) return
    
          setPending(true)

          const profile = await supabase
                .from("profiles")
                .select()
                .eq("username",user.toString())
                .single()

          if(profile?.error){
            setPosts(null)
            setHasMore(false)
            setErr(profile?.error?.message)
            setPending(false)
            return
          }
    
          const {count , data , error} = await supabase
              .from("posts")
              .select("ID,parent,content,created_by",{count : "exact"})
              .in("ID",[...profile?.data?.liked || ""])
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
    },[max,user])

    useEffect(() : any => {

    let handleChanges = async (payload : any) => {

        if(!user) return
    
        setPending(true)

        const profile = await supabase
              .from("profiles")
              .select()
              .eq("username",user.toString())
              .single()

        if(profile?.error){
          setPosts(null)
          setHasMore(false)
          setErr(profile?.error?.message)
          setPending(false)
          return
        }

        const {count , data , error} = await supabase
            .from("posts")
            .select("*",{count : "exact"})
            .in("ID",[...profile?.data?.liked])
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

    },[max,user])

    return[posts,pending,err,hasMore]
}

export const useGetOnlyPosts = (
    max : number = 10,
    user : string
) => {
  
    const [posts , setPosts] = useState<any>([])
    const [pending , setPending] = useState<boolean>(false)
    const [err , setErr] = useState<null | string>()
    const [hasMore , setHasMore] = useState<boolean>(false)

    useEffect(() => {
        const func = async () => {
            if(!user) return
    
            setPending(true)
  
            const profile = await supabase
                  .from("profiles")
                  .select()
                  .eq("username",user.toString())
                  .single()
  
            if(profile?.error){
              setPosts(null)
              setHasMore(false)
              setErr(profile?.error?.message)
              setPending(false)
              return
            }
    
          const {count , data , error} = await supabase
              .from("posts")
              .select("ID,parent,content,created_by",{count : "exact"})
              .eq("created_by" , profile?.data?.uid)
              .is("replying" , null)
              .order('created_at', { ascending: false })
              .range(0, max)
          
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
          setHasMore(max - 1 < (count || 0))
        }
        func()
    },[max,user])

    useEffect(() : any => {

    let handleChanges = async (payload : any) => {

        if(!user) return
    
        setPending(true)

        const profile = await supabase
              .from("profiles")
              .select()
              .eq("username",user.toString())
              .single()

        if(profile?.error){
          setPosts(null)
          setHasMore(false)
          setErr(profile?.error?.message)
          setPending(false)
          return
        }

        const {count , data , error} = await supabase
            .from("posts")
            .select("ID,parent,content,created_by",{count : "exact"})
            .eq("created_by" , profile?.data?.uid)
            .is("replying" , null)
            .order('created_at', { ascending: false })
            .range(0, max)
        
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

    },[max,user])

    return[posts,pending,err,hasMore]

}

export const useGetUserPosts = (
    max: number,
    user : string
) => {
    const [posts , setPosts] = useState<any>([])
    const [pending , setPending] = useState<boolean>(false)
    const [err , setErr] = useState<null | string>()
    const [hasMore , setHasMore] = useState<boolean>(false)

    useEffect(() => {
        const func = async () => {
            if(!user) return
    
            setPending(true)
  
            const profile = await supabase
                  .from("profiles")
                  .select()
                  .eq("username",user.toString())
                  .single()
  
            if(profile?.error){
              setPosts(null)
              setHasMore(false)
              setErr(profile?.error?.message)
              setPending(false)
              return
            }
    
          const {count , data , error} = await supabase
              .from("posts")
              .select("ID,parent,content,created_by",{count : "exact"})
              .eq("created_by" , profile?.data?.uid)
              .order('created_at', { ascending: false })
              .range(0, max)
          
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
          setHasMore(max - 1 < (count || 0))
        }
        func()
    },[max,user])

    useEffect(() : any => {

    let handleChanges = async (payload : any) => {

        if(!user) return
    
        setPending(true)

        const profile = await supabase
              .from("profiles")
              .select()
              .eq("username",user.toString())
              .single()

        if(profile?.error){
          setPosts(null)
          setHasMore(false)
          setErr(profile?.error?.message)
          setPending(false)
          return
        }

        const {count , data , error} = await supabase
            .from("posts")
            .select("ID,parent,content,created_by",{count : "exact"})
            .eq("created_by" , profile?.data?.uid)
            .order('created_at', { ascending: false })
            .range(0, max)
        
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

    },[max,user])

    return[posts,pending,err,hasMore]
}

export const useGetUsersWithSameInterests = (
    max : number
) => {
    const [users, setUsers] = useState<{uid : string}[] | null>(null)
    const [pending, setPending] = useState<boolean>(true)
    const [hasMore, setHasMore] = useState<boolean>(false)
    const [err, setErr] = useState<PostgrestError | null | string>(null)

    useEffect(() => {
        const profile : any = store.getState().AuthSlice.profile;

        const func = async () => {
            if(!profile?.interests) {
                setPending(false)
                setHasMore(false)
                setErr(null)
                setUsers(null)
                return
            }

            const getUsers = await supabase
                .from("profiles")
                .select("uid",{count : "exact"})
                .overlaps("interests",[...profile.interests])
                .neq("uid",profile?.uid)
                .range(0,max)

            if(getUsers?.error){
                setPending(false)
                setHasMore(false)
                setErr(getUsers?.error?.message)
                setUsers(null)
                return
            }

            setPending(false)
            setHasMore(max - 1 < (getUsers?.count || 0))
            setErr(null)
            setUsers(getUsers?.data)
        }

        func()

    },[max])

    return[users,pending,err,hasMore]
}