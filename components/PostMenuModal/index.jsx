'use client';

import React from 'react'
import { useModal } from "@/contexts/ModalContext"
import { Modal, ModalContent, ModalBody, Button, } from "@nextui-org/react";

const MenuModalStyles = `border-b border-b-[1px] border-b-[#dcdcdc] dark:border-b-[#3F3F46] p-2`;

export default function PostMenuModal() {
  const { modalState, closeModal } = useModal();

  return (
    <Modal
      size='sm'
      radius='sm'
      classNames={{
        body: "p-0 bg-[#DBDBDB] dark:bg-[#262626]",
        closeButton: "hidden",
      }}
      onClose={closeModal}
      isOpen={modalState.isOpen && modalState.type === 'postMenu'}
    >
      <ModalContent>
        <ModalBody className='gap-0'>
          <div className={MenuModalStyles}>
            <Button size='md'
              fullWidth color="danger" variant="light" className='text-md font-bold'>
              Report
            </Button>
          </div>
          <div className={MenuModalStyles}>
            <Button size='md'
              fullWidth color="danger" variant="light" className='text-md font-bold'>
              Unfollow
            </Button>
          </div>
          <div className={MenuModalStyles}>
            <Button size='md' className='text-md'
              fullWidth variant="light">
              Add to favorites
            </Button>
          </div>
          <div className={MenuModalStyles}>
            <Button size='md' className='text-md'
              fullWidth variant="light">
              Go to post
            </Button>
          </div>
          <div className={MenuModalStyles}>
            <Button size='md' className='text-md'
              fullWidth variant="light">
              Share to
            </Button>
          </div>
          <div className={MenuModalStyles}>
            <Button size='md' className='text-md'
              fullWidth variant="light">
              Copy link
            </Button>
          </div>
          <div className={MenuModalStyles}>
            <Button size='md' className='text-md'
              fullWidth variant="light">
              Embed
            </Button>
          </div>
          <div className={MenuModalStyles}>
            <Button size='md' className='text-md'
              fullWidth variant="light">
              About this account
            </Button>
          </div>
          <div className='p-2'>
            <Button size='md' className='text-md'
              fullWidth variant="light"
              onPress={closeModal}> Cancel
            </Button>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
