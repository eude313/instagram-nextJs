'use client';

import Link from "next/link";
import React, { useState, } from 'react';
import { useModal } from "@/contexts/ModalContext";
import { Modal, ModalContent, ModalBody, Button, Input, Checkbox } from "@nextui-org/react";
import { Close, Instagram } from '@/icons';

export default function AuthModal() {
  const { modalState, closeModal } = useModal();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);


  return (
    <Modal
      size='sm'
      radius='md'
      classNames={{
        body: "bg-[#DBDBDB] dark:bg-[#262626]",
        closeButton: "hidden",
      }}
      onClose={closeModal}
      isOpen={modalState.isOpen && modalState.type === 'authModal'}
    >
      <Button isIconOnly onPress={closeModal} aria-label="close" className="bg-inherit absolute top-0 right-0 m-4">
        <Close />
      </Button>
      <ModalContent>
        <ModalBody>
          <div className="flex justify-center my-3">
            <Instagram width="170" height='50' />
          </div>
          <form className="space-y-4 mb-3">
            <Input
              required
              size="sm"
              type="email"
              label="Email"
              value={email}
              radius="none"
              onChange={(e) => setEmail(e.target.value)}
              classNames={{
                label: "text-black/50 dark:text-white/90",
                input: [
                  "bg-transparent",
                  "text-black/90 dark:text-white/90",
                ],
                innerWrapper: "bg-transparent",
                inputWrapper: [
                  "group-data-[focus=true]:bg-[#1A1A1A]",
                  "dark:group-data-[focus=true]:bg-default/30",
                  "!cursor-text",
                  "border border-[#DBDBDB] dark:border-[#262626]",
                ],
              }}
            />
            <Input
              size="sm"
              radius="none"
              type={isVisible ? "text" : "password"}
              label="Password"
              value={password}
              endContent={
                <h2
                  className="text-sm font-semibold my-auto text-[#1c2b33] dark:text-[#4CB5F9] cursor-pointer"
                  onClick={toggleVisibility}
                >
                  {isVisible ? 'Hide' : 'Show'}
                </h2>
              }
              classNames={{
                label: "text-black/50 dark:text-white/90",
                input: [
                  "bg-transparent",
                  "text-black/90 dark:text-white/90",
                ],
                innerWrapper: "bg-transparent",
                inputWrapper: [
                  "group-data-[focus=true]:bg-default/30",
                  "dark:group-data-[focus=true]:bg-default/60",
                  "!cursor-text",
                  "border border-[#DBDBDB] dark:border-[#262626]",
                ],
              }}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Checkbox className="my-2">
              Save login info
            </Checkbox>
            <Button fullWidth type="submit" color='primary' className="text-white font-semibold">
              Log in
            </Button>
            <div className="text-[#1c2b33] dark:text-primary text-center">
              <Link href="/auth/password-reset" className="mb-2 text-md">
                Forgot password?
              </Link>
            </div>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}