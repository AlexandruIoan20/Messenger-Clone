'use client'; 

import useConversation from "@app/hooks/useConversation";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { toast } from "react-hot-toast";

import Modal from "@components/Modal";
import { FiAlertTriangle } from 'react-icons/fi'; 
import { Dialog } from "@headlessui/react";

interface Props { 
    isOpen?: boolean,
    onClose: () => void, 
}

const ConfirmModal = ({ isOpen, onClose }: Props) => {
    const router = useRouter(); 
    const { conversationId } = useConversation(); 

    const [ isLoading, setIsLoading ] = useState<boolean> (false); 
    
    const onDelete = useCallback( () => { 
        setIsLoading(true); 

        fetch(`/api/conversations/${conversationId}`, { 
            method: "DELETE", 
            mode: "cors", 
            headers: { 
                'Content-Type': "application/json"
            }
        }).then( () => { 
            onClose(); 
            router.push("/conversations"); 
            router.refresh(); 
        }).catch(() => { 
            toast.error("Something went wrong!")
        }).finally( () => { setIsLoading(false)})
    },  [])
  return (
    <Modal isOpen = { isOpen } onClose = { onClose }>
        <div className = 'sm:flex sm:items-start'>
            <div className = 'mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10'>
                <FiAlertTriangle className = 'h-6 w-6 text-red-600'/> 
            </div>
            <div className = 'mt-3 text-center sm:ml-4 sm:text-left'>
                <Dialog.Title
                    as = "h3"
                    className = 'text-base font-semibold leading-6 text-gray-900'
                >
                    Delete Conversation 
                </Dialog.Title>
                <div className = 'mt-2'>
                    <p className = 'text-sm text-gray-500'>
                        Are you sure you want to delete this conversation? This action cannot be undone.
                    </p>
                </div>
            </div>
        </div>
    </Modal>
  )
}

export default ConfirmModal