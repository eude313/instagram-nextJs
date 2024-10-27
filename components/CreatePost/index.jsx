'use client';


import React, { useState, } from 'react';
import { useModal } from "@/contexts/ModalContext";
import { Modal, ModalContent, ModalBody, Button, Divider } from "@nextui-org/react";
import { Close, } from '@/icons';

export default function CreatePost(isScreenSmall) {
    const { modalState, closeModal } = useModal();

    return (
        <Modal
            size={isScreenSmall ? 'full' : 'md'}
            radius='md'
            classNames={{
                body: "bg-[#DBDBDB] dark:bg-[#262626]",
                closeButton: `${isScreenSmall ? 'block' : "hidden"}`,
            }}
            onClose={closeModal}
            isOpen={modalState.isOpen && modalState.type === 'createPostModal'}
        >
            <Button isIconOnly onPress={closeModal} aria-label="close" className="bg-inherit absolute top-0 right-0 m-4">
                <Close />
            </Button>
            <ModalContent>
                <ModalBody className='px-0'>
                    <div className="flex justify-center my-2 border-b border-b-[#DBDBDB] dark:border-b-[#262626]">
                        <h2 className="font-semibold">Create Post</h2>
                    </div>
                    <Divider />
                    <form className="space-y-4 mb-3 flex justify-center min-h-[380px]">
                        <div className='my-auto'>
                            <h2 className='text-base mb-2'>Drag photos and video here</h2>
                            <div>
                                <Button
                                    size="md"
                                    color="primary"
                                    className="font-semibold"
                                >
                                    Select from computer
                                </Button>
                                <input
                                    id="profile-picture-input"
                                    type="file"
                                    hidden
                                />
                            </div>
                        </div>
                    </form>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}