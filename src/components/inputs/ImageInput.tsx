import React from "react"
import { MdOutlineAddPhotoAlternate } from "react-icons/md"

type props = {
    value : string | ArrayBuffer | null,
    setValue : React.Dispatch<React.SetStateAction<string | ArrayBuffer | null>>
}

const ImageInput : React.FC<props> = ({setValue , value}) => {
    
    return(
        <>
            <input
            id="ImageInput"
            type="file"
            accept=".png,.svg,.jpeg"
            className="hidden"
            onChange={(e : React.ChangeEvent<HTMLInputElement>) => {
                let files = e.target.files
                let reader = new FileReader;
                
                if(!files) return
                
                reader.readAsDataURL(files[0])
                reader.onload = () => {
                    setValue(reader.result)
                }
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
            style={{backgroundImage : `url(${value ? value : ""})`}}
            >
                { !value ? 
                    <MdOutlineAddPhotoAlternate
                    className="
                    text-[1.5rem]
                    text-violet-dark
                    "
                    /> : ""
                }
            </label>
        </>
    )
}

export default ImageInput