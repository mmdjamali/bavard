import React, { useState } from "react"
import { MdOutlineAddPhotoAlternate } from "react-icons/md"

type props = {
    value : string | ArrayBuffer | File | null,
    setValue : React.Dispatch<React.SetStateAction<string | ArrayBuffer| File | null>>,
    defaultURL : string | null,
    setDefaultURL : React.Dispatch<React.SetStateAction<string | null>>,
    sx? : string
}

const ImageInput : React.FC<props> = ({
    setValue , 
    value ,
    defaultURL,
    setDefaultURL,
    sx,
}) => {
    const [image , setImage] = useState<string | ArrayBuffer | null>(defaultURL)

    return(
        <div
        className={`
        ${sx ? sx : ""}
        `}>
            <input
            id="ImageInput"
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
            htmlFor="ImageInput"
            className={`
            flex w-[9rem] h-[9rem] border-[2px] border-violet-400
            bg-violet-200 hover:bg-violet-300 rounded-full
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

export default ImageInput