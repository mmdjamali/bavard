import React , {useRef , useEffect} from 'react'

type props = {
  value : string,
  onChange : (e : React.ChangeEvent<HTMLInputElement>) => void,
  checked ?: boolean | undefined
}

const CheckBox : React.FC<props> = ({
  value,
  onChange,
  checked
}) => {
  const input = useRef<any>();

  useEffect(() => {
    if(!input.current) return
    if(checked === undefined) return

    input.current.checked = checked
  },[])

  return (
    <div
    className='
    flex 
    items-center
    justify-center
    '>
        <input
        ref={input}
        type="checkbox"
        className='
        w-[20px]
        h-[20px]
        accent-violet-500
        cursor-pointer
        outline-none
        '
        onChange={onChange}
        />

        <span
        className='
        text-[.8rem]
        ml-[.25rem]
        font-normal
        text-neutral-700
        '>
            {value}
        </span>

    </div>
  )
}

export default CheckBox