import { Conversation, Message, User } from "@prisma/client";

export type FullMessageType = Message & { 
    sender: User, 
    seen: User[], 
}; 

export type FullConversationType = Conversation & { 
    users?: User [], 
    messages: FullMessageType [], 
}; 

// Ai nevoie de tipurile astea pentru ca in getConversations ai folosit query-ul include pentru mai multe proprietati, ceea ce duce la nesincronizarea tipurilor back-front