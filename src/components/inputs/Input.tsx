import React from 'react'

type props = {
    sx? : string,
    placholder : string,
    value  :string,
    setValue : React.Dispatch<React.SetStateAction<string>>
}

const Input : React.FC<props> = ({sx , placholder , value , setValue}) => {
  return (
    <div
    className={`
    flex border-[2px] transition-all
    p-1.5 border-violet-300 text-violet-300 bg-violet-50/50
    justify-start items-center rounded-[.25rem]
    w-full
    ${sx ? sx : ""}
    `}>
        <input
        value={value}
        onChange={(e : React.ChangeEvent<HTMLInputElement>) => {
            setValue(e.target.value)
        }}
        className="
        text-[1rem]
        bg-transparent
        outline-none
        text-gray-600
        w-full
        "
        placeholder={placholder}
        />
    </div>
  )
}

export default Input