'use client';


import Link from 'next/link';
import { useLike } from "@/contexts/LikeContext";
import { Button, Avatar, Chip } from "@nextui-org/react";
import React, { useState, useRef, useEffect} from "react";
import { Bookmark, DotsMenu, Heart, Share, Chat, Mute, UnMute, Music, Remove, CheckMark,UnLike } from "@/icons";

export default function Reel({ reel }) {
    const videoRef = useRef(null);
    const backgroundVideoRef = useRef(null);
    const [isMuted, setIsMuted] = useState(true);
    const { likes, toggleLike } = useLike();
    const [lastTap, setLastTap] = useState(0);
    const [showHeart, setShowHeart] = useState(false);
    const [mediaTitle, setMediaTitle] = useState('');
    const [audioId, setAudioId] = useState('');
    const [savedReels, setSavedReels] = useState({});

    const hasStory = reel.user.has_story;
    const isAdmin = reel.user.is_staff;
    const isVerified = reel.user.is_verified;

    const handleVideoClick = () => {
        if (videoRef.current.paused) {
            videoRef.current.play();
        } else {
            videoRef.current.pause();
        }
    };

    const handleDoubleTap = async (reelId) => {
        try {
            if (!likes[reelId]?.isLiked) {
                await ApiService.likeReel(reelId); 
                toggleLike(reelId); 
                setShowHeart(true);
                setTimeout(() => setShowHeart(false), 1000);
            }
        } catch (error) {
            console.error('Error liking reel:', error);
        }
    };

    const handleTap = (e) => {
        const currentTime = new Date().getTime();
        const tapLength = currentTime - lastTap;

        if (tapLength < 300 && tapLength > 0) {
            handleDoubleTap(reel.id); // Pass the unique reel ID
            e.preventDefault();
        } else {
            setTimeout(() => {
                handleVideoClick();
            }, 300);
        }

        setLastTap(currentTime);
    };

    const toggleMute = () => {
        if (videoRef.current) {
            videoRef.current.muted = !videoRef.current.muted;
            setIsMuted(videoRef.current.muted);
        }
    };

    const toggleSave = async (reelId) => {
        try {
          if (savedReels[reelId]) {
            await ApiService.unsaveReel(reelId);
            setSavedReels((prev) => ({
              ...prev,
              [reelId]: false
            }));
          } else {
            await ApiService.saveReel(reelId);
            setSavedReels((prev) => ({
              ...prev,
              [reelId]: true
            }));
          }
        } catch (error) {
          console.error('Error saving/unsaving reel:', error);
        }
    };
      
    const handleShare = async () => {
        try {
            const shareLink = await ApiService.getShareLink(reel.id);
            navigator.clipboard.writeText(shareLink);
            alert('Link copied to clipboard!');
        } catch (error) {
            console.error('Error getting share link:', error);
        }
    };

    
    useEffect(() => {
        const videoElement = document.querySelector('video');
        const sourceElement = videoElement.querySelector('source');
  
        const mediaUrl = sourceElement?.src;
        if (mediaUrl) {
            const mediaName = mediaUrl.split('/').pop().split('.')[0]; 
            setMediaTitle(mediaName);
            setAudioId(mediaName);
        }
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (videoRef.current) {
                        if (entry.isIntersecting) {
                            videoRef.current.play(); 
                        } else {
                            videoRef.current.pause(); 
                        }
                    }
                });
            },
            { threshold: 0.5 } 
        );

        if (videoRef.current) {
            observer.observe(videoRef.current);
        }

        return () => {
            if (videoRef.current) {
                observer.unobserve(videoRef.current); 
            }
        };
    }, []);
    useEffect(() => {
        if (backgroundVideoRef.current) {
            backgroundVideoRef.current.pause();  
            backgroundVideoRef.current.muted = true; 
        }
    }, []);
    return (
            <div className='w-full md:w-[480px] relative md:flex mx-auto h-[92vh] md:h-screen'> 
                <div className='absolute bottom-0 left-0 h-auto py-2 w-[calc(100%-56px)] z-40'>
                    <div className='flex flex-col px-2'>
                        <div className='flex gap-3 py-2 w-full'>
                            <div className={`relative ${hasStory ? 'bg-gradient-to-tr from-[#FFC800] to-[#CC00BF] p-[2px]' : ''} mt-0 bg-default text-default-foreground rounded-full`}>
                                <a href="#" className="block bg-white dark:bg-black
                                 p-[2px] rounded-full">
                                    <Avatar
                                    width={38}
                                    shadow='sm'
                                    height={38}
                                    radius="full"
                                    className="text-sm"
                                    alt={reel.user.username}
                                    src={reel.user.profile_picture}
                                    />
                                </a>
                            </div>
                            <div className="flex">
                                <span className="flex">
                                    {/* <span className="text-base">{reel.user.username}</span> */}
                                    <p className='text-base cursor-pointer flex gap-x-1'>
                                        <span>
                                        {reel.user.username}
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
                                    <div className="h-2 w-2 mt-2 mx-1.5 rounded-full bg-white">
                                    </div>
                                </span>
                                <Button
                                    className="bg-transparent border border-[#262626]" 
                                    aria-label="Follow"
                                    size="sm" 
                                >
                                    Follow
                                </Button>
                            </div>
                        </div>
                        <div className='py-3 pl-3 mt-2 truncate'>                            
                         {reel.caption}
                        </div>
                        <div className='mb-2 pl-2'>
                            {/* Media title chip */}
                            {mediaTitle && (
                                <Chip
                                    startContent={<Music/>}
                                    variant="faded"
                                    className="backdrop-blur-sm bg-white/30 border-0"
                                    classNames={{
                                        base: "backdrop-blur-sm bg-white/30",
                                        content: " border-0 text-white pl-2",
                                    }}
                                >
                                    {mediaTitle}
                                </Chip>
                            )}
                        </div>
                    </div>
                </div>
                <div className="flex-1 h-full w-full relative" onClick={handleTap}>
                    <div className="block md:block absolute inset-0 bg-black filter blur-xl">
                        <video
                        loop
                        muted
                        playsInline
                        ref={backgroundVideoRef} 
                        className="object-cover h-full w-full opacity-50" 
                        >
                        <source src={reel.video} type="video/mp4" />
                        </video>
                    </div>

                    <video
                        ref={videoRef}
                        muted={isMuted}
                        autoPlay
                        loop
                        playsInline
                        width="100%"
                        height="100%"
                        className="object-cover h-full w-full cursor-pointer relative"
                    >
                        <source src={reel.video} type="video/mp4" />
                    </video>

                    {showHeart && (
                        <div className="absolute inset-0 flex items-center justify-center">
                        <Heart className="text-red-500 animate-pulse" size={200} />
                        </div>
                    )}
                </div>

                {/* video controls  */}
                <div className='absolute inset-y-0 right-0 md:relative z-30'>
                    <div className='h-full flex flex-col px-2'>
                        <div className='mb-auto'>
                            <Button isIconOnly className="bg-inherit" onClick={toggleMute} aria-label="mute/unmute">
                                {isMuted ? <Mute /> : <UnMute />}
                            </Button>
                        </div>
                        <div className='flex flex-col text-center mb-2'>
                            <Button
                                isIconOnly
                                aria-label="likes"
                                className="bg-inherit text-white" 
                                onClick={() => toggleLike(reel.id)} 
                            >

                                {likes[reel.id]?.isLiked ? <UnLike /> : <Heart />}
                            </Button>
                            <span>{likes[reel.id]?.likeCount || 0}</span> 
                            </div>
                        <div className='flex flex-col text-center mb-2'>
                            <Button
                                isIconOnly  
                                className="bg-inherit" 
                                aria-label="comments" 
                            >
                                <Chat/>
                            </Button>
                            <span>232</span>
                        </div>
                        <div className='mb-2'>
                            <Button
                                isIconOnly  
                                className="bg-inherit" 
                                aria-label="share" 
                                onPress={() => handleShare(reel.id)}
                            >
                                <Share/>
                            </Button>
                        </div>
                        <div className='mb-2'>
                            <Button isIconOnly aria-label="save" className="ml-auto bg-inherit" 
                            onPress={() => toggleSave(reel.id)}>
                            {savedReels[reel.id] ? <Remove /> : <Bookmark />}
                            </Button>
                        </div>
                        <div className='mb-4'>
                            <Button
                                isIconOnly  
                                className="bg-inherit" 
                                aria-label="more options" 
                            >
                                <DotsMenu/>
                            </Button>
                        </div>
                        {audioId && (
                            <Link href={`/audio/${audioId}`} className='mb-4 ml-1'>
                                <Avatar isBordered radius="lg" size="sm" src="https://i.pravatar.cc/150?u=a04258114e29026302d" />
                            </Link>
                        )}
                    </div>
                </div>
            </div>
    );
}