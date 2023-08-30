'use client'; 

import { Conversation } from '@prisma/client'; 

interface ConversationListProps { 
    initialItems: Conversation []
}

const ConversationList = ({ initialItems }: ConversationListProps) => {
  return (
    <div>ConversationList</div>
  )
}

export default ConversationList; 