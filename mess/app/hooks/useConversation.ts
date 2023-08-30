import { useMemo } from "react";

const useConversation = (conversationId: string) => {
    const isOpen = useMemo(() => !!conversationId, [conversationId]);

    return {
        isOpen,
    };
};

export default useConversation;


{/* 
  const conversationId = useMemo(() => {
    if (!params?.conversationId) {
      return '';
    }

    return params.conversationId as string;
  }, [params?.conversationId]);*/}