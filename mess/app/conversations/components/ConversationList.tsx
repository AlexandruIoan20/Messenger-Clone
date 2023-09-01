'use client'; 
import { FullConversationType } from "@app/types";

import { useSession } from "next-auth/react";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import useConversation from "@app/hooks/useConversation";

import { MdOutlineGroupAdd } from 'react-icons/md'; 
import ConversationBox from "./ConversationBox";
import GroupChatModal from "./GroupChatModal";

import clsx from "clsx";
import { User } from "@prisma/client";
import { pusherClient } from "@app/libs/pusher";
import { find, update } from "lodash";

interface ConversationListProps { 
    users: User [] 
    initialItems: FullConversationType []
}

const ConversationList = ({ users, initialItems }: ConversationListProps) => {
    const session = useSession(); 
    const router = useRouter(); 
    const { conversationId, isOpen } = useConversation(); 

    const [ items, setItems ] = useState(initialItems); 
    const [ isModalOpen, setIsModalOpen ] = useState <boolean> (false); 

    const pusherKey = useMemo( () => { 
        return session.data?.user?.email 
    }, [session.data?.user?.email]); 

    useEffect( () => {
        if(!pusherKey) { 
            return; 
        }

        pusherClient.subscribe(pusherKey); 

        const newHandler = (conversation: FullConversationType) => { 
            setItems( (current) => { 
                if(find(current, { id: conversation.id })) { 
                    return current; 
                }; 

                return [ conversation, ...current, ]; 
            })
        }

        const updateHandler = (conversation: FullConversationType) =>  {
            setItems( (current) => current.map((currentConversation) => { 
                if(currentConversation.id === conversation.id) { 
                    return { 
                        ...currentConversation, 
                        messages: conversation.messages
                    }
                };

                return currentConversation; 
            }))
        }

        pusherClient.bind('conversation:new', newHandler);
        pusherClient.bind('conversation:update', updateHandler); 
        
        return () => { 
            pusherClient.unsubscribe(pusherKey); 
            pusherClient.unbind('conversation:new', newHandler); 
            pusherClient.unbind('conversation:update', updateHandler); 
        }
    }, [pusherKey])
  return (
    <>
        <GroupChatModal 
            users = { users }
            isOpen = { isModalOpen }
            onClose = { () => { setIsModalOpen(false) }}
        /> 
        <aside className = { clsx(`
            fixed inset-y-0 pb-20 lg:pb-0 lg:left-20 lg:w-80 lg:block overflow-y-auto border-r border-gray-200
        `, 
        isOpen ? 'hidden' : 'block w-full left-0')}>
            <div className = 'px-5'>
                <div className = 'flex justify-between mb-4 pt-4'>
                    <div className = 'text-2xl font-bold text-neutral-800'>Messages</div>
                    <div 
                        onClick = { () => { setIsModalOpen(true) }}
                        className = 'rounded-full p-2 bg-gray-100 text-gray-600 cursor-pointer hover:opacity-75 transition'>
                        <MdOutlineGroupAdd size = { 20 } /> 
                    </div>
                </div>

                { items.map((item) => { 
                    return ( 
                        <ConversationBox key = { item.id } data = { item } selected = { conversationId === item.id } /> 
                    )
                })}
            </div>
        </aside>
    </>
  )
}

export default ConversationList; 