import supabase from "../../libs/supabase"

type getFile = (
    bucket : string,
    path : string
) => Promise< Blob | null >

export const getFile : getFile = async (bucket , path) => {
    try{
    const {data , error} = await supabase
            .storage
            .from(bucket)
            .download(path)

    return data
    }
    catch(err){
        console.log(err)
        return null
    }
}