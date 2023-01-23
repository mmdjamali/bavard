import React , { useState , useRef } from 'react'

type props = {
    sx? : string,
    placeholder : string,
    value  :string,
    setValue : React.Dispatch<React.SetStateAction<string>>,
    maxLength : number
}

const TextArea : React.FC<props> = ({
    placeholder,
    value,
    setValue,
    maxLength,
    sx
}) => {
  const [valid , setValid] = useState<boolean>(true)

  const timer = useRef(null)

  return (
    <textarea
    className={`
    mx-[2rem]
    outline-none
    border-[2px]
    rounded-md
    p-1.5
    text-neutral-700
    overflow-hidden
    ${sx ? sx : ""}
    ${
        !value ?
        "border-violet-300 bg-violet-50/50"
        :
          valid ?
          "border-emerald-400 bg-emerald-50/50"
          :
          "border-red-400 bg-red-50/50"
      }
    `}
    placeholder={placeholder}
    value={value}
    onChange={(e) => {
        setValue(e.target.value)
    }}
    maxLength={120}
    rows={3}
    >

    </textarea>
  )
}

export default TextArea