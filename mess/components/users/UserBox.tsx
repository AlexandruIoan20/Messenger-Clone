'use client';

import Avatar from '@components/Avatar';
import { User } from '@prisma/client'; 
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';

interface UserBoxProps { 
    data: User
}

const UserBox = ( { data }: UserBoxProps) => {
    const router = useRouter(); 
    const [ isLoading, setIsLoading ] = useState <boolean> (false); 

    const handleClick = useCallback(() => { 
        setIsLoading(true); 

        fetch('/api/conversations', { 
            method: "POST", 
            mode: 'cors', 
            body: JSON.stringify({ 
                userId: data.id
            }), 
            headers: { 
                'Content-Type': "application/json"
            }
        }).then((data) => { 
            console.log({ data }); 
        }).finally(() => { setIsLoading(false)}); 
    }, [data, router]); 

    
  return (
    <div
        onClick = { handleClick}
        className = 'w-full relative flex items-center space-x-3 bg-white p-3 hover:bg-neutral-100 rounded-lg transition cursor-pointer'
    >
        <Avatar user = { data } />
        <div className = 'min-w-0  flex-1'>
            <div className = 'focus:outline-none'>
                <div className = 'flex justify-between items-center mb-1'>
                    <p className = 'text-sm font-medium text-gray-900'>
                        { data.name }
                    </p>
                </div>
            </div>
        </div> 
    </div>
  )
}

export default UserBox