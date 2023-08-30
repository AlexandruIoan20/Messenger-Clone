'use client'; 
import clsx from "clsx";

import { useMemo } from "react";
import { useParams } from "next/navigation";

import useConversation from "@app/hooks/useConversation";
import EmptyState from "@components/EmptyState";

const Home = () => { 
    const params = useParams(); 
    const conversationId = useMemo( () => { 
        if(!params?.conversationId) { 
            return ''; 
        }

        return params?.conversationId as string; 
    },  [params?.conversationId])
    const { isOpen } = useConversation(conversationId); 

    return ( 
        <div>
            <EmptyState /> 
        </div>
    )
}; 

export default Home; 