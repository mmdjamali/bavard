import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import type { rootType } from "../../../redux/store";
import Loader from "../../../components/Loader";
import React from "react"

type props = {
    children : React.ReactNode,
}

const ProtectedAuth :React.FC<props> = ({children}) => {
    const {user , profile , pending , error } : any = useSelector((state : rootType) => state.AuthSlice)
    
    if(pending || error) return <></>
    
    if(!user) return(
        <Navigate to="/"/>
    )

    if(user && !profile) return(
        <Navigate to="/create-profile"/>
    )

    return (
        <>
        {children}
        </>
    )
}

export default ProtectedAuth