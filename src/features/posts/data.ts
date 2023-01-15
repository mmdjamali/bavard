import {
    RiHeartLine , RiHeartFill , RiRepeatFill,
    RiBookmarkLine , RiBookmarkFill , RiEyeFill , RiChat1Line
} from "react-icons/ri"

export const horizontalSectionBar = [
    {
        title : "replies",
        linedIcon : RiChat1Line,
        filledIcon : RiChat1Line,
        color : "hover:bg-violet-200/50 hover:text-violet-500",
        fillColor : "text-violet-500",
        property:  "replies"
    },
    {
        title : "reposts",
        linedIcon : RiRepeatFill,
        filledIcon : RiRepeatFill,
        color : "hover:bg-emerald-200/50 hover:text-emerald-500",
        fillColor : "text-emerald-500",
        property:  "reposts"
    },
    {
        title : "likes",
        linedIcon : RiHeartLine,
        filledIcon : RiHeartFill,
        color : "hover:bg-rose-200/50 hover:text-rose-500",
        fillColor : "text-rose-500",
        property:  "likes"
    },
]