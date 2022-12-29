import { useLayoutEffect } from "react"
import { useDispatch } from "react-redux"
import { setCurrent } from "../redux/SidebarSlice"

const useSidebarChanger = (section : string) => {
    const dispatch = useDispatch()
    useLayoutEffect(() => {
        dispatch(setCurrent(section))
    },[])
}

export default useSidebarChanger;