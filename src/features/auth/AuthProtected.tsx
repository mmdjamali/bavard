import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import type { rootType } from "../../redux/store";
import React from "react"

type props = {
    chidren : React.ReactNode
}

const AuthProtected :React.FC<props> = ({chidren}) => {
    const { user } = useSelector((state : rootType) => state.AuthSlice);
    return (
        <>
        {!!user ? chidren : <Navigate to={"/"}/>}
        </>
    )
}

export default AuthProtected