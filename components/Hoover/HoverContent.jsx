// import React from 'react';
// import { Messenger } from '@/icons';
// import { Avatar, Button } from '@nextui-org/react';
// import { useMediaQuery } from '@/hooks/useMediaQuery';

// export default function HoverContent({ post }) {
//     const isSmallScreen = useMediaQuery('(max-width: 640px)');

//     return (
//         <div className="p-2 w-[100%-50px] md:w-[400px]">
//             <div className='flex flex-row py-2 gap-3 px-3'>
//                 <div className="relative bg-gradient-to-tr from-[#FFC800] to-[#CC00BF] 
//                 p-[2px] bg-default text-default-foreground rounded-full">
//                     <button className="block bg-white dark:bg-black p-[2px] 
//                 rounded-full">
//                         <Avatar
//                             radius="full"
//                             className="text-sm"
//                             size="lg"
//                             shadow='sm'
//                             src={post.user.profile_picture}
//                             alt={post.user.username}
//                         />
//                     </button>
//                 </div>
//                 <div className='mr-auto flex items-center'>
//                     <div>
//                         <p className='font-semibold text-sm cursor-pointer'>
//                             {post.user.username}
//                         </p>
//                         <p className='text-sm font-light'>{post.created_at}</p>
//                     </div>
//                 </div>
//             </div>
//             <div className='w-full flex flex-row justify-between px-[12px] py-2'>
//                 <div className='text-center flex flex-col'>
//                     <span className='font-semibold text-sm'>{post.user.count}</span>
//                     <span className='font-light text-sm'>posts</span>
//                 </div>
//                 <div className='text-center flex flex-col'>
//                     <span className='font-semibold text-sm'>{post.user.followers.count}</span>
//                     <span className='font-light text-sm'>followers</span>
//                 </div>
//                 <div className='text-center flex flex-col'>
//                     <span className='font-semibold text-sm'>{post.user.following.count}</span>
//                     <span className='font-light text-sm'>following</span>
//                 </div>
//             </div>
//             <div className='flex flex-row gap-2 pb-2 w-full'>
//                 <div className='h-40 w-full border '></div>
//                 <div className='h-40 w-full border '></div>
//                 <div className='h-40 w-full border '></div>
//             </div>
//             <div className='flex flex-row gap-3 w-full'>
//                 <Button fullWidth size='md' className="bg-[#1877F2]" startContent={!isSmallScreen && <Messenger />}>
//                     Send Message
//                 </Button>
//                 <Button fullWidth size='md'>
//                     follow
//                 </Button>
//             </div>
//         </div>
//     );
// }



import React, { useState, useEffect } from 'react';
import { Card, CardBody, Avatar, Button } from "@nextui-org/react";
import { Image } from "@nextui-org/react";
import ApiService from '@/lib/ApiService';
import { Messenger, CheckMark } from '@/icons';

const HoverContent = ({ post }) => {
    const [userDetails, setUserDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isFollowing, setIsFollowing] = useState(false);
    const [followLoading, setFollowLoading] = useState(false);

    useEffect(() => {
        const fetchUserDetails = async () => {
            if (!post?.user?.id) return;

            try {
                setLoading(true);
                setError(null);
                const response = await ApiService.getUserHoverDetails(post.user.id);
                setUserDetails(response);
                setIsFollowing(response.user.is_followed);
            } catch (err) {
                console.error('Error fetching user details:', err);
                setError(err.message || 'Failed to load user details');
            } finally {
                setLoading(false);
            }
        };

        fetchUserDetails();
    }, [post?.user?.id]);

    const handleFollowClick = async () => {
        if (!userDetails?.user?.id) return;

        try {
            setFollowLoading(true);
            if (isFollowing) {
                await ApiService.unfollowUser(userDetails.user.id);
                setIsFollowing(false);
            } else {
                await ApiService.followUser(userDetails.user.id);
                setIsFollowing(true);
            }
        } catch (error) {
            console.error('Follow/unfollow error:', error);
        } finally {
            setFollowLoading(false);
        }
    };

    const getFollowButtonText = () => {
        if (followLoading) return 'Loading...';
        if (isFollowing) return 'Following';
        if (userDetails?.user?.follows_you && !isFollowing) return 'Follow Back';
        return 'Follow';
    };

    if (loading) {
        return (
            <Card className="w-80">
                <CardBody className="p-4">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-gray-200 animate-pulse" />
                        <div className="flex-1">
                            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2 animate-pulse" />
                            <div className="h-3 bg-gray-200 rounded w-1/2 animate-pulse" />
                        </div>
                    </div>
                </CardBody>
            </Card>
        );
    }

    if (error) {
        return (
            <Card className="w-80">
                <CardBody>
                    <p className="text-red-500">{error}</p>
                </CardBody>
            </Card>
        );
    }

    if (!userDetails) return null;

    const hasStory = userDetails?.user?.has_story;
    const isAdmin = userDetails?.user?.is_staff;
    const isVerified = userDetails?.user?.is_verified;

    return (
        <Card className="w-80">
            <CardBody className="p-4">
                <div className="flex items-center gap-4 mb-4">
                    <div className={`relative ${hasStory ? 'bg-gradient-to-tr from-[#FFC800] to-[#CC00BF] p-[2px] rounded-full' : ''}`}>
                        <div className={`rounded-full ${hasStory ? 'bg-white dark:bg-black p-[2px]' : ''}`}>
                            <Avatar
                                src={userDetails.user.profile_picture || '/default-avatar.png'}
                                alt={userDetails.user.username}
                                className="w-10 h-10"
                            />
                        </div>
                    </div>
                    <div>
                        <p className="font-semibold text-sm flex items-center gap-1">
                            {userDetails.user.username}
                            {(isAdmin || isVerified) && (
                                <CheckMark
                                    className={`w-4 h-4 ${isAdmin ? 'text-green-500' : 'text-blue-500'}`}
                                    fill={isAdmin ? 'green' : 'blue'}
                                />
                            )}
                        </p>
                        <p className="text-sm text-gray-500">{userDetails.user.bio}</p>
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-4 text-center mb-4">
                    <div>
                        <p className="font-semibold">{userDetails.stats.posts_count}</p>
                        <p className="text-sm text-gray-500">posts</p>
                    </div>
                    <div>
                        <p className="font-semibold">{userDetails.stats.followers_count}</p>
                        <p className="text-sm text-gray-500">followers</p>
                    </div>
                    <div>
                        <p className="font-semibold">{userDetails.stats.following_count}</p>
                        <p className="text-sm text-gray-500">following</p>
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-2 mb-4">
                    {userDetails.latest_posts.map((post, index) => (
                        <div key={index} className="aspect-square rounded-md overflow-hidden">
                            {post.media?.[0]?.media_type === 'image' ? (
                                <Image
                                    src={post.media[0].media_file}
                                    alt="Post preview"
                                    classNames={{
                                        img: "w-full h-full object-cover"
                                    }}
                                />
                            ) : post.media?.[0]?.media_type === 'video' ? (
                                <video
                                    src={post.media[0].media_file}
                                    className="w-full h-full object-cover"
                                />
                            ) : null}
                        </div>
                    ))}
                </div>

                <div className="flex gap-2">
                    <Button
                        fullWidth
                        color="primary"
                        startContent={<Messenger className="w-4 h-4" />}
                    >
                        Message
                    </Button>
                    <Button
                        fullWidth
                        color={isFollowing ? "primary" : "default"}
                        disabled={followLoading}
                        onClick={handleFollowClick}
                    >
                        {getFollowButtonText()}
                    </Button>
                </div>
            </CardBody>
        </Card>
    );
};

export default HoverContent;



// import React, { useState, useEffect } from 'react';
// import { Card, CardBody, Avatar, Button, Image } from "@nextui-org/react";
// import ApiService from '@/lib/ApiService';
// import { Messenger, CheckMark } from '@/icons';

// const HoverContent = ({ post }) => {
//     const [userDetails, setUserDetails] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);


//     useEffect(() => {
//         const fetchUserDetails = async () => {
//             try {
//                 setLoading(true);
//                 setError(null);
//                 const response = await ApiService.getUserHoverDetails(post.user.id);
//                 setUserDetails(response);
//             } catch (err) {
//                 console.error('Error fetching user details:', err);
//                 setError(err.message || 'Failed to load user details');
//             } finally {
//                 setLoading(false);
//             }
//         };

//         if (post?.user?.id) {
//             fetchUserDetails();
//         }
//     }, [post?.user?.id]);

//     const hasStory = userDetails.user.has_story;
//     const isAdmin = userDetails.user.is_staff;
//     const isVerified = userDetails.user.is_verified;

//     if (loading) {
//         return (
//             <Card className="w-80">
//                 <CardBody className="p-4">
//                     <div className="flex items-center gap-3">
//                         <div className="w-12 h-12 rounded-full bg-gray-200 
//                         animate-pulse" />
//                         <div className="flex-1">
//                             <div className="h-4 bg-gray-200 rounded w-3/4 mb-2 animate-pulse" />
//                             <div className="h-3 bg-gray-200 rounded w-1/2 
//                             animate-pulse" />
//                         </div>
//                     </div>
//                 </CardBody>
//             </Card>
//         );
//     }

//     if (error) {
//         return (
//             <Card className="w-80">
//                 <CardBody>
//                     <p className="text-red-500">{error}</p>
//                 </CardBody>
//             </Card>
//         );
//     }

//     if (!userDetails) return null;

//     return (
//         <Card className="w-80">
//             <CardBody className="p-4">
//                 <div className="flex items-center gap-4 mb-4">
//                     <div className={`relative ${hasStory ? 'bg-gradient-to-tr from-[#FFC800] to-[#CC00BF] p-[2px]' : ''} mt-0 bg-default text-default-foreground rounded-full`}>
//                         <a href="#" className="block bg-white dark:bg-black p-[2px] rounded-full">
//                             <Avatar
//                                 width={38}
//                                 shadow='sm'
//                                 height={38}
//                                 radius="full"
//                                 className="text-sm"
//                                 src={userDetails.user.profile_picture}
//                                 alt={userDetails.user.username}
//                             />
//                         </a>
//                     </div>
//                     <div>
//                         <p className='font-semibold text-sm cursor-pointer flex gap-x-1'>
//                             <span>
//                                 {userDetails.user.username}
//                             </span>
//                             {(isAdmin || isVerified) && (
//                                 <span className='mt-1.5'>
//                                     <CheckMark
//                                         className={isAdmin ? 'text-green-500' : 'text-blue-500'}
//                                         fill={isAdmin ? 'green' : 'blue'}
//                                     />
//                                 </span>
//                             )}
//                         </p>
//                         {/* <h4 className="font-semibold text-lg">{userDetails.user.username}</h4> */}
//                         <p className="text-sm text-gray-500">{userDetails.user.bio}</p>
//                     </div>
//                 </div>

//                 <div className="grid grid-cols-3 gap-4 text-center mb-4">
//                     <div>
//                         <p className="font-semibold">{userDetails.stats.posts_count}</p>
//                         <p className="text-sm text-gray-500">posts</p>
//                     </div>
//                     <div>
//                         <p className="font-semibold">{userDetails.stats.followers_count}</p>
//                         <p className="text-sm text-gray-500">followers</p>
//                     </div>
//                     <div>
//                         <p className="font-semibold">{userDetails.stats.following_count}</p>
//                         <p className="text-sm text-gray-500">following</p>
//                     </div>
//                 </div>

//                 <div className="grid grid-cols-3 gap-2 mb-4">
//                     {userDetails.latest_posts.map((post, index) => (
//                         <div key={index} className="aspect-square overflow-hidden">
//                             {post.media[0]?.media_type === 'image' ? (
//                                 <Image
//                                     src={post.media[0].media_file}
//                                     alt="Post preview"
//                                     className="w-full h-full object-cover"
//                                 />
//                             ) : (
//                                 <video
//                                     src={post.media[0]?.media_file}
//                                     className="w-full h-full object-cover"
//                                 />
//                             )}
//                         </div>
//                     ))}
//                 </div>

//                 <div className="flex gap-2">
//                     <Button
//                         fullWidth
//                         color="primary"
//                         startContent={<Messenger />}
//                     >
//                         Message
//                     </Button>
//                     <Button
//                         fullWidth
//                         color="default"
//                     >
//                         Follow
//                     </Button>
//                 </div>
//             </CardBody>
//         </Card>
//     );
// };

// export default HoverContent;