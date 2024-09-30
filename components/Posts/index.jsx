
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Avatar, Image, Button } from "@nextui-org/react";
import { Bookmark, Chat, CheckMark, DotsMenu, Emoji, Heart, Share, Remove, UnLike, Person, Mute, UnMute  } from '@/icons'; 
import { useLike } from "@/contexts/LikeContext";
import { usePostModal } from '@/hooks/usePostModal';
import HoverComponent from '../Hoover/HoverComponent';
import HoverContent from '../Hoover/HoverContent';
import EmojiPicker from 'emoji-picker-react';
import { AnimatePresence } from 'framer-motion';
import ScaleUpVertBottom from '@/Animation/ScaleUpVertBottom';
import ApiService from '@/lib/ApiService';
// import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Carousel } from '@nextui-org/react';

const Posts = ({ post }) => {
  const postRef = useRef(null);
  const videoRef = useRef(null);
  const emojiPickerRef = useRef(null);
  const { likes, toggleLike } = useLike();
  const { openPostModal } = usePostModal();
  const [lastTap, setLastTap] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [savedPosts, setSavedPosts] = useState({});
  const [showHeart, setShowHeart] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const [comment, setComment] = useState("");
  const [latestComment, setLatestComment] = useState(null);

  const hasStory = post.user.has_story;
  const isAdmin = post.user.is_staff;
  const isVerified = post.user.is_verified;

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
      if (!likes[itemId]?.isLiked) {
        await ApiService.likePost(itemId); 
        toggleLike(itemId); 
        setShowHeart(true);
        setTimeout(() => setShowHeart(false), 1000);
      }
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

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5,
    };
  
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (videoRef.current) {
          if (entry.isIntersecting) {
            setIsInView(true);
            videoRef.current.muted = false;
            videoRef.current.play().catch(error => {
              console.error('Autoplay failed:', error);
              videoRef.current.muted = true;
              videoRef.current.play();
            });
          } else {
            setIsInView(false);
            videoRef.current.muted = true;
            videoRef.current.pause();
          }
        }
      });
    }, options);
  
    if (postRef.current) {
      observer.observe(postRef.current);
    }
  
    return () => {
      if (postRef.current) {
        observer.unobserve(postRef.current);
      }
    };
  }, []);

  const handleVideoClick = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  };

  const handleMuteToggle = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

 
  
  useEffect(() => {
    if (post.latest_comment) {
      setLatestComment(post.latest_comment);
    }
  }, [post]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      if (comment.trim()) {
        const newComment = await ApiService.postComment(post.id, comment);
        setLatestComment(newComment);
        setComment(""); // Clear the input
      }
    } catch (error) {
      console.error('Error posting comment:', error);
    }
  };


  const handleInputChange = (e) => {
    setComment(e.target.value);
  };

  const renderMedia = () => {
    if (post.media && post.media.length > 0) {
      if (post.media.length === 1) {
        const media = post.media[0];
        return media.media_type === 'image' ? (
          <Image 
            alt="Post content" 
            src={media.media_file} 
            className="w-full h-auto md:rounded-md" />
        ) : (
          
          <div className="h-[585px] w-full md:rounded-md relative overflow-hidden">
            <video  
              loop
              autoPlay
              playsInline 
              ref={videoRef}
              muted={isMuted}
              src={media.media_file}
              onClick={handleVideoClick}
              className="absolute top-0 left-0 w-full h-full object-contain" />
             <Button
              isIconOnly
              aria-label="mute/UnMute"
              onClick={handleMuteToggle}
              className="bg-inherit absolute bottom-2 right-2 z-20 text-white"
            >
              {isMuted ? <Mute /> : <UnMute />}
            </Button> 
          </div>

        );
      } else {
        return (
          <Carousel>
            {post.media.map((media, index) => (
              <Carousel.Item key={index}>
                {media.media_type === 'image' ? (
                  <Image 
                    src={media.media_file}
                    className="w-full h-auto md:rounded-md"  
                    alt={`Post content ${index + 1}`} />
                ) : (
                  <div className="h-[585px] w-full md:rounded-md relative overflow-hidden">
                    <video  
                      loop
                      autoPlay
                      playsInline 
                      ref={videoRef}
                      muted={isMuted}
                      src={media.media_file}
                      onClick={handleVideoClick}
                      className="absolute top-0 left-0 w-full h-full object-contain" />
                    <Button
                      isIconOnly
                      aria-label="mute/unmute"
                      onClick={handleMuteToggle}
                      className="absolute bottom-2 right-2 z-20 bg-black/50 text-white"
                    >
                      {isMuted ? <Mute /> : <Unmute />}
                    </Button>
                  </div>
                
                )}
              </Carousel.Item>
            ))}
          </Carousel>
        );
      }
    }
    return null;
  };

  return (
    <div className='mx-auto'ref={postRef}>
      <div className='flex flex-row py-2 gap-3 px-3 top'>
        {/* <div className="relative bg-gradient-to-tr from-[#FFC800] to-[#CC00BF] p-[2px] mt-0 bg-default text-default-foreground rounded-full"> */}
        <div className={`relative ${hasStory ? 'bg-gradient-to-tr from-[#FFC800] to-[#CC00BF] p-[2px]' : ''} mt-0 bg-default text-default-foreground rounded-full`}>
          <a href="#" className="block bg-white dark:bg-black p-[2px] rounded-full">
            <Avatar
              width={38}
              shadow='sm'
              height={38}
              radius="full"
              className="text-sm"
              alt={post.user.username}
              src={post.user.profile_picture} 
            />
          </a>
        </div>
        <div className='mr-auto flex items-center'>
          <div>
            <HoverComponent hoverContent={<HoverContent />}>
              <p className='font-semibold text-sm cursor-pointer flex gap-x-1'>
                <span>
                  {post.user.username}
                </span> 
                {(isAdmin || isVerified) && (
                  <span className='mt-1.5'>
                    <CheckMark  
                    className={isAdmin ? 'text-green-500' : 'text-blue-500'}
                    fill={isAdmin ? 'green' : 'blue'}
                    />
                  </span>
                )}
              </p>
            </HoverComponent>
            <p className='text-sm font-light'>{post.created_at}</p>
          </div>
        </div>
        <Button isIconOnly aria-label="menu" className="bg-inherit">
          <DotsMenu />
        </Button>
      </div>

      <div className="grow relative md:rounded-md md:border border-[#DBDBDB] dark:border-[#262626]"  onClick={(e) => handleTap(e, post.id)}>
        {renderMedia()}
        <Button isIconOnly aria-label="tag" radius='full' className="absolute bg-inherit bottom-0 left-0 z-20">
          <Person/>
        </Button>
        {showHeart && (
          <Button isIconOnly aria-label="like/unlike" className="absolute inset-0 flex items-center justify-center z-20">
            {likes[post.id]?.isLiked ? <Heart /> : <UnLike />}
          </Button>
        )}
      </div>

      <div className="pb-1">
        <div className="w-full pt-3 px-[12px] md:px-0">
          <div className="flex flex-row mb-4">
            <Button
              isIconOnly  
              aria-label="likes"
              className='bg-inherit mr-2 dark:text-white text-black'
              onPress={() => handleDoubleTap(post.id)} 
            >
              {likes[post.id]?.isLiked ? <UnLike />:  <Heart />}
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
              {savedPosts[post.id] ? <Bookmark /> : <Remove />}
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
            {latestComment && (
              <div className="comment-item">
                <p><strong>{latestComment.user.username}</strong>: {latestComment.content}</p>
              </div>
            )}
            <small>{post.created_at}</small>
          </div>
        </div>
        <div className="pb-3 w-full relative border-b border-[#DBDBDB] dark:border-[#262626]">
          <form onSubmit={handleCommentSubmit} className="flex flex-row">
            <input
              type="text"
              placeholder="Add a comment..."
              value={comment}
              onChange={handleInputChange}
              className="ml-[12px] md:ml-0 bg-inherit grow h-8 mt-1 border-none outline-none"
            />
            <button
              type='submit'
              className={`mt-2 mr-[12px] md:mr-0 cursor-pointer font-semibold text-[#1877F2] ${!comment ? 'hidden' : 'block'}`}>
              Post
            </button>
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
          </form>
        </div>
      </div>
    </div>
  );
};

export default Posts;