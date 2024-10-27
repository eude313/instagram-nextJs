"use client";


import { useParams } from 'next/navigation';

const UserProfilePage = () => {
    const { username } = useParams();

    return (
        <div>
            <h1>Profile Page for: {username}</h1>
        </div>
    );
};

export default UserProfilePage;
