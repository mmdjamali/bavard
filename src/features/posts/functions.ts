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
        console.log(currentData)
      if(currentData?.includes(user)){

        let idx = currentData?.findIndex((data : string) => data === user);
        let array = [...currentData];
        array.splice(idx , 1)

        const { data , error } = await supabase
          .from("posts")
          .update({[column] : array})
          .eq("id" , id)
          .select()

          console.log(data,error)

        return

      }

      const { data, error } = await supabase
          .from("posts")
          .update({[column] : [...currentData , user]})
          .eq("id" , id)

      return
    }
  
    const { data , error } = await supabase
          .from("posts")
          .update({[column] : [user]})
          .eq("id" , id)
          .select()

          console.log(data , error , "70")
  
}