import { pusherClient } from "@app/libs/pusher";
import { Channel, Members } from "pusher-js";
import { useEffect, useState } from "react";
import useActiveList from "./useActiveList";

const useActiveChanel = () => { 
    const { set, add, remove } = useActiveList();
    const [ activeChanel, setActiveChanel ] = useState <Channel | null >(null); 

    useEffect( () => { 
        let channel = activeChanel; 

        if(!channel) { 
            channel = pusherClient.subscribe('presence-messenger');
            setActiveChanel(channel); 
        }

        channel.bind('pusher:subscription_succeded', (members: Members) => { 
            const initialMembers: string [] = [] ;
            members.each((member: Record<string, any > ) => initialMembers.push(member.id)); 
            set(initialMembers);
        }); 

        channel.bind('pusher:member_added', (member: Record<string, any>) => { 
            add(member.id); 
        }); 

        channel.bind('pusher:member_removed', (member: Record<string, any>) => { 
            remove(member.id)
        }); 

        return () => { 
            if(activeChanel) { 
                pusherClient.unsubscribe('presence-messenger'); 
                setActiveChanel(null); 
            }
        }
    }, [activeChanel, set, add, remove]); 
}

export default useActiveChanel; 