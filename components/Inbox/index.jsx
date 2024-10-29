// 'use client';

// import React from "react";
// import Link from "next/link";
// import { Message, Back } from "@/icons";
// import { Navigation, A11y } from 'swiper/modules';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { useModal } from "@/contexts/ModalContext";
// import {Tabs, Tab, Button, Avatar} from "@nextui-org/react";

// import 'swiper/css';
// import 'swiper/css/navigation';

// export default function Inbox() { 
//   const { openModal } = useModal();
//   const [selected, setSelected] = React.useState("login");

//   return (
//     <div className="flex w-full flex-col">
//       <div className="flex justify-between px-[12px] mt-3 md:mt-5 mb-4">
//         <Button
//           href="/"
//           as={Link}
//           isIconOnly  
//           className="bg-inherit -rotate-90 block md:hidden" 
//           aria-label="Back" 
//         >
//           <Back/>
//         </Button>
//         <Button 
//           className="text-medium bg-inherit mt-1" 
//           onPress={() => {openModal('authModal')}}
//           endContent={
//             <span className="rotate-180">
//               <Back width="15" height='15'/>
//             </span>
//           }
//         >
//           Username
//         </Button>
//         <Button isIconOnly  className="bg-inherit" aria-label="start chat" 
//         onPress={() => {openModal('searchModal')}}>
//           <Message/>
//         </Button> 
//       </div>
//       <div className="flex flex-col w-full">
//         <Tabs
//           fullWidth
//           size="md"
//           aria-label="Tabs form"
//           variant="underlined"
//           classNames={{
//             cursor: "bg-[#3797f0] w-full",
//             tabList: "border-b border-divider p-0 relative",
//             tabContent: "group-data-[selected=true]:text-[#3797f0] fw-semibold"
//           }}
//           selectedKey={selected}
//           onSelectionChange={setSelected}>
//           <Tab key="primary" title="Primary">
//             <Swiper
//               modules={[Navigation, A11y]}
//               spaceBetween={30}
//               slidesPerView={3}
//               navigation
//               scrollbar={{ draggable: true }}
//               className="custom-swiper mt-2 mb-4 h-auto">
//               <SwiperSlide>
//                 <div className='pt-9'> 
//                   <div className='flex flex-col relative w-auto justify-center'>
//                     <div className="absolute left-0 -top-8 z-20">
//                       <button className="ml-6 rounded-xl px-4 py-2 shadow-md
//                        bg-[#262626] relative z-20">
//                         Note
//                       </button>
//                       <div className='ml-8 h-[8px] w-[10px] bg-[#262626] rounded-full'>
//                       </div>
//                       <div className="h-1 w-1 ml-10 rounded-full bg-[#262626]"></div>
//                     </div>
//                     <Avatar src='/user.png' alt='hey' className="w-22 h-22 text-large" />
//                     <div className="px-[2px] mt-1 truncate text-center">
//                       <small className='text-medium'>Your note</small>
//                     </div>
//                   </div>
//                 </div>
//               </SwiperSlide>
//             </Swiper>
//             <div className="px-[18px]">
//               <div className="flex flex-col">
//                 <div className="flex">
//                   <Avatar alt='{alt}' size="lg" className="flex-shrink-0" src='/user.png'/>
//                   <div className="flex flex-col ml-2 pt-1">
//                     <span className="text-small">name</span>
//                     <span className="text-tiny text-default-400">online</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </Tab>
//           <Tab key="general" title="General">
//           </Tab>
//           <Tab key="requests" title="Requests">
//             <form className="flex flex-col gap-4 h-[300px]">

//               <div className="flex gap-2 justify-end">
//                 <Button fullWidth color="primary">
//                   Sign up
//                 </Button>
//               </div>
//             </form>
//           </Tab>
//         </Tabs>
//       </div>
//     </div>
//   );
// }
'use client';

import React from "react";
import Link from "next/link";
import { Message, Back } from "@/icons";
import { Navigation, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useModal } from "@/contexts/ModalContext";
import { Tabs, Tab, Button, Avatar } from "@nextui-org/react";
import ApiService from "@/lib/ApiService";

import 'swiper/css';
import 'swiper/css/navigation';

export default function Inbox() {
  const { openModal } = useModal();
  const [selected, setSelected] = React.useState("primary");
  const [chats, setChats] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState(null);
  const [isUserLoading, setIsUserLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        setIsUserLoading(true);
        const response = await ApiService.getCurrentUser();
        setCurrentUser(response);
      } catch (error) {
        console.error("Error fetching current user:", error);
        setError("Failed to load user information");
      } finally {
        setIsUserLoading(false);
      }
    };

    fetchCurrentUser();
  }, []);

  // Rest of your existing useEffect and rendering logic...

  const renderUserButton = () => {
    if (isUserLoading) {
      return (
        <Button
          className="text-medium bg-inherit mt-1"
          disabled
        >
          Loading...
        </Button>
      );
    }

    if (error) {
      return (
        <Button
          className="text-medium bg-inherit mt-1"
          onPress={() => openModal('authModal')}
        >
          Error loading user
        </Button>
      );
    }

    if (currentUser?.username) {
      return (
        <Button
          className="text-medium bg-inherit mt-1"
          onPress={() => openModal('authModal')}
          endContent={
            <span className="rotate-180">
              <Back width="15" height='15' />
            </span>
          }
        >
          {currentUser.username}
        </Button>
      );
    }

    return null;
  };


  // Fetch chats when component mounts
  React.useEffect(() => {
    const fetchChats = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await ApiService.getChats();
        setChats(Array.isArray(response) ? response : []);
      } catch (err) {
        console.error("Error fetching chats:", err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchChats();
  }, []);

  // React.useEffect(() => {
  //   const fetchChats = async () => {
  //     try {
  //       setIsLoading(true);
  //       setError(null);
  //       const response = await ApiService.getChats();
  //       setChats(response);
  //     } catch (err) {
  //       console.error("Error fetching chats:", err);
  //       setError(err.message);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   fetchChats();
  // }, []);

  const renderChatList = () => {
    if (isLoading) {
      return (
        <div className="flex justify-center items-center h-40">
          <span className="loading loading-spinner"></span>
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex justify-center items-center h-40 text-red-500">
          <p>Error loading chats: {error}</p>
        </div>
      );
    }

    if (chats.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center h-40">
          <p className="text-default-400">No chats yet</p>
        </div>
      );
    }

    return chats.map((chat) => (
      <Link href={`/chats/${chat.id}`} key={chat.id}>
        <div className="flex items-center p-4 hover:bg-default-100 cursor-pointer">
          {chat.type === 'single' ? (
            <Avatar
              src={chat.participants[0]?.profile_picture || '/user.png'}
              alt={chat.participants[0]?.username || 'User'}
              className="flex-shrink-0"
            />
          ) : (
            <Avatar.Group>
              {chat.participants.slice(0, 3).map((participant) => (
                <Avatar
                  key={participant.id}
                  src={participant.profile_picture || '/user.png'}
                  alt={participant.username || 'User'}
                  className="flex-shrink-0"
                />
              ))}
            </Avatar.Group>
          )}
          <div className="ml-3 flex-grow">
            <div className="flex justify-between items-center">
              <span className="font-medium">
                {chat.type === 'single'
                  ? chat.participants[0]?.username || 'User'
                  : chat.name || `Group (${chat.participants.length})`
                }
              </span>
              {chat.last_message?.timestamp && (
                <span className="text-small text-default-400">
                  {new Date(chat.last_message.timestamp).toLocaleDateString()}
                </span>
              )}
            </div>
            {chat.last_message && (
              <p className="text-small text-default-400 truncate">
                {chat.last_message.content}
              </p>
            )}
          </div>
        </div>
      </Link>
    ));
  };

  return (
    <div className="flex w-full flex-col">
      <div className="flex justify-between px-[12px] mt-3 md:mt-5 mb-4">
        <Button
          href="/"
          as={Link}
          isIconOnly
          className="bg-inherit -rotate-90 block md:hidden"
          aria-label="Back"
        >
          <Back />
        </Button>
        {/* <Button
          className="text-medium bg-inherit mt-1"
          onPress={() => { openModal('authModal') }}
          endContent={
            <span className="rotate-180">
              <Back width="15" height='15' />
            </span>
          }
        >
          {currentUser.user.username}
        </Button> */}
        {renderUserButton()}
        <Button
          isIconOnly
          className="bg-inherit"
          aria-label="start chat"
          onPress={() => { openModal('searchModal') }}
        >
          <Message />
        </Button>
      </div>
      <div className="flex flex-col w-full">
        <Tabs
          fullWidth
          size="md"
          aria-label="Tabs form"
          variant="underlined"
          classNames={{
            cursor: "bg-[#3797f0] w-full",
            tabList: "border-b border-divider p-0 relative",
            tabContent: "group-data-[selected=true]:text-[#3797f0] fw-semibold"
          }}
          selectedKey={selected}
          onSelectionChange={setSelected}
        >
          <Tab key="primary" title="Primary">
            <Swiper
              modules={[Navigation, A11y]}
              spaceBetween={30}
              slidesPerView={3}
              navigation
              scrollbar={{ draggable: true }}
              className="custom-swiper mt-2 mb-4 h-auto">
              <SwiperSlide>
                <div className='pt-9'>
                  <div className='flex flex-col relative w-auto justify-center'>
                    <div className="absolute left-0 -top-8 z-20">
                      <button className="ml-6 rounded-xl px-4 py-2 shadow-md
                       bg-[#262626] relative z-20">
                        Note
                      </button>
                      <div className='ml-8 h-[8px] w-[10px] bg-[#262626] rounded-full'>
                      </div>
                      <div className="h-1 w-1 ml-10 rounded-full bg-[#262626]"></div>
                    </div>
                    <Avatar src='/user.png' alt='hey' className="w-22 h-22 text-large" />
                    <div className="px-[2px] mt-1 truncate text-center">
                      <small className='text-medium'>Your note</small>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            </Swiper>
            <div className="px-[18px]">
              {renderChatList()}
            </div>
          </Tab>
          <Tab key="general" title="General">
            <Swiper
              modules={[Navigation, A11y]}
              spaceBetween={30}
              slidesPerView={3}
              navigation
              scrollbar={{ draggable: true }}
              className="custom-swiper mt-2 mb-4 h-auto">
              <SwiperSlide>
                <div className='pt-9'>
                  <div className='flex flex-col relative w-auto justify-center'>
                    <div className="absolute left-0 -top-8 z-20">
                      <button className="ml-6 rounded-xl px-4 py-2 shadow-md
                       bg-[#262626] relative z-20">
                        Note
                      </button>
                      <div className='ml-8 h-[8px] w-[10px] bg-[#262626] rounded-full'>
                      </div>
                      <div className="h-1 w-1 ml-10 rounded-full bg-[#262626]"></div>
                    </div>
                    <Avatar src='/user.png' alt='hey' className="w-22 h-22 text-large" />
                    <div className="px-[2px] mt-1 truncate text-center">
                      <small className='text-medium'>Your note</small>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            </Swiper>
            <div className="p-4 text-center text-default-400">
              General messages will appear here
            </div>
          </Tab>
          <Tab key="requests" title="Requests">
            <div className="p-4 text-center text-default-400">
              Message requests will appear here
            </div>
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}