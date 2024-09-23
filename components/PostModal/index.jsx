'use client';

import React from 'react';
import { Modal, ModalContent, ModalBody, Image, Avatar} from "@nextui-org/react";
import { usePostModal } from '@/hooks/usePostModal'; 
import {Bookmark, Chat, DotsMenu, Emoji, Heart, Share,Close} from '@/icons'; 
import EmojiPicker from 'emoji-picker-react';
import { AnimatePresence } from 'framer-motion';
import ScaleUpVertBottom from '@/Animation/ScaleUpVertBottom';

export default function PostModal() {
  const { isPostModalOpen, currentPostId, closePostModal } = usePostModal();
  const [comment, setComment] = React.useState("");
  const [isOpen, setIsOpen] = React.useState(false);
  const emojiPickerRef = React.useRef(null);

  const handleInputChange = (e) => {
    setComment(e.target.value);
  };
  
  const toggleEmojiPicker = () => {
    setIsOpen(!isOpen); 
  };

  const handleEmojiSelect = (emojiObject) => {
    setComment(prevComment => prevComment + emojiObject.emoji);
  };


  const handleClickOutside = (event) => {
    if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);


  const post = currentPostId ? {
    id: currentPostId,
    content: `This is the content of post ${currentPostId}.`,
    imageUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026024d'
  } : null;

  if (!post) return null;

  return (
        <Modal  
            size='5xl'
            radius='sm'
            isOpen={isPostModalOpen} 
            onClose={closePostModal}
            classNames={{
            body: "p-0 min-h-[60vh] bg-black",
            closeButton: "hidden",}}>

            <button
            onClick={closePostModal}
            className="absolute top-0 right-0 m-4 p-2 z-999 rounded-full bg-white/10 hover:bg-white/20 text-white cursor-pointer"> 
            <Close/> </button>
    
            <ModalContent>
                <ModalBody>
                    <div className="flex flex-row min-h-[60vh] w-full overflow-x-hidden">
                        <div className="min-h-[60vh] grow relative">
                            <Image 
                                src={post.imageUrl} 
                                alt={post.title} 
                                radius='none'
                                layout="fill" 
                                objectFit="cover"  
                                className="absolute inset-0 z-20" 
                            />
                        </div>
                                            
                        <div className="border-l w-[410px] border-[#DBDBDB] dark:border-[#262626] min-h-[60vh] rounded-r-lg flex flex-col overflow-y-hidden">
                            <div className='flex flex-row py-2 gap-3 px-3 top'>
                            <div className="relative bg-gradient-to-tr from-[#FFC800] to-[#CC00BF] 
                                p-[2px] mt-0 bg-default text-default-foreground rounded-full">
                                <a href="#" className="block bg-white dark:bg-black p-[2px] rounded-full">
                                    <Avatar
                                    radius="full"
                                    className="text-sm"
                                    width={38}
                                    height={38}
                                    shadow='sm'
                                    src="./user.png"
                                    alt="cute kitty"
                                    />
                                </a>
                                </div>

                                <div className='mr-auto flex items-center'>
                                  <div>
                                        <p className='font-semibold text-sm '>kshdkbckidsab</p>
                                        <p className='text-sm font-light'>kdanckadndkjkasnckad</p>
                                    </div>
                                </div>
                                {/* should open postMenuModal */}
                                <div className='flex items-center'>
                                    <DotsMenu />
                                </div>
                            </div>
                            <div className="w-full p-[12px] overflow-y-auto border-y border-[#DBDBDB] dark:border-[#262626] grow">
                                <p>{post.content}</p>
                            </div>
                            <div className="pb-1">
                                <div className="border-b px-[12px] w-full border-[#DBDBDB] 
                                dark:border-[#262626]">
                                    <div className="flex flex-row mb-4">
                                        <span className="mt-2 mr-4">
                                            <Heart/>
                                        </span>
                                        <span className="mt-2 mr-4">
                                            <Chat/>
                                        </span>
                                        <span className="mt-2">
                                            <Share/>
                                        </span>
                                        <span className="ml-auto mt-2">
                                            <Bookmark/>
                                        </span>
                                    </div> 
                                    <div className="w-full mb-2">
                                        <p>Be the first to </p>
                                        <small>1 day ago</small>
                                    </div>
                                </div>
                                <div className="px-[12px] w-full flex flex-row relative">
                                    <span onClick={toggleEmojiPicker} className="mt-2 cursor-pointer">
                                        <Emoji />
                                    </span>
                                    <AnimatePresence>
                                        {isOpen && (
                                            <ScaleUpVertBottom isVisible={isOpen}>
                                                <div className="bg-white dark:bg-black border-t border-t-[#262626] p-4 shadow-lg z-30 absolute bottom-[38px] right-0 left-0 w-full" ref={emojiPickerRef}>
                                                    <EmojiPicker 
                                                        className="w-full bg-inherit border-none rounded-none"
                                                        theme="auto"
                                                        onEmojiClick={handleEmojiSelect}
                                                    />
                                                </div>
                                            </ScaleUpVertBottom>
                                        )} 
                                    </AnimatePresence>
                                    <input
                                        type="text"
                                        placeholder="Add a comment..."
                                        value={comment}
                                        onChange={handleInputChange}
                                        className="mx-2 bg-inherit grow h-8 mt-1 border-none outline-none "
                                    />
                                    <h2
                                        type='submit'
                                        className={`mt-2 cursor-pointer font-semibold ${!comment ? 'text-[#455563]' : 'text-[#1877F2]'}`}
                                        disabled={!comment}
                                    >
                                        Post
                                    </h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}