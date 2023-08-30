'use client';

import { FullMessageType } from "@app/types";
import { useEffect, useRef, useState } from "react";
import useConversation from "@app/hooks/useConversation";

import MessageBox from "./MessageBox";

interface BodyProps { 
  initialMessages: FullMessageType [], 
}

const Body = ({ initialMessages }: BodyProps) => {
  const [ messages, setMessages ] = useState(initialMessages); 

  const bottomRef = useRef<HTMLDivElement>(null); 
  const { conversationId } = useConversation(); 

  useEffect( () => { 
    const seenMessage = async () => { 
      const response = await fetch(`/api/conversations/${conversationId}/seen`, { 
        method: "POST", 
        mode: 'cors', 
        headers: { 
          'Content-Type': 'application/json '
        }
      }); 
      console.log(response); 
    }; 

    seenMessage(); 

  }, [conversationId]); 


  return (
    <div className = 'flex-1 overflow-y-auto'>
      <>

        { messages.map((message, i) => { 
          return ( 
            <MessageBox 
              isLast = { i === messages.length - 1} 
              key = { message.id }
              data = { message }
              /> 
          )
        })}
        <div 
          ref = { bottomRef }
          className = 'pt-24'
        /> 
      </>
    </div>
  )
}

export default Body