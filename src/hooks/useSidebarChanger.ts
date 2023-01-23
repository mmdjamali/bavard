import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { setCurrent } from "../redux/SidebarSlice"

const useSidebarChanger = (section : string , param? : string) => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(setCurrent(section))
        document.getElementsByTagName("title")[0].innerText = section ? "Elatwit / " + section : "Elatwit"
    },[param])
}

export default useSidebarChanger;