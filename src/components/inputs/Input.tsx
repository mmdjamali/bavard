import React, { useEffect, useRef, useState } from 'react'

type props = {
    sx? : string,
    placeholder : string,
    value  :string,
    setValue : React.Dispatch<React.SetStateAction<string>>
    validationFunc : (value : string) => Promise<boolean> | boolean
}

const Input : React.FC<props> = ({
  sx , placeholder , value , setValue,
  validationFunc
}) => {
  const [valid  , setValid] = useState<boolean>(false)

  const timer : any = useRef()

  useEffect(() => {
    const func = async () => {
      let bool = await validationFunc(value)
      setValid(bool)
    }
    func()
  },[])

  return (
    <div
    className={`
    flex border-[2px] transition-all
    p-1.5 
    ${
      !value ?
      "border-violet-300 text-violet-300 bg-violet-50/50"
      :
        !!valid ?
        "border-emerald-400 text-emerald-400 bg-emerald-50/50"
        :
        "border-red-400 text-red-400 bg-red-50/50"
    }
    justify-start items-center rounded-[.25rem]
    w-full
    ${sx ? sx : ""}
    `}>
        <input
        value={value}
        onChange={(e : React.ChangeEvent<HTMLInputElement>) => {
            let targetValue = e.target.value

            setValue(targetValue)

            if(timer.current) clearTimeout(timer.current)

            timer.current = setTimeout(async () => {
              let bool = await validationFunc(targetValue)
              setValid(bool)
            },1000)

        }}
        onBlur={async () => {
          if(timer.current) clearTimeout(timer.current)
          let bool = await validationFunc(value)
          setValid(bool)
        }}
        className="
        text-[1rem]
        bg-transparent
        outline-none
        text-neutral-700
        w-full
        "
        placeholder={placeholder}
        />
    </div>
  )
}

export default Input