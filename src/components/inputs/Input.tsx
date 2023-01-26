import React, { useEffect, useRef, useState } from 'react'

type props = {
    sx? : string,
    title : string,
    value  :string,
    setValue : React.Dispatch<React.SetStateAction<string>>
    validationFunc : (value : string , setErr : React.Dispatch<React.SetStateAction<string>>) => Promise<boolean> | boolean
}

const Input : React.FC<props> = ({
  sx , title , value , setValue,
  validationFunc
}) => {
  const [valid  , setValid] = useState<boolean>(false)
  const [err  , setErr] = useState<string>("")

  const timer : any = useRef()

  useEffect(() => {
    const func = async () => {
      let bool = await validationFunc(value , setErr)
      setValid(bool)
    }
    func()
  },[])

  return (
    <div
    className={sx ? sx : ""}
    >
      <span
      className='
      mt-[1rem]
      mb-[.25rem]
      text-[.9rem]
      text-neutral-500
      '>
        {title}
      </span>

      <div
      className={`
      flex border-[1px] transition-all
      px-4
      py-2 
      ${
        !value ?
        "border-neutral-300 text-violet-300 bg-white"
        :
          !!valid ?
          "border-emerald-400 text-emerald-400 bg-emerald-50/50"
          :
          "border-red-400 text-red-400 bg-red-50/50"
      }
      justify-start items-center rounded-[.25rem]
      w-full
      `}>
          <input
          value={value}
          onChange={(e : React.ChangeEvent<HTMLInputElement>) => {
              let targetValue = e.target.value

              setValue(targetValue)

              if(timer.current) clearTimeout(timer.current)

              timer.current = setTimeout(async () => {
                let bool = await validationFunc(targetValue , setErr)
                setValid(bool)
              },1000)

          }}
          onBlur={async () => {
            if(timer.current) clearTimeout(timer.current)
            let bool = await validationFunc(value , setErr)
            setValid(bool)
          }}
          className="
          text-[.9rem]
          bg-transparent
          outline-none
          text-neutral-700
          w-full
          "
          />
      </div>

      <span
      className='
      text-red-500
      text-[.9rem]
      '>
        {err}
      </span>
    </div>
  )
}

export default Input