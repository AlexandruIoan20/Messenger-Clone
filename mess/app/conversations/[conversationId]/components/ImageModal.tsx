'use client'; 
import Modal from "@components/Modal";
import Image from "next/image";

interface Props { 
    src?: string | null, 
    isOpen?: boolean, 
    onClose: () => void, 
}

const ImageModal = ({ src, isOpen, onClose }: Props) => {
    if(!src) { 
        return null;
    }
  return (
    <Modal isOpen = { isOpen } onClose = { onClose }>
        <div className = 'w-80 h-80'>
            <Image
                alt = 'image'
                className = 'object-cover'
                fill
                src = { src }
            /> 
        </div>
    </Modal>
  )
}

export default ImageModal