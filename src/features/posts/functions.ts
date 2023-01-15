import { PostgrestError, PostgrestResponse } from "@supabase/supabase-js";
import supabase from "../../libs/supabase";
import store from "../../redux/store";

export const createPost = async (
    content : string,
    created_by : string
) => {
    const { error } = await supabase
            .from("posts")
            .insert([{
                content,
                created_by
            }]);

    if(error){
        console.log(error)
        return
    }
}

export const interactWithPost = async (column : string , id : string , ) => {
    let { user } = store.getState().AuthSlice;
    const post : any = await supabase
          .from("posts")
          .select()
          .eq("id" , id)
          .single()
    
    if(post?.error) return
  
    if(post?.data[column]){

      let currentData = post?.data[column];

      if(currentData?.includes(user)){

        let idx = currentData?.findIndex((data : string) => data === user);
        let array = [...currentData];
        array.splice(idx , 1)

        let obj = column === "liked_by" ? {[column] : array , "likes" : array.length} : {[column] : array}
        const { data , error } = await supabase
          .from("posts")
          .update(
            obj
            )
          .eq("id" , id)
          .select()

        return

      }
      let obj = column === "liked_by" ? {[column] : [...currentData , user] , "likes" : currentData.length + 1} : {[column] : [...currentData , user]}
      const { data, error } = await supabase
          .from("posts")
          .update(
            obj
            )
          .eq("id" , id)

      return
    }

    let obj = column === "liked_by" ? {[column] : [user] , "likes" : 1} : {[column] : [user]}

    const { data , error } = await supabase
          .from("posts")
          .update(
            obj
            )
          .eq("id" , id)
          .select()
  
}

export const likePost = async (pId : string) => {
  let user = store.getState().AuthSlice.user;

  const profile : any = await supabase
      .from("profiles")
      .select("liked")
      .eq("uid",user)
      .single()

  if(profile.error) return

  if(!profile?.data?.liked){

    const profileUpdate = await supabase
    .from("profiles")
    .update({
      liked : [pId]
    })
    .eq("uid",user)

    if(profileUpdate.error) return

    const { error , count } = await supabase
    .from("profiles")
    .select("*",{count :"exact"})
    .contains("liked",[pId])

    const updateLikes = await supabase
        .from("posts")
        .update({
          likes : count
        })
        .eq("ID",pId)

    return
  }

  if(profile?.data?.liked.includes(pId)){
    let array = [...profile?.data?.liked]
    let idx = array.findIndex(item => item === pId);
    array.splice(idx,1)

    const profileUpdate = await supabase
    .from("profiles")
    .update({
      liked : array
    })
    .eq("uid",user)

    const { error , count } = await supabase
    .from("profiles")
    .select("uid",{count :"exact"})
    .contains("liked",[pId])

    const updateLikes = await supabase
        .from("posts")
        .update({
          likes : count
        })
        .eq("ID",pId)

    return
  }

  const profileUpdate = await supabase
    .from("profiles")
    .update({
      liked : [...profile.data.liked,pId]
    })
    .eq("uid",user)

    if(profile.error) return

    const { error , count } = await supabase
    .from("profiles")
    .select("*",{count :"exact"})
    .contains("liked",[pId])

    console.log(error , count)

    const updateLikes = await supabase
        .from("posts")
        .update({
          likes : count
        })
        .eq("ID",pId)
 
}

export const repost = async (post : any , reposted : number | boolean | PostgrestError | null) => {
  let { user } = store.getState().AuthSlice;

    if(post?.created_by === user) return;

    if(reposted) return
                        
    const { error : err1 } = await supabase
    .from("posts")
    .insert([{
        created_by : user,
        parent : post.ID,
    }]);

    if(err1) return

    const { error : err2 , count } = await supabase
        .from("posts")
        .select("ID",{count:"exact"})
        .eq("parent",post?.ID)

    if(err2) return
    
    const { error : err3 } = await supabase
        .from("posts")
        .update({
          reposts : count || 0
        })
        .eq("ID",post.ID)

}

export const deletePost = async (pId : string) => {
  await supabase
    .from("posts")
    .delete()
    .eq("ID",pId)
}

export const deleteRepost = async (pId : string , rId : string) => {
  const remove = await supabase
      .from("posts")
      .delete()
      .eq("ID",rId)
    
  console.log(remove)

  const parent = await supabase
      .from("posts")
      .select("*",{count:"exact"})
      .eq("parent",pId)

  console.log(parent)
 
  const change = await supabase
      .from("posts")
      .update({
        reposts : parent.count || 0 
      })
      .eq("ID",pId)

  console.log(change)
}

export const changeReposts = async (pId : string) => {
  if(!pId) return
  
  const { count , error } = await supabase
      .from("posts")
      .select("ID",{count:"exact"})
      .eq("parent",pId)

  const update = await supabase
    .from("posts")
    .update({
      reposts : count
    })
    .eq("ID",pId);

    console.log(update)
}

