'use client';

import { FullMessageType } from "@app/types";
import { useEffect, useRef, useState } from "react";
import useConversation from "@app/hooks/useConversation";

import MessageBox from "./MessageBox";
import { pusherClient } from "@app/libs/pusher";
import { find, update } from "lodash";

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

  useEffect( () => {
    const messageHandler = (message: FullMessageType) => { 
      fetch(`/api/conversations/${conversationId}/seen`, { //alert that we seen the message
        method: "POST", 
        mode: 'cors', 
        headers: { 
          'Content-Type': 'application/json '
        }
      }); 

      setMessages( (current) => { 
        if(find(current, { id: message.id })) { //cauta daca in lista cu mesaje exista deja un mesaj cu id-ul mesajului pe care vrem sa il adaugam
          return current; //daca exita ce am spus mai sus, nu adauga nimic
        }

        return [ ...current, message ]; // adauga mesajul la lista 
      }); 

      bottomRef?.current?.scrollIntoView(); //scroll back into view
    }
    //subscribes to pusher every user that listens the conversationId 
    pusherClient.subscribe(conversationId); 

    //scrolls down in the conversation
    bottomRef?.current?.scrollIntoView(); 

    //bind pusher client to expect the key messages:new
    pusherClient.bind('messages:new', messageHandler); 
    //bind pusher client to seen route

    const updateMessageHandler = (newMessage: FullMessageType) => { //update in timp real a oamenilor care vad mesajul 
      setMessages((current) => current.map((currentMessage) => { 
        if(currentMessage.id === newMessage.id) { 
          return newMessage; 
        }

        return currentMessage; 
      }))
    }
    pusherClient.bind('message:update', updateMessageHandler); 

    return () => { 
      pusherClient.unsubscribe(conversationId); 
      pusherClient.unbind('messages:new', messageHandler); 
      pusherClient.unbind('message:update', updateMessageHandler); 
    }
  }, [conversationId])

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