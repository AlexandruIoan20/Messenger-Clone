'use client'; 

import { useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

import { Conversation, User, Message } from "@prisma/client";
import { FullConversationType } from "@app/types";

import clsx from "clsx";
import { format } from "date-fns";

interface ConversationBoxProps { 
    data: FullConversationType, 
    selected?: boolean 
}

const ConversationBox = ({ data, selected }: ConversationBoxProps) => {
  return (
    <div>ConversationBox</div>
  )
}

export default ConversationBox