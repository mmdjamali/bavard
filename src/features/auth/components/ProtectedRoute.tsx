import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import type { rootType } from "../../../redux/store";
import React from "react"

type props = {
    children : React.ReactNode,
    value : any
}

const ProtectedRoute :React.FC<props> = ({children , value}) => {
    return (
        <>
        {!!value ? children : <Navigate to={"/"}/>}
        </>
    )
}

export default ProtectedRoute