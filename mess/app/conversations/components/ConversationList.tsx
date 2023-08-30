'use client'; 
import { FullConversationType } from "@app/types";

interface ConversationListProps { 
    initialItems: FullConversationType []
}

const ConversationList = ({ initialItems }: ConversationListProps) => {
  return (
    <div>ConversationList</div>
  )
}

export default ConversationList; 