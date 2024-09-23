'use client';

import React, { useState, useEffect } from 'react';
import { Avatar, Image, Button } from "@nextui-org/react";
import { Bookmark, Chat, DotsMenu, Emoji, Heart, Share } from '@/icons'; 
import { useLike } from "@/contexts/LikeContext";
import { usePostModal } from '@/hooks/usePostModal';
import HoverComponent from '../Hoover/HoverComponent';
import HoverContent from '../Hoover/HoverContent';
import EmojiPicker from 'emoji-picker-react';
import { AnimatePresence } from 'framer-motion';
import ScaleUpVertBottom from '@/Animation/ScaleUpVertBottom';
import ApiService from '@/lib/ApiService';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';


export default function Posts({posts}) {
  const { openPostModal } = usePostModal();
  const [comment, setComment] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const emojiPickerRef = React.useRef(null);
  const { likes, toggleLike } = useLike();
  const [lastTap, setLastTap] = useState(0);
  const [showHeart, setShowHeart] = useState(false);

  const [savedPosts, setSavedPosts] = useState({});

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  const toggleEmojiPicker = () => {
    setIsOpen(!isOpen);
  };

  const handleEmojiSelect = (emojiObject) => {
    setComment(prevComment => prevComment + emojiObject.emoji);
  };

  const handleInputChange = (e) => {
    setComment(e.target.value);
  };

  const handleClickOutside = (event) => {
    if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleDoubleTap = async (itemId) => {
    try {
      await ApiService.likePost(itemId); 
      toggleLike(itemId); 
      setShowHeart(true);
      setTimeout(() => setShowHeart(false), 1000);
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  const handleTap = (e, itemId) => {
    const currentTime = new Date().getTime();
    const tapLength = currentTime - lastTap;

    if (tapLength < 300 && tapLength > 0) {
      handleDoubleTap(itemId);
      e.preventDefault();
    }

    setLastTap(currentTime);
  };

 
  const handleSave = async (postId) => {
    try {
      if (savedPosts[postId]) {
        await ApiService.unsavePost(postId);
        setSavedPosts(prev => ({ ...prev, [postId]: false }));
      } else {
        await ApiService.savePost(postId);
        setSavedPosts(prev => ({ ...prev, [postId]: true }));
      }
    } catch (error) {
      console.error('Error saving/unsaving post:', error);
    }
  }

  const handleShare = async (postId) => {
    try {
      const { share_link } = await ApiService.getShareLink(postId); 
      alert(`Share this link: ${share_link}`);
    } catch (error) {
      console.error('Error getting share link:', error);
    }
  };

  const renderMediaItem = (item, index) => {
    if (!item || !item.media_type) {
      return null; 
    }
  
    if (item.media_type === 'image') {
      return (
        <Image 
          key={`${item.id}-${index}`}
          className="min-w-full rounded-none md:rounded-md"
          src={item.file}
          alt={`Post image ${index + 1}`}
        />
      );
    } else if (item.media_type === 'video') {
      return (
        <video 
          key={`${item.id}-${index}`}
          className="min-w-full rounded-none md:rounded-md"
          controls
          style={{
            height: 'auto',
            maxHeight: '580px',
            width: '100%',
            objectFit: 'contain'
          }}
        >
          <source src={item.file} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      );
    }
  };
  


  return (
    <> 
      {posts.map((post, index) => ( 
        <div className='mx-auto' key={`${post.id}-${index}`}> 
          <div className='flex flex-row py-2 gap-3 px-3 top'>
            <div className="relative bg-gradient-to-tr from-[#FFC800] to-[#CC00BF] p-[2px] mt-0 bg-default text-default-foreground rounded-full">
              <a href="#" className="block bg-white dark:bg-black p-[2px] rounded-full">
                <Avatar
                  radius="full"
                  className="text-sm"
                  width={38}
                  height={38}
                  shadow='sm'
                  src={post.user.profile_picture}
                  alt={post.user.username}
                />
              </a>
            </div>
            <div className='mr-auto flex items-center'>
              <div>
                <HoverComponent hoverContent={<HoverContent />}>
                  <p className='font-semibold text-sm cursor-pointer'>
                    {post.user.username}</p>
                </HoverComponent>
                <p className='text-sm font-light'>{post.created_at}</p>
              </div>
            </div>
            <Button isIconOnly aria-label="menu" className="bg-inherit">
              <DotsMenu />
            </Button>
          </div>
          <div className="grow relative md:rounded-md md:border border-[#DBDBDB] dark:border-[#262626]" onClick={(e) => handleTap(e, post.id)}>
            {/* <Image 
              className="min-w-full rounded-none md:rounded-md"
              src={post.media_items[0]?.file}
              alt="Post"
            />
            {showHeart && (
              <div className="absolute inset-0 flex items-center justify-center z-20">
                <Heart className="text-red-500 animate-pulse" size={200} />
              </div>
            )} */}

            {post.media_items.length > 1 ? (
              <Carousel 
                responsive={responsive}
                infinite={true}
                containerClass="carousel-container"
                itemClass="carousel-item"
              >
                {post.media_items.map((item, index) => renderMediaItem(item, index))}
              </Carousel>
            ) : (
              renderMediaItem(post.media_items[0], 0)
            )}
            {showHeart && (
              <div className="absolute inset-0 flex items-center justify-center z-20">
                <Heart className="text-red-500 animate-pulse" size={200} />
              </div>
            )}
          </div>
          <div className="pb-1">
            <div className="w-full pt-3 px-[12px] md:px-0">
              <div className="flex flex-row mb-4">
                <Button
                  isIconOnly  
                  aria-label="likes"
                  className={`bg-inherit mr-2 ${likes[post.id]?.isLiked ? 'text-red-500' : 'dark:text-white text-black'}`}
                  onPress={() => handleDoubleTap(post.id)} 
                >
                  <Heart />
                </Button>
                <Button isIconOnly aria-label="comment" className="bg-inherit mr-2" 
                onPress={() => openPostModal(post.id)}>
                  <Chat />
                </Button>
                <Button isIconOnly aria-label="share" className="bg-inherit" 
                onPress={() => handleShare(post.id)}>
                  <Share />
                </Button>
                <Button isIconOnly aria-label="save" className="ml-auto bg-inherit" 
                onPress={() => handleSave(post.id)}>
                  <Bookmark />
                </Button>
              </div>
              <div className="w-full mb-2">
                {likes[post.id]?.likeCount === 0 ? (
                  <p>Be the first to like this</p>
                ) : likes[post.id]?.likeCount === 1 ? (
                  <p>1 like</p>
                ) : (
                  <p>{likes[post.id]?.likeCount} likes</p>
                )}
                <small>{post.created_at}</small>
              </div>
            </div>
            <div className="pb-3 w-full flex flex-row relative border-b border-[#DBDBDB] dark:border-[#262626]">
              <input
                type="text"
                placeholder="Add a comment..."
                value={comment}
                onChange={handleInputChange}
                className="ml-[12px] md:ml-0 bg-inherit grow h-8 mt-1 border-none outline-none"
              />
              <h2
                type='submit'
                className={`mt-2 mr-[12px] md:mr-0 cursor-pointer font-semibold text-[#1877F2] ${!comment ? 'hidden' : 'block'}`}>
                Post
              </h2>
              <Button isIconOnly aria-label="emoji" onClick={toggleEmojiPicker} className={`bg-inherit mt-2 mr-[12px] md:mr-0 cursor-pointer ${!comment ? 'block' : 'hidden'}`}>
                <Emoji />
              </Button>
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
            </div>
          </div>
        </div>   
      ))}
    </>
  );
  
}
