import Sidebar from '@components/sidebar/Sidebar';
import ConversationList from './components/ConversationList';

import getConversations from '@app/actions/getConversations';

const ConversationsLayout = async ({ children }: { children: React.ReactNode}) => {
    const conversations = await getConversations(); 

  return (
    // @ts-expect-error Server Component
    <Sidebar>
        <div className = 'h-full'>
            <ConversationList initialItems = { conversations } /> 
            { children }
        </div>
    </Sidebar>
  )
}

export default ConversationsLayout