import React, { useState, useRef, useEffect} from "react";
import { Bookmark, DotsMenu, Heart, Share, Chat, Mute, UnMute, Music } from "@/icons";
import { Button, Avatar, Chip } from "@nextui-org/react";
import { useLike } from "@/contexts/LikeContext";
import Link from 'next/link';

export default function Reel() {
    const videoRef = useRef(null);
    const [isMuted, setIsMuted] = useState(true);
    const { likes, toggleLike } = useLike();
    const itemId = "reel-1";
    const [lastTap, setLastTap] = useState(0);
    const [showHeart, setShowHeart] = useState(false);
    const [mediaTitle, setMediaTitle] = useState('');
    const [audioId, setAudioId] = useState('');


    const handleVideoClick = () => {
        if (videoRef.current.paused) {
            videoRef.current.play();
        } else {
            videoRef.current.pause();
        }
    };

    const handleDoubleTap = () => {
        toggleLike(itemId);
        setShowHeart(true);
        setTimeout(() => setShowHeart(false), 1000);
    };

    const handleTap = (e) => {
        const currentTime = new Date().getTime();
        const tapLength = currentTime - lastTap;

        if (tapLength < 300 && tapLength > 0) {
            handleDoubleTap();
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

    return (
            <div className='w-full md:w-[480px] relative md:flex mx-auto h-[92vh] md:h-screen'> 
                <div className='absolute bottom-0 left-0 h-auto py-2 w-[calc(100%-56px)] z-40'>
                    <div className='flex flex-col px-2'>
                        <div className='flex gap-3 py-2 w-full'>
                            <Avatar isBordered className='ml-3' radius="full" size="sm" src="https://i.pravatar.cc/150?u=a04258114e29026302d" />
                            <div className="flex">
                                <span className="flex">
                                    <span className="text-base">username</span>
                                    <div className="h-2 w-2 mt-2 mx-1.5 rounded-full bg-white"></div>
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
                            Video description goes here
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
                        muted
                        autoPlay
                        loop
                        playsInline
                        className="object-cover h-full w-full opacity-50" // Lower opacity to emphasize blur
                        >
                        <source src="./11930348_1920_1080_30fps.mp4" type="video/mp4" />
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
                        <source src="./11930348_1920_1080_30fps.mp4" type="video/mp4" />
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
                                className={`bg-inherit ${likes[itemId]?.isLiked ? 'text-red-500' : 'text-white'}`}
                                onClick={() => toggleLike(itemId)} 
                            >
                                <Heart/>
                            </Button>
                            <span>{likes[itemId]?.likeCount || 0}</span>
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
                            >
                                <Share/>
                            </Button>
                        </div>
                        <div className='mb-2'>
                            <Button
                                isIconOnly  
                                className="bg-inherit" 
                                aria-label="save" 
                            >
                                <Bookmark/>
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