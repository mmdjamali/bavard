import {
    RiHeartLine , RiHeartFill , RiRepeatFill,
    RiBookmarkLine , RiBookmarkFill
} from "react-icons/ri"

export const horizontalSectionBar = [
    {
        title : "likes",
        linedIcon : RiHeartLine,
        filledIcon : RiHeartFill,
        color : "rose",
        property:  "liked_by"
    },
    {
        title : "reposts",
        linedIcon : RiRepeatFill,
        filledIcon : RiRepeatFill,
        color : "emerald",
        property:  "reposted_by"
    },
    {
        title : "bookmarks",
        linedIcon : RiBookmarkLine,
        filledIcon : RiBookmarkFill,
        color : "violet",
        property:  "bookmarked_by"
    },
]