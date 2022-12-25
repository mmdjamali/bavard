import React from 'react'

type props = {
    sx? : string,
    onClick : (e : React.MouseEvent<HTMLButtonElement> ) => void ,
    icon : React.ReactNode,
    provider : string
}

const AuthProviderButton : React.FC<props> = ({
     onClick , sx , icon , provider
}) => {
  return (
    <button
        type="button"
        onClick={onClick}
        className={`
        bg-violet-50 text-viol-800 text-[1rem]
        py-[.5rem] w-full rounded-[.25rem] hover:shadow-[0px_4px_8px]
        hover:bg-violet-100 font-medium
        transition-colors delay-150 ease-linear flex 
        justify-center items-center shadow-[0px_4px_6px]
        shadow-violet-400/50 hover:shadow-violet-400/70
        ${sx ? sx : ""}
        `}
        >
            <div
            className='text-[1.5rem] px-[.5rem] text-neutral-700'>
                {icon}
            </div>

            <p
            className='px-[.5rem] text-neutral-700'>
                {"Continue with " + provider}
            </p>
        </button>
  )
}

export default AuthProviderButton