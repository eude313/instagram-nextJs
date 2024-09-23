'use client';

import React from 'react'
import { useRouter, useParams } from 'next/navigation';
import { Avatar } from '@nextui-org/react';
import {ScrollShadow} from "@nextui-org/react";
import { Phone, Video, Info, Emoji, Heart, Image, Mic } from '@/icons'; 
import EmojiPicker from 'emoji-picker-react';
import { AnimatePresence } from 'framer-motion';
import ScaleUpVertBottom from '@/Animation/ScaleUpVertBottom';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";

export default function ChatPage() {
  const { chatId } = useParams();
  const router = useRouter();
  
  const [message, setMessage] = React.useState("");
  const [isOpen, setIsOpen] = React.useState(false);
  const emojiPickerRef = React.useRef(null);

  const chatData = React.useMemo(() => {
    if (!chatId) {
      return { users: [] }; 
    }
    const userIds = chatId.split('-');
    return {
      users: userIds.map(id => ({
        id,
        name: `User ${id}`,
        username: `user${id}`,
        src: '/user.png',
        alt: `User ${id}'s avatar`
      }))
    };
  }, [chatId]);

  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };
  
  const toggleEmojiPicker = () => {
    setIsOpen(!isOpen); 
  };

  const handleEmojiSelect = (emojiObject) => {
    setMessage(prevMessage => prevMessage + emojiObject.emoji);
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

  const isGroupChat = chatData.users.length > 1;
  const mainUser = chatData.users[0] || { alt: 'default', src: '/default-avatar.png' };


  return (
    <div className="flex flex-col h-screen">
      <div className="flex justify-between border-b w-full border-[#DBDBDB] dark:border-[#262626] py-3 px-[12px] grow-0">
      <div className="flex">
        {isGroupChat ? (
          <Avatar.Group>
            {chatData.users.map(user => (
              <Avatar key={user.id} alt={user.alt} size="sm" src={user.src} />
            ))}
          </Avatar.Group>
        ) : mainUser ? (
          <Avatar alt={mainUser.alt} size="lg" className="flex-shrink-0" src={mainUser.src} />
        ) : (
          <Avatar size="lg" className="flex-shrink-0" src="/default-avatar.png" />
        )}
        <div className="flex flex-col ml-2">
          <span className="text-small">
            {isGroupChat ? `Group Chat (${chatData.users.length})` : mainUser ? mainUser.name : 'Loading...'}
          </span>
          <span className="text-tiny text-default-400">online</span>
        </div>
      </div>


        <div className="p-2 flex justify-around">
          <span className="mr-2">
            <Phone/>
          </span>
          <span className="mr-2">
            <Video/>
          </span>
          <Dropdown>
            <DropdownTrigger>
              <Info/>
            </DropdownTrigger>
            <DropdownMenu variant="faded" aria-label="Dropdown menu with icons">
              <DropdownItem
                key="copy"
                shortcut="⌘C"
                startContent='the'
              >
                Copy link
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
      <ScrollShadow className="w-full p-[12px] overflow-y-auto grow h-fit">
        <div className="w-full flex justify-center my-4">
          <div>
            <Avatar src={mainUser.src} alt={mainUser.alt} className="w-20 h-20 text-large" />
            <div className="flex flex-col text-center mb-2">
              <span className="text-small">{mainUser.name}</span>
              <span className="text-tiny text-default-400">{mainUser.username}</span>
            </div>
            <Button size="sm">
              View profile
            </Button>
          </div> 
        </div>
        <div className='flex flex-col-reverse'>
          <div className='flex flex-row gap-2' id='recieved chats'>
            <Avatar alt='alt' size="sm" className="flex-shrink-0" src='/user.png'/>
            <div className='rounded-full bg-[#262626] text-white w-auto'>
              <p className="text-small m-1 mx-2 text-left">dksjdksdbnncbnsid</p>
            </div>
          </div>
          <div className="m-1 flex justify-end"  id='sent chats'>
            <div className='rounded-full bg-[#3797F0] text-white flex flex-row gap-2 w-auto'>
              <p className="text-small m-1 mx-2 text-right">adcsabdcsadiad</p>
            </div>
          </div> 
        </div>
      </ScrollShadow>
      <div className="px-[12px] py-2 ">
        <div className="flex border w-full border-[#DBDBDB] grow-0 dark:border-[#262626] p-[5px] flex-row relative rounded-full">
          <span onClick={toggleEmojiPicker} className="mt-2 ml-2 cursor-pointer">
            <Emoji />
          </span>
          <AnimatePresence>
            {isOpen && (
              <ScaleUpVertBottom isVisible={isOpen}>
                <div className="bg-white dark:bg-black p-4 shadow-lg z-30 absolute bottom-[38px] right-0 left-0 w-full" ref={emojiPickerRef}>
                  <EmojiPicker 
                    className="bg-inherit border-none"
                    theme="auto"
                    onEmojiClick={handleEmojiSelect}
                  />
                </div>
              </ScaleUpVertBottom>
            )} 
          </AnimatePresence>
          <input
            type="text"
            placeholder="Send Message..."
            value={message}
            onChange={handleInputChange}
            className="mx-2 bg-inherit grow h-8 mt-1 border-none outline-none "
          />
          <div className={`cursor-pointer flex mt-2 ${!message ? 'block' : 'hidden'}`}>
            <span className="mr-2">
              <Mic/>
            </span>
            <span className="mr-2">
              <Image/>
            </span>
            <span className="mr-2">
              <Heart/>
            </span>
          </div>
          <h2
            type='submit'
            className={`mt-2 mr-2 cursor-pointer font-semibold text-[#1877F2] ${!message ? 'hidden' : 'block'}`}
          >
            Send
          </h2>
        </div>
      </div>
    </div>
  );
}



// 'use client';

// import React from 'react'
// import { useRouter, useParams} from 'next/navigation';
// import { Avatar } from '@nextui-org/react';
// import {Phone, Video, Info, Emoji, Heart, Image, Mic} from '@/icons'; 
// import EmojiPicker from 'emoji-picker-react';
// import { AnimatePresence } from 'framer-motion';
// import ScaleUpVertBottom from '@/Animation/ScaleUpVertBottom';
// import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button} from "@nextui-org/react";


// export default function ChatPage() {
//   const { chatId } = useParams();
//   const router = useRouter();
//   const { name, username, src, alt } = router.query || {};
  
//   const [message, setMessage] = React.useState("");
//   const [isOpen, setIsOpen] = React.useState(false);
//   const emojiPickerRef = React.useRef(null);

//   const handleInputChange = (e) => {
//     setMessage(e.target.value);
//   };
  
//   const toggleEmojiPicker = () => {
//     setIsOpen(!isOpen); 
//   };

//   const handleEmojiSelect = (emojiObject) => {
//     setMessage(prevMessage => prevMessage + emojiObject.emoji);
//   };


//   const handleClickOutside = (event) => {
//     if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target)) {
//       setIsOpen(false);
//     }
//   };

//   React.useEffect(() => {
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, []);

//   return (
//     <div class="flex flex-col h-screen">
//       <div class="flex justify-between border-b w-full border-[#DBDBDB] 
//         dark:border-[#262626] py-3 px-[12px] grow-0">
//         <div className="flex">
//           <Avatar alt={alt} size="lg" className="flex-shrink-0" src={src}/>
//           <div className="flex flex-col ml-2">
//             <span className="text-small">{name}</span>
//             <span className="text-tiny text-default-400">online</span>
//           </div>
//         </div>

//         <div class="p-2 flex justify-around">
//           <span className="mr-2">
//             <Phone/>
//           </span>
//           <span className="mr-2">
//             <Video/>
//           </span>
//           <Dropdown>
//             <DropdownTrigger>
//               <Info/>
//             </DropdownTrigger>
//             <DropdownMenu variant="faded" aria-label="Dropdown menu with icons">
//               <DropdownItem
//                 key="copy"
//                 shortcut="⌘C"
//                 startContent='the'
//               >
//                 Copy link
//               </DropdownItem>
//             </DropdownMenu>
//           </Dropdown>
//         </div>
//       </div>
//       <div className="w-full p-[12px] overflow-y-auto grow h-fit">
//         <div className="w-full flex justify-center my-4">
//           <div>
//             <Avatar src={src} alt={alt}  className="w-20 h-20 text-large" />
//             <div className="flex flex-col text-center mb-2">
//               <span className="text-small">{name}</span>
//               <span className="text-tiny text-default-400">{username}</span>
//             </div>
//             <Button size="sm">
//               View profile
//             </Button>
//           </div> 
//         </div>
//         <div className='flex flex-col-reverse'>
//           <div className='flex flex-row gap-2' id='recieved chats'>
//             <Avatar alt='alt' size="sm" className="flex-shrink-0" src='/user.png'/>
//             <div className='rounded-full bg-[#262626] text-white w-auto'>
//               <p className="text-small m-1 mx-2 text-left">dksjdksdbnncbnsid</p>
//             </div>
//           </div>
//           <div className="m-1 flex justify-end"  id='sent chats'>
//             <div className='rounded-full bg-[#3797F0] text-white flex flex-row gap-2 
//             w-auto'>
//               <p className="text-small m-1 mx-2 text-right">adcsabdcsadiad</p>
//             </div>
//           </div> 
//         </div>
//       </div>
//       <div class="px-[12px] py-2 ">
//         <div class="flex border w-full border-[#DBDBDB] grow-0
//           dark:border-[#262626] p-[5px] flex-row relative rounded-full">
//           <span onClick={toggleEmojiPicker} className="mt-2 ml-2 cursor-pointer">
//             <Emoji />
//           </span>
//           <AnimatePresence>
//             {isOpen && (
//               <ScaleUpVertBottom isVisible={isOpen}>
//                 <div className="bg-white dark:bg-black 
//                 p-4 shadow-lg z-30 absolute bottom-[38px] right-0 left-0 w-full" ref={emojiPickerRef}>
//                   <EmojiPicker 
//                     className="bg-inherit border-none"
//                     theme="auto"
//                     onEmojiClick={handleEmojiSelect}
//                   />
//                 </div>
//               </ScaleUpVertBottom>
//             )} 
//           </AnimatePresence>
//           <input
//             type="text"
//             placeholder="Send Message..."
//             value={message}
//             onChange={handleInputChange}
//             className="mx-2 bg-inherit grow h-8 mt-1 border-none outline-none "
//           />
//           <div
//             className={`cursor-pointer flex mt-2 ${!message ? 'block' : 'hidden'}`}>
//             <span className="mr-2">
//               <Mic/>
//             </span>
//             <span className="mr-2">
//               <Image/>
//             </span>
//             <span className="mr-2">
//               <Heart/>
//             </span>
//           </div>
//           <h2
//             type='submit'
//             className={`mt-2 mr-2 cursor-pointer font-semibold text-[#1877F2] ${!message ? 
//               'hidden' : 'block'}`}
//           >
//             Send
//           </h2>
//         </div>
//       </div>
//     </div>
//   );
// }