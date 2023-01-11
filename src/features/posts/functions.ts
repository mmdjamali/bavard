import { PostgrestError } from "@supabase/supabase-js";
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
                created_by,
                reposted_by:[],
                viewed_by:[],
                liked_by:[],
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

export const repost = async (post : any , reposted : number | boolean | PostgrestError | null) => {
  let { user } = store.getState().AuthSlice;

    if(post?.created_by === user) return;

    if(reposted) return
                        
    const { error : err } = await supabase
    .from("posts")
    .insert([{
        created_by : user,
        original_post : post.id,
        repost : true,
    }]);
  
}

export const deletePost = async (pId : string) => {
  await supabase
    .from("posts")
    .delete()
    .eq("id",pId)
}

