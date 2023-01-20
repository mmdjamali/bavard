import supabase from "../../libs/supabase"

type getFile = (
    bucket : string,
    path : string
) => string | null

export const getFile : getFile = (bucket , path) => {
    
    if(
        path?.slice(0,7) === "http://" || 
        path?.slice(0,8) === "https://"
    ) return path

    try{
    const {data} = supabase
            .storage
            .from(bucket)
            .getPublicUrl(path)

    return data.publicUrl
    }
    catch(err){
        console.log(err)
        return null
    }
}