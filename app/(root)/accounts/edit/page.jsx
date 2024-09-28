'use client';

import React, { useState, useEffect } from 'react';
import { Avatar, Input, Button, Select, SelectItem, Textarea } from '@nextui-org/react';

export default function EditPage({ profile }) {

    return (
        <main className='flex'>
            <div className="grow h-screen overflow-y-auto px-2">
                <form className="flex flex-col gap-y-5 mt-4 lg:mt-6 mb-[50px] md:mb-0">
                    <div className='bg-[#EFEFEF] dark:bg-[#262626] my-2 py-4 rounded-lg pl-3'>
                        <div className="flex">
                            <Avatar
                                radius="full"
                                className="text-sm flex-shrink-0 h-20 w-20"
                                src={profile.profile_picture || "/default-avatar.png"}
                            />
                            <div className="flex flex-col ml-2 my-auto">
                                <p className='font-semibold text-sm cursor-pointer mx-4'>
                                    {profile.username}
                                </p>
                                <div className='flex gap-x-4'>
                                    <Button
                                        className="cursor-pointer bg-inherit font-semibold text-[#1877F2] hover:text-black dark:hover:text-white"
                                    >
                                        Change Profile Picture
                                    </Button>
                                    <input
                                        id="profile-picture-input"
                                        type="file"
                                        hidden
                                    />
                                    <Button
                                        className="cursor-pointer bg-inherit font-semibold text-[#f21818] hover:text-black dark:hover:text-white"
                                    >
                                        Remove Profile Picture
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Input
                        name="website"
                        value={profile.website}
                        onChange={handleInputChange}
                        type="url"
                        label="Website"
                        placeholder="Enter your website URL"
                    />
                    <Textarea
                        name="bio"
                        value={profile.bio}
                        onChange={handleInputChange}
                        label="Bio"
                        placeholder="Tell us about yourself"
                        maxLength={150}
                    />
                    <Input
                        name="phone_number"
                        value={profile.phone_number}
                        onChange={handleInputChange}
                        label="Phone Number"
                        placeholder="Enter your phone number"
                    />
                    <Select
                        name="gender"
                        label="Gender"
                        placeholder="Select your gender"
                        value={profile.gender}
                        onChange={(e) => handleInputChange({ target: { name: 'gender', value: e.target.value } })}
                    >
                        <SelectItem key="M" value="M">Male</SelectItem>
                        <SelectItem key="F" value="F">Female</SelectItem>
                        <SelectItem key="O" value="O">Other</SelectItem>
                    </Select>
                    <div className='my-b w-full flex justify-end'>
                        <div className="grow"></div>
                        <div className="w-48 md:w-64">
                            <Button
                                type="submit"
                                className="bg-[#4CB5F9] text-white"
                                isLoading={isLoading}
                            >
                                Save Changes
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        </main>
    );
}
