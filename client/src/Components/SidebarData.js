import React from "react";
import * as FaIcons from 'react-icons/fa'
import * as AiIcons from 'react-icons/ai'
import * as IoIcons from 'react-icons/io'
import * as RiIcons from 'react-icons/ri'
import * as BsIcons from 'react-icons/bs'
import * as MdIcons from 'react-icons/md'

export const SidebarData=[
    {
        title:'Account',
        path:'/Account',
        icon:<RiIcons.RiAccountCircleFill/>,
        className:'nav-text'
    },
    {
        title:'Patients',
        path:'/Patients',
        icon:<BsIcons.BsFillPeopleFill/>,
        className:'nav-text'
    },
    {
        title:'Support',
        path:'/Support',
        icon:<MdIcons.MdOutlineContactSupport/>,
        className:'nav-text'
    }
]