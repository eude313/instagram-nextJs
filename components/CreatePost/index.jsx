// 'use client';


// import React, { useState, } from 'react';
// import { useModal } from "@/contexts/ModalContext";
// import { Modal, ModalContent, ModalBody, Button, Divider } from "@nextui-org/react";
// import { Close, } from '@/icons';

// export default function CreatePost(isScreenSmall) {
//     const { modalState, closeModal } = useModal();

//     return (
//         <Modal
//             size={isScreenSmall ? 'full' : 'md'}
//             radius='md'
//             classNames={{
//                 body: "bg-[#DBDBDB] dark:bg-[#262626]",
//                 closeButton: `${isScreenSmall ? 'block' : "hidden"}`,
//             }}
//             onClose={closeModal}
//             isOpen={modalState.isOpen && modalState.type === 'createPostModal'}
//         >
//             <Button isIconOnly onPress={closeModal} aria-label="close" className="bg-inherit absolute top-0 right-0 m-4">
//                 <Close />
//             </Button>
//             <ModalContent>
//                 <ModalBody className='px-0'>
//                     <div className="flex justify-center my-2 border-b border-b-[#DBDBDB] dark:border-b-[#262626]">
//                         <h2 className="font-semibold">Create Post</h2>
//                     </div>
//                     <Divider />
//                     <form className="space-y-4 mb-3 flex justify-center min-h-[380px]">
//                         <div className='my-auto'>
//                             <h2 className='text-base mb-2'>Drag photos and video here</h2>
//                             <div>
//                                 <Button
//                                     size="md"
//                                     color="primary"
//                                     className="font-semibold"
//                                 >
//                                     Select from computer
//                                 </Button>
//                                 <input
//                                     id="profile-picture-input"
//                                     type="file"
//                                     hidden
//                                 />
//                             </div>
//                         </div>
//                     </form>
//                 </ModalBody>
//             </ModalContent>
//         </Modal>
//     );
// }

import React, { useState, useRef, useEffect } from 'react';
import { Modal, ModalContent, ModalBody, Button, Input, Avatar } from "@nextui-org/react";
import {
    HiChevronLeft,
    HiMapPin,
    HiUsers,
    HiCog8Tooth,
    HiMagnifyingGlass,
    HiXMark,
    HiPhoto,
    HiChevronRight,
    HiPlus,
    HiTag,
    HiCamera
} from "react-icons/hi2";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import Draggable from 'react-draggable';
import Image from 'next/image';
import { useModal } from "@/contexts/ModalContext";

const CreatePost = (isScreenSmall) => {
    const [files, setFiles] = useState([]);
    const { modalState, closeModal } = useModal();
    const [activeSlide, setActiveSlide] = useState(0);
    const [caption, setCaption] = useState('');
    const [isTagMode, setIsTagMode] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [tags, setTags] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const fileInputRef = useRef(null);

    const handleSearchChange = (value) => {
        setSearchQuery(value);
        if (value.trim()) {
            // Simulate search results
            setSearchResults([
                { id: 1, username: 'user1', name: 'User One' },
                { id: 2, username: 'user2', name: 'User Two' },
            ]);
        } else {
            setSearchResults([]);
        }
    };

    const handleTagUser = (user) => {
        const newTag = {
            id: user.id,
            username: user.username,
            position: { x: 50, y: 50 },
            slideIndex: activeSlide
        };
        setTags(prev => [...prev, newTag]);
        setSearchQuery('');
        setSearchResults([]);
    };

    const handleFileSelect = (event) => {
        const selectedFiles = Array.from(event.target.files || []);
        const newFiles = selectedFiles.map(file => ({
            file,
            preview: URL.createObjectURL(file),
            type: file.type.startsWith('image/') ? 'image' : 'video'
        }));
        setFiles(prev => [...prev, ...newFiles]);
    };

    const removeFile = (index) => {
        setFiles(prev => {
            const newFiles = [...prev];
            URL.revokeObjectURL(newFiles[index].preview);
            newFiles.splice(index, 1);
            return newFiles;
        });
        if (activeSlide >= files.length - 1) {
            setActiveSlide(Math.max(0, files.length - 2));
        }
    };

    useEffect(() => {
        return () => {
            files.forEach(file => {
                URL.revokeObjectURL(file.preview);
            });
        };
    }, []);

    return (
        <Modal
            size={isScreenSmall ? 'md' : 'full'}
            radius='md'
            classNames={{
                body: "bg-[#DBDBDB] dark:bg-[#262626]",
                closeButton: `${isScreenSmall ? 'block' : "hidden"}`,
            }}
            onClose={closeModal}
            isOpen={modalState.isOpen && modalState.type === 'createPostModal'}
        >
            <ModalContent>
                <div className="flex flex-col h-full">
                    {/* Header */}
                    <div className="flex items-center justify-between p-4 border-b">
                        <Button
                            isIconOnly
                            variant="light"
                            onPress={closeModal}
                            className="absolute left-2"
                        >
                            <HiChevronLeft className="h-6 w-6" />
                        </Button>
                        <div className="flex-1 text-center font-semibold">
                            Create new post
                        </div>
                        <Button
                            color="primary"
                            variant="light"
                            className="absolute right-2"
                            isDisabled={files.length === 0}
                        >
                            Share
                        </Button>
                    </div>

                    {/* Main Content */}
                    <div className="flex flex-1 overflow-hidden">
                        {/* Left Side - Media Preview */}
                        <div className="w-2/3 bg-black flex items-center justify-center relative">
                            {files.length > 0 ? (
                                <>
                                    <Swiper
                                        modules={[Navigation, Pagination]}
                                        navigation={{
                                            nextEl: '.swiper-button-next',
                                            prevEl: '.swiper-button-prev',
                                        }}
                                        pagination={{ clickable: true }}
                                        onSlideChange={(swiper) => setActiveSlide(swiper.activeIndex)}
                                        className="w-full h-full"
                                    >
                                        {files.map((file, index) => (
                                            <SwiperSlide key={index} className="flex items-center justify-center bg-black">
                                                {file.type === 'image' ? (
                                                    <div className="relative w-full h-full flex items-center justify-center">
                                                        <Image
                                                            src={file.preview}
                                                            alt={`Preview ${index + 1}`}
                                                            width={500}
                                                            height={500}
                                                            className="max-h-full w-auto object-contain"
                                                            unoptimized
                                                        />
                                                        <Button
                                                            isIconOnly
                                                            className="absolute top-4 right-4 bg-black/50 text-white"
                                                            onClick={() => removeFile(index)}
                                                        >
                                                            <HiXMark className="h-4 w-4" />
                                                        </Button>
                                                        {tags
                                                            .filter(tag => tag.slideIndex === index)
                                                            .map((tag, tagIndex) => (
                                                                <Draggable
                                                                    key={tagIndex}
                                                                    defaultPosition={tag.position}
                                                                    bounds="parent"
                                                                >
                                                                    <div className="absolute bg-black/50 text-white px-2 py-1 rounded cursor-move">
                                                                        {tag.username}
                                                                    </div>
                                                                </Draggable>
                                                            ))}
                                                    </div>
                                                ) : (
                                                    <div className="relative w-full h-full flex items-center justify-center">
                                                        <video
                                                            src={file.preview}
                                                            controls
                                                            className="max-h-full max-w-full"
                                                        />
                                                        <Button
                                                            isIconOnly
                                                            className="absolute top-4 right-4 bg-black/50 text-white"
                                                            onClick={() => removeFile(index)}
                                                        >
                                                            <HiXMark className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                )}
                                            </SwiperSlide>
                                        ))}
                                        <div className="swiper-button-next">
                                            <HiChevronRight className="text-white h-8 w-8" />
                                        </div>
                                        <div className="swiper-button-prev">
                                            <HiChevronLeft className="text-white h-8 w-8" />
                                        </div>
                                    </Swiper>
                                    <Button
                                        className="absolute bottom-4 right-4 bg-white/90"
                                        startContent={<HiPhoto className="h-4 w-4" />}
                                        onClick={() => fileInputRef.current?.click()}
                                    >
                                        Add more
                                    </Button>
                                </>
                            ) : (
                                <div className="flex flex-col items-center gap-4">
                                    <HiCamera className="h-16 w-16" />
                                    <Button
                                        color="primary"
                                        onClick={() => fileInputRef.current?.click()}
                                        startContent={<HiPlus className="h-4 w-4" />}
                                    >
                                        Select photos or videos
                                    </Button>
                                </div>
                            )}
                            <input
                                type="file"
                                hidden
                                ref={fileInputRef}
                                onChange={handleFileSelect}
                                accept="image/*,video/*"
                                multiple
                            />
                        </div>

                        {/* Right Side - Details */}
                        <div className="w-1/3 border-l flex flex-col">
                            {/* Caption Input */}
                            <div className="p-4 border-b">
                                <textarea
                                    className="w-full resize-none outline-none"
                                    rows={4}
                                    placeholder="Write a caption..."
                                    value={caption}
                                    onChange={(e) => setCaption(e.target.value)}
                                />
                            </div>

                            {/* Options */}
                            <div className="flex flex-col">
                                <Button
                                    className="flex items-center justify-between p-4 hover:bg-gray-50"
                                    variant="light"
                                    onPress={() => setIsTagMode(true)}
                                    isDisabled={!files[activeSlide]?.type === 'image'}
                                >
                                    <div className="flex items-center gap-2">
                                        <HiTag className="h-5 w-5" />
                                        <span>Tag people</span>
                                    </div>
                                    <HiChevronRight className="h-5 w-5" />
                                </Button>

                                <Button
                                    className="flex items-center justify-between p-4 hover:bg-gray-50"
                                    variant="light"
                                >
                                    <div className="flex items-center gap-2">
                                        <HiMapPin className="h-5 w-5" />
                                        <span>Add location</span>
                                    </div>
                                </Button>

                                <Button
                                    className="flex items-center justify-between p-4 hover:bg-gray-50"
                                    variant="light"
                                >
                                    <div className="flex items-center gap-2">
                                        <HiCog8Tooth className="h-5 w-5" />
                                        <span>Advanced settings</span>
                                    </div>
                                    <HiChevronRight className="h-5 w-5" />
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Tag Search Overlay */}
                    {isTagMode && (
                        <div className="absolute inset-0 bg-white z-10">
                            <div className="flex items-center p-4 border-b">
                                <Button
                                    isIconOnly
                                    variant="light"
                                    onPress={() => setIsTagMode(false)}
                                >
                                    <HiChevronLeft className="h-6 w-6" />
                                </Button>
                                <span className="ml-4 font-semibold">Tag People</span>
                            </div>
                            <div className="p-4">
                                <Input
                                    placeholder="Search"
                                    value={searchQuery}
                                    onChange={(e) => handleSearchChange(e.target.value)}
                                    startContent={<HiMagnifyingGlass className="h-4 w-4 text-gray-400" />}
                                    classNames={{
                                        input: "bg-gray-100"
                                    }}
                                />
                                {searchResults.map(user => (
                                    <div
                                        key={user.id}
                                        className="flex items-center p-2 hover:bg-gray-50 cursor-pointer"
                                        onClick={() => handleTagUser(user)}
                                    >
                                        <Avatar size="sm" />
                                        <div className="ml-2">
                                            <div className="font-semibold">{user.username}</div>
                                            <div className="text-sm text-gray-500">{user.name}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </ModalContent>
        </Modal>
    );
};

export default CreatePost;


// import ApiService from '@/lib/ApiService';
// import React, { useState, useRef, useEffect } from 'react';
// import { useModal } from "@/contexts/ModalContext";
// import { Modal, ModalContent, ModalBody, Button, Divider, Textarea, Input, Select, SelectItem } from "@nextui-org/react";
// import { Bookmark, Chat, Back, Person, Search } from '@/icons';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Navigation, Pagination } from 'swiper/modules';
// import Draggable from 'react-draggable';
// import Image from 'next/image';
// import debounce from 'lodash/debounce';

// const CreatePost = ({ isScreenSmall }) => {
//     const { modalState, closeModal } = useModal();
//     const [files, setFiles] = useState([]);
//     const [activeSlide, setActiveSlide] = useState(0);
//     const [tags, setTags] = useState([]);
//     const [caption, setCaption] = useState('');
//     const [isUploading, setIsUploading] = useState(false);
//     const [uploadProgress, setUploadProgress] = useState(0);
//     const [searchQuery, setSearchQuery] = useState('');
//     const [searchResults, setSearchResults] = useState([]);
//     const [isSearching, setIsSearching] = useState(false);
//     const [selectedUsers, setSelectedUsers] = useState([]);
//     const fileInputRef = useRef(null);
//     const dropZoneRef = useRef(null);

//     const searchUsers = async (query) => {
//         try {
//             setIsSearching(true);
//             const response = await ApiService.searchUsers(query);
//             if (response.ok) {
//                 const data = await response.json();
//                 setSearchResults(data.users);
//             }
//         } catch (error) {
//             console.error('Search failed:', error);
//         } finally {
//             setIsSearching(false);
//         }
//     };

//     const debouncedSearch = debounce(searchUsers, 300);

//     const handleSearchChange = (value) => {
//         setSearchQuery(value);
//         if (value.trim()) {
//             debouncedSearch(value);
//         } else {
//             setSearchResults([]);
//         }
//     };

//     const handleUserSelect = (user) => {
//         if (files[activeSlide]?.type === 'image') {
//             const newTag = {
//                 username: user.username,
//                 userId: user.id,
//                 position: { x: 50, y: 50 },
//                 slideIndex: activeSlide
//             };
//             setTags(prev => [...prev, newTag]);
//             setSelectedUsers(prev => [...prev, user]);
//             setSearchQuery('');
//             setSearchResults([]);
//         }
//     };

//     const getImageDimensions = (file) => {
//         return new Promise((resolve) => {
//             const objectUrl = URL.createObjectURL(file);
//             const img = document.createElement('img');
//             img.onload = () => {
//                 URL.revokeObjectURL(objectUrl);
//                 let width = img.width;
//                 let height = img.height;
//                 if (height > 580) {
//                     const ratio = width / height;
//                     height = 580;
//                     width = height * ratio;
//                 }
//                 resolve({ width, height });
//             };
//             img.src = objectUrl;
//         });
//     };

//     const validateAndAddFiles = async (selectedFiles) => {
//         const validFiles = selectedFiles.filter(file => {
//             const type = file.type.split('/')[0];
//             const size = file.size / (1024 * 1024); // Convert to MB
//             const isValidType = type === 'image' || type === 'video';
//             const isValidSize = size <= 100; // 100MB limit
//             const isValidVideo = type === 'video' ? size <= 100 : true;

//             return isValidType && isValidSize && isValidVideo;
//         });

//         if (validFiles.length > 0) {
//             const processedFiles = await Promise.all(validFiles.map(async (file) => {
//                 const fileType = file.type.split('/')[0];
//                 const preview = URL.createObjectURL(file);
//                 let dimensions = { width: 800, height: 580 }; // Default dimensions

//                 if (fileType === 'image') {
//                     dimensions = await getImageDimensions(file);
//                 }

//                 return {
//                     file,
//                     preview,
//                     type: fileType,
//                     width: dimensions.width,
//                     height: dimensions.height,
//                     tags: []
//                 };
//             }));

//             setFiles(prev => [...prev, ...processedFiles]);
//         }
//     };

//     const handleFileSelect = (event) => {
//         const selectedFiles = Array.from(event.target.files);
//         validateAndAddFiles(selectedFiles);
//     };

//     const handleDrop = (event) => {
//         event.preventDefault();
//         const droppedFiles = Array.from(event.dataTransfer.files);
//         validateAndAddFiles(droppedFiles);
//     };

//     const handleDragOver = (event) => {
//         event.preventDefault();
//     };

//     const updateTagPosition = (index, position) => {
//         setTags(prev => prev.map((tag, i) =>
//             i === index ? { ...tag, position } : tag
//         ));
//     };

//     const removeTag = (tagIndex) => {
//         const tagToRemove = tags[tagIndex];
//         setTags(prev => prev.filter((_, i) => i !== tagIndex));
//         setSelectedUsers(prev => prev.filter(user => user.username !== tagToRemove.username));
//     };

//     const handleUpload = async () => {
//         try {
//             setIsUploading(true);

//             const mediaIds = await Promise.all(files.map(async (file) => {
//                 const mediaFormData = new FormData();
//                 mediaFormData.append('media_file', file.file);

//                 const mediaResponse = await fetch('/api/media/', {
//                     method: 'POST',
//                     body: mediaFormData,
//                     headers: {
//                         'Authorization': `Bearer ${localStorage.getItem('token')}`,
//                     },
//                 });

//                 if (!mediaResponse.ok) {
//                     throw new Error('Failed to upload media');
//                 }

//                 const mediaData = await mediaResponse.json();
//                 return mediaData.id;
//             }));

//             const postData = {
//                 caption,
//                 media: mediaIds,
//                 tags: tags.map(tag => ({
//                     username: tag.username,
//                     userId: tag.userId,
//                     position: tag.position,
//                     media_index: tag.slideIndex
//                 }))
//             };

//             const postResponse = await fetch('/api/posts/', {
//                 method: 'POST',
//                 headers: {
//                     'Authorization': `Bearer ${localStorage.getItem('token')}`,
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(postData)
//             });

//             if (!postResponse.ok) {
//                 throw new Error('Failed to create post');
//             }

//             setFiles([]);
//             setTags([]);
//             setCaption('');
//             setIsUploading(false);
//             closeModal();

//         } catch (error) {
//             console.error('Upload failed:', error);
//             setIsUploading(false);
//         }
//     };

//     useEffect(() => {
//         return () => {
//             files.forEach(file => {
//                 URL.revokeObjectURL(file.preview);
//             });
//         };
//     }, [files]);

//     return (
//         <Modal
//             size={isScreenSmall ? 'full' : '5xl'}
//             radius="md"
//             isOpen={modalState.isOpen && modalState.type === 'createPostModal'}
//             onClose={closeModal}
//         >
//             <ModalContent>
//                 <Button
//                     isIconOnly
//                     onPress={closeModal}
//                     className="absolute top-2 right-2 bg-transparent z-50"
//                 >
//                     <Back />
//                 </Button>

//                 <ModalBody className="p-0">
//                     <div className="flex flex-col h-full">
//                         <div className="text-center p-4 border-b flex justify-between items-center">
//                             <div className="w-16"></div>
//                             <h2 className="font-semibold">Create Post</h2>
//                             {files.length > 0 && (
//                                 <Button
//                                     color="primary"
//                                     size="sm"
//                                     isLoading={isUploading}
//                                     onPress={handleUpload}
//                                     className="w-16"
//                                 >
//                                     Share
//                                 </Button>
//                             )}
//                         </div>

//                         {files.length === 0 ? (
//                             <div
//                                 ref={dropZoneRef}
//                                 onDrop={handleDrop}
//                                 onDragOver={handleDragOver}
//                                 className="flex flex-col items-center justify-center flex-1 p-8 min-h-[400px] gap-4"
//                             >
//                                 <Chat size={48} />
//                                 <p className="text-lg">Drag photos and videos here</p>
//                                 <Button
//                                     color="primary"
//                                     onPress={() => fileInputRef.current?.click()}
//                                 >
//                                     Select from computer
//                                 </Button>
//                                 <input
//                                     ref={fileInputRef}
//                                     type="file"
//                                     hidden
//                                     multiple
//                                     accept="image/*,video/*"
//                                     onChange={handleFileSelect}
//                                 />
//                             </div>
//                         ) : (
//                             <div className="flex flex-1">
//                                 <div className="w-2/3 relative">
//                                     <Swiper
//                                         modules={[Navigation, Pagination]}
//                                         navigation
//                                         pagination
//                                         onSlideChange={(swiper) => setActiveSlide(swiper.activeIndex)}
//                                         className="h-full max-h-[580px]"
//                                     >
//                                         {files.map((file, index) => (
//                                             <SwiperSlide key={index}>
//                                                 <div className="relative w-full h-full flex items-center justify-center">
//                                                     {file.type === 'image' ? (
//                                                         <div className="relative" style={{ width: `${file.width}px`, height: `${file.height}px` }}>
//                                                             <Image
//                                                                 src={file.preview}
//                                                                 alt={`Preview ${index}`}
//                                                                 width={file.width}
//                                                                 height={file.height}
//                                                                 style={{
//                                                                     maxHeight: '580px',
//                                                                     width: 'auto',
//                                                                     objectFit: 'contain'
//                                                                 }}
//                                                                 unoptimized
//                                                             />
//                                                             {tags.filter(tag => tag.slideIndex === index).map((tag, tagIndex) => (
//                                                                 <Draggable
//                                                                     key={tagIndex}
//                                                                     defaultPosition={tag.position}
//                                                                     onStop={(e, data) => updateTagPosition(tagIndex, { x: data.x, y: data.y })}
//                                                                 >
//                                                                     <div className="absolute bg-black bg-opacity-50 text-white p-2 rounded cursor-move flex items-center gap-2">
//                                                                         {tag.username}
//                                                                         <Button
//                                                                             size="sm"
//                                                                             isIconOnly
//                                                                             className="bg-transparent ml-1"
//                                                                             onPress={() => removeTag(tagIndex)}
//                                                                         >
//                                                                             ×
//                                                                         </Button>
//                                                                     </div>
//                                                                 </Draggable>
//                                                             ))}
//                                                         </div>
//                                                     ) : (
//                                                         <video
//                                                             src={file.preview}
//                                                             controls
//                                                             style={{
//                                                                 maxHeight: '580px',
//                                                                 width: 'auto',
//                                                                 objectFit: 'contain'
//                                                             }}
//                                                         />
//                                                     )}
//                                                 </div>
//                                             </SwiperSlide>
//                                         ))}
//                                     </Swiper>
//                                 </div>

//                                 <div className="w-1/3 border-l p-4">
//                                     <div className="space-y-4">
//                                         <Textarea
//                                             placeholder="Write a caption..."
//                                             value={caption}
//                                             onChange={(e) => setCaption(e.target.value)}
//                                             className="w-full"
//                                             rows={4}
//                                         />

//                                         {files[activeSlide]?.type === 'image' && (
//                                             <div className="space-y-2">
//                                                 <div className="flex items-center gap-2">
//                                                     <Person size={20} />
//                                                     <span>Tag People</span>
//                                                 </div>
//                                                 <Input
//                                                     placeholder="Search for people..."
//                                                     value={searchQuery}
//                                                     onChange={(e) => handleSearchChange(e.target.value)}
//                                                     startContent={<Search size={18} />}
//                                                 />
//                                                 {searchResults.length > 0 && (
//                                                     <div className="max-h-40 overflow-y-auto border rounded-lg mt-2">
//                                                         {searchResults.map((user) => (
//                                                             <div
//                                                                 key={user.id}
//                                                                 className="p-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2"
//                                                                 onClick={() => handleUserSelect(user)}
//                                                             >
//                                                                 <div className="w-8 h-8 rounded-full bg-gray-200">
//                                                                     {user.avatar && (
//                                                                         <Image
//                                                                             src={user.avatar}
//                                                                             alt={user.username}
//                                                                             width={32}
//                                                                             height={32}
//                                                                             className="rounded-full"
//                                                                         />
//                                                                     )}
//                                                                 </div>
//                                                                 <div>
//                                                                     <div className="font-medium">{user.username}</div>
//                                                                     <div className="text-sm text-gray-500">{user.name}</div>
//                                                                 </div>
//                                                             </div>
//                                                         ))}
//                                                     </div>
//                                                 )}
//                                             </div>
//                                         )}

//                                         {isUploading && (
//                                             <div className="w-full bg-gray-200 rounded">
//                                                 <div
//                                                     className="bg-blue-600 h-2 rounded"
//                                                     style={{ width: `${uploadProgress}%` }}
//                                                 />
//                                             </div>
//                                         )}
//                                     </div>
//                                 </div>
//                             </div>
//                         )}
//                     </div>
//                 </ModalBody>
//             </ModalContent>
//         </Modal>
//     );
// };

// export default CreatePost;