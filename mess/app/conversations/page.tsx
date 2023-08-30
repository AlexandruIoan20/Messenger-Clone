'use client'; 
import clsx from "clsx";

import { useMemo } from "react";
import { useParams } from "next/navigation";

import useConversation from "@app/hooks/useConversation";
import EmptyState from "@components/EmptyState";

const Home = () => { 
    const { isOpen } = useConversation(); 

    return ( 
        <div>
            <EmptyState /> 
        </div>
    )
}; 

export default Home; 