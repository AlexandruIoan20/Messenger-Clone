'use client';
import useConversation from "@app/hooks/useConversation";
import useRoutes from "@app/hooks/useRoutes";
import MobileItem from "./MobileItem";
import { useState } from "react";
import SettingsModal from "./SettingsModal";
import Avatar from "@components/Avatar";
import { User } from "@prisma/client";

interface MobileFooterProps { 
    currentUser: User
  }
  

const MobileFooter = ({ currentUser }: MobileFooterProps) => {
    const routes = useRoutes(); 
    const { isOpen } = useConversation(); 
    const [ isModalOpen, setIsModalOpen ] = useState <boolean> (false); 

    if(isOpen) { 
        return null; 
    }

  return (
    <>
        <SettingsModal 
            currentUser = { currentUser }
            isOpen = { isModalOpen }
            onClose = { () => { setIsModalOpen(false)}}
        /> 
        <div 
            className = 'fixed justify-between w-full bottom-0 z-40 flex items-center bg-white border-t-[1px] lg:hidden'    
        >
            <div 
            onClick = { () => { setIsModalOpen(true)}}
            className = {` group 
            flex
            gap-x-3
            text-sm
            leading-6
            font-semibold 
            w-full
            justify-center
            p-2
            text-gray-500
            hover:text-black
            hover:bg-gray-100`}>
                <Avatar user = { currentUser } /> 
            </div>
            { 
                routes.map(route => { 
                    return ( 
                        <MobileItem 
                            key =  { route.href }
                            href = { route.href }
                            icon = { route.icon }
                            onClick = { route.onClick }
                            active = { route.active }
                        /> 
                    )
                })
            }
        </div>
    </>
  )
}

export default MobileFooter