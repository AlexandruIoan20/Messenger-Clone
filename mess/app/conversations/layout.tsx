import Sidebar from '@components/sidebar/Sidebar';
import ConversationList from './components/ConversationList';

import getConversations from '@app/actions/getConversations';
import getUsers from '@app/actions/getUsers';

const ConversationsLayout = async ({ children }: { children: React.ReactNode}) => {
    const conversations = await getConversations(); 
    const users = await getUsers(); 

  return (
    <Sidebar>
        <div className = 'h-full'>
            <ConversationList 
              users = { users }
              initialItems = { conversations } /> 
            { children }
        </div>
    </Sidebar>
  )
}

export default ConversationsLayout