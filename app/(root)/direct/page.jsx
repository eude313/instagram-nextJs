'use client';

import React from "react";
import { DirectIcon } from "@/icons";
import { Button } from "@nextui-org/react";
import { useModal } from "@/contexts/ModalContext";

export default function Page() {
  const { openModal } = useModal();

  return (
    <div className="flex items-center justify-center h-full w-full">
      <div className="flex flex-col space-y-2 p-4 text-center">
        <div className="flex justify-center">
          <DirectIcon/>
        </div>
        <div>
          <h2 className="text-xl">
            Your messages
          </h2>
        </div>
        <div>
          <p className="text-base text-[#c4c0bc]">Send a message to start a chat</p>
        </div>
        <div className="px-auto py-3">
          <Button className="bg-[#1877F2]" onPress={() => {openModal('searchModal')}}>
            Send Message 
          </Button>
        </div>
      </div>
    </div>
  );
}

