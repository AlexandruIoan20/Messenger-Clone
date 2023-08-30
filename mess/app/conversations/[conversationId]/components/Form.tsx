'use client'; 

import useConversation from "@app/hooks/useConversation";
import { CldUploadButton } from "next-cloudinary";
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

import { HiPhoto, HiPaperAirplane } from "react-icons/hi2";
import MessageInput from "./MessageInput";

const Form = () => {
    const { conversationId } = useConversation(); 

    const { register, handleSubmit, setValue, 
            formState: { errors }} = useForm <FieldValues>  ({ 
        defaultValues: { 
            message: ""
        }
    }); 

    const onSubmit: SubmitHandler <FieldValues> = (data) => { 
        setValue('message', "",  { shouldValidate: true })
        fetch('/api/messages',{ 
            method: "POST", 
            mode: "cors", 
            body: JSON.stringify({ 
                ...data, conversationId
            }), 
            headers: { 
                'Content-Type': "application/json"
            }
        })
    }; 

    const handleUpload = (result: any) => { 
        fetch('/api/messages',{ 
            method: "POST", 
            mode: "cors", 
            body: JSON.stringify({ 
                image: result?.info?.secure_url, conversationId
            }), 
            headers: { 
                'Content-Type': "application/json"
            }
        })
    }
  return (
    <div
        className = 'py-4 px-4 flex bg-white border-t items-center gap-2 lg:gap-4 w-full'
    >
        <CldUploadButton
            options = { { maxFiles: 1 }}
            onUpload = { handleUpload }
            uploadPreset = 'wnpjresi'
        >
            <HiPhoto size = { 30 } className = 'text-sky-500' /> 
        </CldUploadButton>
        <form
            onSubmit={handleSubmit(onSubmit)}
            className = 'flex items-center gap-2 lg:gap-4 w-full'
        >
            <MessageInput 
                id = 'message'
                register = { register }
                errors = { errors }
                required
                placeholder = 'Write a message'
            /> 
            <button 
                type = 'submit'
                className = 'rounded-full p-2 bg-sky-500 cursor-pointer hover:bg-sky-600 transition'
            >
                <HiPaperAirplane size = { 18 } className = 'text-white' /> 
            </button>
        </form>
    </div>
  )
}

export default Form