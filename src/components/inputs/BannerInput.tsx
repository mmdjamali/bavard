import React, { useState , useEffect } from "react"
import { MdOutlineAddPhotoAlternate } from "react-icons/md"
import { getFile } from "../../features/storage/utils"

type props = {
    value : string | ArrayBuffer | File | null,
    setValue : React.Dispatch<React.SetStateAction<string | ArrayBuffer| File | null>>,
    defaultURL : string | null ,
    setDefaultURL : React.Dispatch<React.SetStateAction<string | null>>,
    sx? : string,
    imageSX? : string
}

const BannerInput : React.FC<props> = ({
    setValue , 
    value ,
    defaultURL,
    setDefaultURL,
    sx,
    imageSX
}) => {
    const [image , setImage] = useState<string | ArrayBuffer | null>(getFile("profiles" , defaultURL || ""))

    useEffect(() => {
        setImage(getFile("profiles",defaultURL || ""))
    },[defaultURL])

    return(
        <div
        className={`
        ${sx ? sx : ""}
        `}>
            <input
            id="BannerInput"
            type="file"
            accept=".png,.jpeg"
            className="hidden"
            onChange={(e : React.ChangeEvent<HTMLInputElement>) => {
                let files = e.target.files
                let reader = new FileReader;
                
                 if(!files) return
                
                reader.readAsDataURL(files[0])
                reader.onload = () => {
                    setImage(reader.result)
                }
                setDefaultURL(null)
                setValue(files[0])
            }}
            />

            <label 
            htmlFor="BannerInput"
            className={`
            flex 
            ${imageSX ? imageSX : "aspect-[4/1] w-full"} 
            border-[1px] border-neutral-300
            bg-white hover:bg-violet-50
            justify-center items-center transition-colors
            cursor-pointer bg-center bg-cover
            bg-no-repeat
            `}
            style={{backgroundImage : `url(${image ? image : ""})`}}
            >
                { !image ? 
                    <MdOutlineAddPhotoAlternate
                    className="
                    text-[1.5rem]
                    text-violet-dark
                    "
                    /> : ""
                }
            </label>
        </div>
    )
}

export default BannerInput