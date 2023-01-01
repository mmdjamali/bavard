import supabase from "../../libs/supabase";

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