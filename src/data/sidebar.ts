import React from "react";
import { IconType } from "react-icons/lib";
import {
    MdHome, MdOutlineHome , MdTag , MdNotifications,
    MdNotificationsNone , MdBookmark , MdBookmarkBorder,
    MdPerson , MdPersonOutline
} from "react-icons/md"

import {
    RiHome2Line , RiHashtag , RiMessage2Line ,
    RiBookmarkLine , RiUserLine
} from "react-icons/ri"

type sections = {
    title: string;
    path: string;
    icon: IconType;
}

export const sidebarSections = [
    {
        type : "divider",
        title : "CONTENT"
    },
    {
        type : "section",
        title : "Home",
        path : "/home",
        icon : RiHome2Line,
    },
    {
        type : "section",
        title : "Explore",
        path : "/explore",
        icon : RiHashtag,
    },
    {
        type : "divider",
        title : "PERSONAL"
    },
    {
        type : "section",
        title : "Massages",
        path : "/massages",
        icon : RiMessage2Line,
    },
    {
        type : "section",
        title : "Bookmarks",
        path : "/bookmarks",
        icon : RiBookmarkLine,
    },
    {
        type : "section",
        title : "Profile",
        path : "/profile",
        icon : RiUserLine,
    },
    
]