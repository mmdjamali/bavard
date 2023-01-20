import React from 'react'

type props = {
  value : string,
  onChange : (e : React.ChangeEvent<HTMLInputElement>) => void
}

const CheckBox : React.FC<props> = ({
  value,
  onChange
}) => {
  return (
    <div
    className='
    flex 
    items-center
    justify-center
    '>
        <input
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