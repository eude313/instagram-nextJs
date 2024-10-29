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
                                    // className={`w-4 h-4 ${isAdmin ? 'text-green-500' : 'text-[#0090EE]'}`}
                                    fill={isAdmin ? 'green' : '#0090EE'}
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
