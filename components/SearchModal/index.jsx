// // 'use client';

// // import {
// //   Modal,
// //   Button,
// //   Input,
// //   ModalBody,
// //   ModalContent,
// //   Avatar,
// //   Radio,
// //   RadioGroup,
// //   Spinner,
// //   cn,
// //   Divider
// // } from '@nextui-org/react';
// // import { Close, CheckMark } from '@/icons';
// // import debounce from 'lodash/debounce';
// // import ApiService from '@/lib/ApiService';
// // import { useRouter } from 'next/navigation';
// // import { useModal } from '@/contexts/ModalContext';
// // import { useMediaQuery } from '@/hooks/useMediaQuery';
// // import React, { useState, useCallback, useEffect } from 'react';

// // export default function SearchModal(User) {
// //   const router = useRouter();
// //   const { modalState, closeModal } = useModal();
// //   const [isLoading, setIsLoading] = useState(false);
// //   const [searchQuery, setSearchQuery] = useState('');
// //   const [searchResults, setSearchResults] = useState([]);
// //   const [selectedUser, setSelectedUser] = useState(null);
// //   const [currentUser, setCurrentUser] = useState(null);
// //   const isSmallScreen = useMediaQuery('(max-width: 768px)');


// //   const hasStory = User.has_story;
// //   const isAdmin = User.is_staff;
// //   const isVerified = User.is_verified;

// //   useEffect(() => {
// //     const fetchCurrentUser = async () => {
// //       try {
// //         const user = await ApiService.getCurrentUser();
// //         setCurrentUser(user);
// //       } catch (error) {
// //         console.error("Error fetching current user:", error);
// //       }
// //     };

// //     fetchCurrentUser();
// //   }, []);

// //   const debouncedSearch = useCallback(
// //     debounce(async (query) => {
// //       if (query.trim()) {
// //         setIsLoading(true);
// //         try {
// //           const results = await ApiService.searchUsers(query);
// //           setSearchResults(results);
// //         } catch (error) {
// //           console.error("Error searching users:", error);
// //           // You might want to show an error message to the user here
// //         } finally {
// //           setIsLoading(false);
// //         }
// //       } else {
// //         setSearchResults([]);
// //       }
// //     }, 300),
// //     []
// //   );

// //   const handleInputChange = (e) => {
// //     const query = e.target.value;
// //     setSearchQuery(query);
// //     debouncedSearch(query);
// //   };

// //   const handleChat = () => {
// //     if (selectedUser && currentUser) {
// //       closeModal();
// //       const chatId = [currentUser.id, selectedUser.id].sort().join('-');
// //       const url = `/direct/inbox/${chatId}`;

// //       if (isSmallScreen) {
// //         router.push(url);
// //       } else {
// //         router.push(url, undefined, { shallow: true });
// //       }
// //     }
// //   };

// //   return (
// //     <Modal
// //       placement='top'
// //       onClose={closeModal}
// //       classNames={{
// //         body: "bg-[#DBDBDB] dark:bg-[#262626]",
// //         closeButton: "hidden",
// //       }}
// //       isOpen={modalState.isOpen && modalState.type === 'searchModal'}>

// //       <Button isIconOnly onPress={closeModal} aria-label="close" className="bg-inherit absolute top-0 right-0 m-4">
// //         <Close />
// //       </Button>
// //       <ModalContent>
// //         <ModalBody className='px-0'>
// //           <div className="flex justify-center my-2 border-b border-b-[#DBDBDB] dark:border-b-[#262626]">
// //             <h2 className="font-semibold">Search</h2>
// //           </div>
// //           <Divider />

// //           <div className="px-2">
// //             <Input
// //               clearable
// //               label="Search"
// //               placeholder="Type here..."
// //               value={searchQuery} 
// //               className="mb-2"
// //               onChange={handleInputChange}
// //               endContent={isLoading ? <Spinner size="sm" /> : null} />
// //             <div>
// //               {searchResults.length > 0 && (
// //                 <RadioGroup
// //                   onChange={(value) => setSelectedUser(searchResults.find(user => user.id === value))}
// //                 >
// //                   {searchResults.map((user) => (
// //                     <Radio
// //                       key={user.id}
// //                       value={user.id}
// //                       classNames={{
// //                         base: cn(
// //                           "inline-flex m-0 bg-content1 hover:bg-content2 items-center justify-between",
// //                           "flex-row-reverse min-w-full cursor-pointer rounded-lg gap-x-2 py-2",
// //                         ),
// //                       }}
// //                     >
// //                       <div className="flex gap-2 items-center">
// //                         <div className={` mt-0 bg-default text-default-foreground rounded-full relative ${hasStory ? 'bg-gradient-to-tr from-[#FFC800] to-[#CC00BF] p-[2px]' : ''}`}>
// //                           <a href="#" className={`block rounded-full ${hasStory ? ' bg-white dark:bg-black p-[2px]' : ''} `}>
// //                             <Avatar
// //                               width={38}
// //                               shadow='sm'
// //                               height={38}
// //                               radius="full"
// //                               className="text-sm"
// //                               alt={user.username}
// //                               src={user.profile_picture}
// //                             />
// //                           </a>
// //                         </div>
// //                         <div className="flex flex-row">
// //                           <span className="text-small">{user.username}</span>
// //                           {(isAdmin || isVerified) && (
// //                             <span className='mt-1.5'>
// //                               <CheckMark
// //                                 className={isAdmin ? 'text-green-500' : 'text-blue-500'}
// //                                 fill={isAdmin ? 'green' : 'blue'}
// //                               />
// //                             </span>
// //                           )}
// //                         </div>
// //                       </div>
// //                     </Radio>
// //                   ))}
// //                 </RadioGroup>
// //               )}
// //               {searchQuery && !isLoading && searchResults.length === 0 && (
// //                 <p>No users found</p>
// //               )}
// //             </div>
// //             <Button  className="mt-2" fullWidth color="primary" onPress={handleChat} disabled={selectedUser}>
// //               Chat with {selectedUser?.username || 'selected user'}
// //             </Button>
// //           </div>
// //         </ModalBody>
// //       </ModalContent>
// //     </Modal>
// //   )
// // };


// 'use client';

// import {
//   Modal,
//   Button,
//   Input,
//   ModalBody,
//   ModalContent,
//   Avatar,
//   Checkbox,
//   Spinner,
//   cn,
//   Divider
// } from '@nextui-org/react';
// import { Close, CheckMark } from '@/icons';
// import debounce from 'lodash/debounce';
// import ApiService from '@/lib/ApiService';
// import { useRouter } from 'next/navigation';
// import { useModal } from '@/contexts/ModalContext';
// import { useMediaQuery } from '@/hooks/useMediaQuery';
// import React, { useState, useCallback, useEffect } from 'react';

// export default function SearchModal(User) {
//   const router = useRouter();
//   const { modalState, closeModal } = useModal();
//   const [isLoading, setIsLoading] = useState(false);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [searchResults, setSearchResults] = useState([]);
//   const [selectedUsers, setSelectedUsers] = useState([]);
//   const [currentUser, setCurrentUser] = useState(null);
//   const isSmallScreen = useMediaQuery('(max-width: 768px)');

//   const hasStory = User.has_story;
//   const isAdmin = User.is_staff;
//   const isVerified = User.is_verified;

//   useEffect(() => {
//     const fetchCurrentUser = async () => {
//       try {
//         const user = await ApiService.getCurrentUser();
//         setCurrentUser(user);
//       } catch (error) {
//         console.error("Error fetching current user:", error);
//       }
//     };

//     fetchCurrentUser();
//   }, []);

//   const debouncedSearch = useCallback(
//     debounce(async (query) => {
//       if (query.trim()) {
//         setIsLoading(true);
//         try {
//           const results = await ApiService.searchUsers(query);
//           setSearchResults(results);
//         } catch (error) {
//           console.error("Error searching users:", error);
//         } finally {
//           setIsLoading(false);
//         }
//       } else {
//         setSearchResults([]);
//       }
//     }, 300),
//     []
//   );

//   const handleInputChange = (e) => {
//     const query = e.target.value;
//     setSearchQuery(query);
//     debouncedSearch(query);
//   };

//   const handleUserSelect = (user) => {
//     setSelectedUsers(prev => {
//       const isSelected = prev.find(u => u.id === user.id);
//       if (isSelected) {
//         return prev.filter(u => u.id !== user.id);
//       }
//       return [...prev, user];
//     });
//   };

//   const handleStartChat = async () => {
//     if (selectedUsers.length > 0 && currentUser) {
//       closeModal();
//       try {
//         let chatId;
//         if (selectedUsers.length === 1) {
//           // For single user chat
//           chatId = [currentUser.id, selectedUsers[0].id].sort().join('-');
//         } else {
//           // For group chat, create a new chat room
//           const response = await ApiService.createGroupChat({
//             participants: [...selectedUsers.map(u => u.id), currentUser.id],
//             createdBy: currentUser.id
//           });
//           chatId = response.chatId;
//         }

//         const url = `/direct/inbox/${chatId}`;
//         if (isSmallScreen) {
//           router.push(url);
//         } else {
//           router.push(url, undefined, { shallow: true });
//         }
//       } catch (error) {
//         console.error("Error creating chat:", error);
//       }
//     }
//   };

//   return (
//     <Modal
//       placement='top'
//       onClose={closeModal}
//       classNames={{
//         body: "bg-[#DBDBDB] dark:bg-[#262626]",
//         closeButton: "hidden",
//       }}
//       isOpen={modalState.isOpen && modalState.type === 'searchModal'}>

//       <Button isIconOnly onPress={closeModal} aria-label="close" className="bg-inherit absolute top-0 right-0 m-4">
//         <Close />
//       </Button>
//       <ModalContent>
//         <ModalBody className='px-0'>
//           <div className="flex justify-center my-2 border-b border-b-[#DBDBDB] dark:border-b-[#262626]">
//             <h2 className="font-semibold">Search Users</h2>
//           </div>
//           <Divider />

//           <div className="px-2">
//             <Input
//               clearable
//               label="Search"
//               placeholder="Type to search users..."
//               value={searchQuery}
//               className="mb-2"
//               onChange={handleInputChange}
//               endContent={isLoading ? <Spinner size="sm" /> : null}
//             />
//             <div>
//               {searchResults.length > 0 && (
//                 <div className="flex flex-col gap-2">
//                   {searchResults.map((user) => (
//                     <div
//                       key={user.id}
//                       className="flex items-center justify-between p-2 hover:bg-content2 rounded-lg cursor-pointer"
//                       onClick={() => handleUserSelect(user)}
//                     >
//                       <div className="flex items-center gap-2">
//                         <div className={`relative ${hasStory ? 'bg-gradient-to-tr from-[#FFC800] to-[#CC00BF] p-[2px] rounded-full' : ''}`}>
//                           <Avatar
//                             size="sm"
//                             src={user.profile_picture}
//                             alt={user.username}
//                             className={hasStory ? 'bg-white dark:bg-black p-[2px]' : ''}
//                           />
//                         </div>
//                         <div className="flex items-center">
//                           <span className="text-sm">{user.username}</span>
//                           {(isAdmin || isVerified) && (
//                             <CheckMark
//                               className={`ml-1 ${isAdmin ? 'text-green-500' : 'text-blue-500'}`}
//                               fill={isAdmin ? 'green' : 'blue'}
//                             />
//                           )}
//                         </div>
//                       </div>
//                       <Checkbox
//                         isSelected={selectedUsers.some(u => u.id === user.id)}
//                         onChange={() => handleUserSelect(user)}
//                       />
//                     </div>
//                   ))}
//                 </div>
//               )}
//               {searchQuery && !isLoading && searchResults.length === 0 && (
//                 <p className="text-center text-default-400">No users found</p>
//               )}
//             </div>
//             <Button
//               className="mt-4"
//               fullWidth
//               color="primary"
//               onPress={handleStartChat}
//               disabled={selectedUsers.length === 0}
//             >
//               Start Chat {selectedUsers.length > 0 ? `(${selectedUsers.length})` : ''}
//             </Button>
//           </div>
//         </ModalBody>
//       </ModalContent>
//     </Modal>
//   );
// }

'use client';

import {
  Modal,
  Button,
  Input,
  ModalBody,
  ModalContent,
  Avatar,
  Checkbox,
  Spinner,
  cn,
  Divider,
  Chip
} from '@nextui-org/react';
import { Close, CheckMark } from '@/icons';
import debounce from 'lodash/debounce';
import ApiService from '@/lib/ApiService';
import { useRouter } from 'next/navigation';
import { useModal } from '@/contexts/ModalContext';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import React, { useState, useCallback, useEffect } from 'react';

export default function SearchModal(User) {
  const router = useRouter();
  const { modalState, closeModal } = useModal();
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const isSmallScreen = useMediaQuery('(max-width: 768px)');

  const hasStory = User?.has_story;
  const isAdmin = User?.is_staff;
  const isVerified = User?.is_verified;

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const user = await ApiService.getCurrentUser();
        setCurrentUser(user);
      } catch (error) {
        console.error("Error fetching current user:", error);
      }
    };

    fetchCurrentUser();
  }, []);

  const debouncedSearch = useCallback(
    debounce(async (query) => {
      if (query.trim()) {
        setIsLoading(true);
        try {
          const results = await ApiService.searchUsers(query);
          setSearchResults(results);
        } catch (error) {
          console.error("Error searching users:", error);
        } finally {
          setIsLoading(false);
        }
      } else {
        setSearchResults([]);
      }
    }, 300),
    []
  );

  const handleInputChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    debouncedSearch(query);
  };

  const handleUserSelect = (user) => {
    setSelectedUsers(prev => {
      const isSelected = prev.find(u => u.id === user.id);
      if (isSelected) {
        return prev.filter(u => u.id !== user.id);
      }
      return [...prev, user];
    });
  };

  const handleStartChat = async () => {
    if (selectedUsers.length > 0 && currentUser) {
      try {
        let chatId;
        if (selectedUsers.length === 1) {
          // For single user chat
          chatId = [currentUser.id, selectedUsers[0].id].sort().join('-');

          // Create or get existing chat
          await ApiService.createOrGetChat({
            participants: [currentUser.id, selectedUsers[0].id],
            type: 'single'
          });
        } else {
          // For group chat
          const response = await ApiService.createOrGetChat({
            participants: [currentUser.id, ...selectedUsers.map(u => u.id)],
            type: 'group'
          });
          chatId = response.chatId;
        }

        closeModal();

        // Navigate to chat page
        const chatRoute = `/direct/inbox/${chatId}`;
        router.push(chatRoute);

      } catch (error) {
        console.error("Error creating chat:", error);
      }
    }
  };

  // Reset selected users when modal closes
  useEffect(() => {
    if (!modalState.isOpen) {
      setSelectedUsers([]);
      setSearchQuery('');
      setSearchResults([]);
    }
  }, [modalState.isOpen]);

  return (
    <Modal
      placement='top'
      onClose={closeModal}
      classNames={{
        body: "bg-[#DBDBDB] dark:bg-[#262626]",
        closeButton: "hidden",
      }}
      isOpen={modalState.isOpen && modalState.type === 'searchModal'}>

      <Button isIconOnly onPress={closeModal} aria-label="close" className="bg-inherit absolute top-0 right-0 m-4">
        <Close />
      </Button>
      <ModalContent>
        <ModalBody className='px-0'>
          <div className="flex justify-center my-2 border-b border-b-[#DBDBDB] dark:border-b-[#262626]">
            <h2 className="font-semibold">
              {selectedUsers.length === 0 ? 'Search Users' :
                `Selected Users (${selectedUsers.length})`}
            </h2>
          </div>
          <Divider />

          <div className="px-2">
            <Input
              clearable
              label="Search"
              placeholder="Type to search users..."
              value={searchQuery}
              className="mb-2"
              onChange={handleInputChange}
              endContent={isLoading ? <Spinner size="sm" /> : null}
            />
            <div>
              {selectedUsers.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-2">
                  {selectedUsers.map((user) => (
                    <div
                      key={user.id}
                      className="gap-[2px] px-1 py-1"
                    >
                      <Chip
                        variant="flat"
                        onClose={() => handleUserSelect(user)}
                        avatar={
                          <Avatar
                            name={user.username}
                            src={user.profile_picture}
                            alt={user.username}
                          />
                        }
                      >
                        <div className="flex items-center">
                          <span className="text-sm">{user.username}</span>
                          {(isAdmin || isVerified) && (
                            <CheckMark
                              className={`ml-1 ${isAdmin ? 'text-green-500' : 'text-blue-500'}`}
                              fill={isAdmin ? 'green' : 'blue'}
                            />
                          )}
                        </div>
                      </Chip>
                    </div>
                  ))}
                </div>
              )}

              {searchResults.length > 0 && (
                <div className="flex flex-col gap-2 max-h-[300px] overflow-y-auto">
                  {searchResults.map((user) => (
                    <div
                      key={user.id}
                      className={cn(
                        "flex items-center justify-between p-2 hover:bg-content2 rounded-lg cursor-pointer",
                        selectedUsers.some(u => u.id === user.id) && "bg-content2"
                      )}
                      onClick={() => handleUserSelect(user)}
                    >
                      <div className="flex items-center gap-2">
                        <div className={`relative ${hasStory ? 'bg-gradient-to-tr from-[#FFC800] to-[#CC00BF] p-[2px] rounded-full' : ''}`}>
                          <Avatar
                            size="sm"
                            src={user.profile_picture}
                            alt={user.username}
                            className={hasStory ? 'bg-white dark:bg-black p-[2px]' : ''}
                          />
                        </div>
                        <div className="flex items-center">
                          <span className="text-sm">{user.username}</span>
                          {(isAdmin || isVerified) && (
                            <CheckMark
                              className={`ml-1 ${isAdmin ? 'text-green-500' : 'text-blue-500'}`}
                              fill={isAdmin ? 'green' : 'blue'}
                            />
                          )}
                        </div>
                      </div>
                      <Checkbox
                        isSelected={selectedUsers.some(u => u.id === user.id)}
                      />
                    </div>
                  ))}
                </div>
              )}
              {searchQuery && !isLoading && searchResults.length === 0 && (
                <p className="text-center text-default-400">No users found</p>
              )}
            </div>
            <Button
              className="mt-4"
              fullWidth
              color="primary"
              onPress={handleStartChat}
              isDisabled={selectedUsers.length === 0}
            >
              {selectedUsers.length === 0 ? 'Select Users to Chat' :
                selectedUsers.length === 1 ? 'Start Chat' :
                  `Start Group Chat (${selectedUsers.length} users)`}
            </Button>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}