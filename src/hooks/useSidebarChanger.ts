import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { setCurrent } from "../redux/SidebarSlice"

const useSidebarChanger = (section : string) => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(setCurrent(section))
    },[])
}

export default useSidebarChanger;