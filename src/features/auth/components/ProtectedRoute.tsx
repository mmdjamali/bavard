import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import type { rootType } from "../../../redux/store";
import Loader from "../../../components/Loader";
import React from "react"

type props = {
    children : React.ReactNode,
    value : any,
    path? : string,
}

const ProtectedRoute :React.FC<props> = ({children , value , path}) => {
    const { pending , error } : {pending : boolean , error : string | null} = useSelector((state : rootType) => state.AuthSlice)
    
    if(pending || error) return <></>
    
    return (
        <>
        {!!value ? children : <Navigate to={path ? path : "/"}/>}
        </>
    )
}

export default ProtectedRoute