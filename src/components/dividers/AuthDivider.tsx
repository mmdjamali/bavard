function AuthDivider() {
  return (
    <div
    className="
    flex justify-center items-center
    relative my-[.75rem]
    ">
        
        <div
        className="
        inline-block w-[30%] h-[1px]
        bg-neutral-300
        "
        />

        <p
        className="
        text-[.75rem] mx-[.5rem] text-neutral-300
        ">
            OR
        </p>

        <div
        className="
        inline-block w-[30%] h-[1px]
        bg-neutral-300
        "
        />

    </div>
  )
}

export default AuthDivider