import {
    RiHeartLine , RiHeartFill , RiRepeatFill,
    RiBookmarkLine , RiBookmarkFill , RiEyeFill
} from "react-icons/ri"

export const horizontalSectionBar = [
    {
        title : "likes",
        linedIcon : RiHeartLine,
        filledIcon : RiHeartFill,
        color : "hover:bg-rose-200/50 hover:text-rose-500",
        fillColor : "text-rose-500",
        property:  "liked_by"
    },
    {
        title : "reposts",
        linedIcon : RiRepeatFill,
        filledIcon : RiRepeatFill,
        color : "hover:bg-emerald-200/50 hover:text-emerald-500",
        fillColor : "text-emerald-500",
        property:  "reposted_by"
    },
    {
        title : "bookmarks",
        linedIcon : RiBookmarkLine,
        filledIcon : RiBookmarkFill,
        color : "hover:bg-violet-200/50 hover:text-violet-500",
        fillColor : "text-violet-500",
        property:  "bookmarked_by"
    },
]