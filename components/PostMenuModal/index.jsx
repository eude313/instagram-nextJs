import React from 'react'

import { Modal, ModalContent, ModalBody,} from "@nextui-org/react";

export default function PostMenuModal() {
  return (
    <Modal  
    size='5xl'
    radius='sm'
    classNames={{
    body: "p-0 min-h-[60vh] bg-black",
    closeButton: "hidden",}}>

      <button
      className="absolute top-0 right-0 m-4 p-2 z-999 rounded-full bg-white/10 hover:bg-white/20 text-white cursor-pointer"> 
      </button>
      <ModalContent>
        <ModalBody>
          skfbkdjibfibs
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
