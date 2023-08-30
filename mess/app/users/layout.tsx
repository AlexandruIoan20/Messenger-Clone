import React from 'react'; 
import getUsers from '@app/actions/getUsers';

import Sidebar from '@components/sidebar/Sidebar';
import UsersList from '@components/users/UsersList';

const UsersLayout = async ({ children }: { children: React.ReactNode}) => {
  const users = await getUsers(); 
  return (
    // @ts-expect-error Server Component
    <Sidebar>
        <div className = 'h-full'>
          <UsersList items = { users } />
            { children }
        </div>
    </Sidebar>
  )
}

export default UsersLayout