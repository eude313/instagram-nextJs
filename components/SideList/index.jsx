// "use client";

// import React, { useState, useEffect } from 'react';
// import Link from 'next/link';
// import { CheckMark } from '@/icons';
// import ApiService from '@/lib/ApiService';
// import { Avatar } from '@nextui-org/react';

// import HoverContent from '../Hoover/HoverContent';
// import HoverComponent from '../Hoover/HoverComponent';

// export default function SideList() {
//   const [userDetails, setUserDetails] = useState(null);
//   const [suggestedUsers, setSuggestedUsers] = useState([]);
//   const [showAll, setShowAll] = useState(false);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchUserDetails();
//     fetchSuggestions();
//   }, []);

//   const fetchUserDetails = async () => {
//     try {
//       const data = await ApiService.getCurrentUser();
//       setUserDetails(data);
//     } catch (error) {
//       console.error('Error fetching user details:', error);
//     }
//   };

//   const fetchSuggestions = async (showAllUsers = false) => {
//     try {
//       setLoading(true);
//       const response = await ApiService.getUserSuggestions(showAllUsers);
//       setSuggestedUsers(response.data.results || response.data);
//       setShowAll(showAllUsers);
//     } catch (error) {
//       console.error('Error fetching suggestions:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleFollow = async (userId) => {
//     try {
//       await ApiService.followUser(userId);
//       // Refresh suggestions after following
//       fetchSuggestions(showAll);
//     } catch (error) {
//       console.error('Error following user:', error);
//     }
//   };

//   if (!userDetails) return null;

//   return (
//     <div className='flex flex-col gap-y-1'>
//       {/* Current User Section */}
//       <div className='flex flex-row py-2 gap-3'>
//         <div className='rounded-full'>
//           <Avatar
//             alt={userDetails.username}
//             src={userDetails.profile_picture}
//             className="w-10 h-10 text-sm"
//           />
//         </div>

//         <div className='mr-auto flex items-center'>
//           <div>
//             <p className="font-semibold text-sm flex items-center gap-1">
//               {userDetails.username}
//               {(userDetails.is_staff || userDetails.is_verified) && (
//                 <CheckMark
//                   fill={userDetails.is_staff ? 'green' : '#0090EE'}
//                 />
//               )}
//             </p>
//             <p className='text-sm font-light'>
//               {userDetails.first_name} {userDetails.last_name}
//             </p>
//           </div>
//         </div>
//         <div className='flex items-center'>
//           <button
//             type='button'
//             onClick={() => { openModal('authModal') }}
//             className='mt-1 cursor-pointer font-semibold text-[#1877F2]'>
//             Switch
//           </button>
//         </div>
//       </div>

//       {/* Suggestions Section */}
//       <div className='flex flex-row py-2 gap-3 mb-1'>
//         <h2 className='text-base font-semibold'>Suggested for you</h2>
//         <button
//           onClick={() => fetchSuggestions(!showAll)}
//           className='mt-1 mr-auto cursor-pointer font-semibold text-[#1877F2]'>
//           {showAll ? 'Show less' : 'See all'}
//         </button>
//       </div>

//       {/* Suggested Users List */}
//       {suggestedUsers.map((user) => (
//         <div key={user.id} className='flex flex-row py-2 gap-3'>

//           <div className={`relative ${user.has_story ? 'bg-gradient-to-tr from-[#FFC800] to-[#CC00BF] p-[2px] rounded-full' : ''}`}>
//             <Link href={`/accounts/${user.username}`}>
//               <div className={`rounded-full ${user.has_story ? 'bg-white dark:bg-black p-[2px]' : ''}`}>
//                 <Avatar
//                   alt={user.username}
//                   src={user.profile_picture}
//                   className="w-10 h-10 text-sm"
//                 />
//               </div>
//             </Link>
//           </div>
//           {/* rectify this  */}
//           <HoverComponent hoverContent={<HoverContent post={post} />}>
//             <div className='mr-auto flex items-center'>
//               <div>
//                 <p className="font-semibold text-sm flex items-center gap-1">
//                   {user.username}
//                   {(user.is_staff || user.is_verified) && (
//                     <CheckMark
//                       fill={user.is_staff ? 'green' : '#0090EE'}
//                     />
//                   )}
//                 </p>
//                 <p className='text-sm font-light'>
//                   {user.first_name} {user.last_name}
//                 </p>
//               </div>
//             </div>
//           </HoverComponent >
//           <div className='flex items-center'>
//             <button
//               type='button'
//               onClick={() => handleFollow(user.id)}
//               className='mt-1 cursor-pointer font-semibold text-[#1877F2]'>
//               {user.follows_you ? 'Follow Back' : 'Follow'}
//             </button>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }


"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { CheckMark, UserPlus } from '@/icons';
import ApiService from '@/lib/ApiService';
import { Avatar } from '@nextui-org/react';
import { useModal } from '@/contexts/ModalContext';

export default function SideList() {
  const { openModal } = useModal();
  const [userDetails, setUserDetails] = useState(null);
  const [suggestedUsers, setSuggestedUsers] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUserDetails();
    fetchSuggestions();
  }, []);

  const fetchUserDetails = async () => {
    try {
      const data = await ApiService.getCurrentUser();
      setUserDetails(data);
    } catch (error) {
      console.error('Error fetching user details:', error);
      setError('Failed to load user details');
    }
  };

  const fetchSuggestions = async (showAllUsers = false) => {
    try {
      setLoading(true);
      setError(null);
      const response = await ApiService.getUserSuggestions(showAllUsers);
      setSuggestedUsers(response.data.results || response.data);
      setShowAll(showAllUsers);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
      setError('Failed to load suggestions');
      // Try to fetch random users as fallback
      try {
        const randomUsers = await ApiService.getRandomUsers(showAllUsers ? 10 : 5);
        setSuggestedUsers(randomUsers.data);
      } catch (fallbackError) {
        console.error('Error fetching random users:', fallbackError);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleFollow = async (userId) => {
    try {
      await ApiService.followUser(userId);
      // Remove the followed user from suggestions
      setSuggestedUsers(prev => prev.filter(user => user.id !== userId));
      // Fetch new suggestions if the list is getting too short
      if (suggestedUsers.length <= 2) {
        fetchSuggestions(showAll);
      }
    } catch (error) {
      console.error('Error following user:', error);
    }
  };

  if (!userDetails) return null;

  return (
    <div className='flex flex-col gap-y-1'>
      {/* Current User Section */}
      <div className='flex flex-row py-2 gap-3'>
        <div className='rounded-full'>
          <Avatar
            alt={userDetails.username}
            src={userDetails.profile_picture}
            className="w-10 h-10 text-sm"
          />
        </div>

        <div className='mr-auto flex items-center'>
          <div>
            <p className="font-semibold text-sm flex items-center gap-1">
              {userDetails.username}
              {(userDetails.is_staff || userDetails.is_verified) && (
                <CheckMark
                  fill={userDetails.is_staff ? 'green' : '#0090EE'}
                />
              )}
            </p>
            <p className='text-sm font-light'>
              {userDetails.first_name} {userDetails.last_name}
            </p>
          </div>
        </div>
        <div className='flex items-center'>
          <button
            type='button'
            onClick={() => { openModal('authModal') }}
            className='mt-1 cursor-pointer font-semibold text-[#1877F2]'>
            Switch
          </button>
        </div>
      </div>

      {/* Suggestions Section */}
      <div className='flex flex-row py-2 gap-3 mb-1'>
        <h2 className='text-base font-semibold'>Suggested for you</h2>
        {suggestedUsers.length > 0 && (
          <button
            onClick={() => fetchSuggestions(!showAll)}
            className='mt-1 mr-auto cursor-pointer font-semibold text-[#1877F2]'>
            {showAll ? 'Show less' : 'See all'}
          </button>
        )}
      </div>

      {/* Loading State */}
      {loading && (
        <div className='flex justify-center py-4'>
          <div className='animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900'></div>
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <div className='text-red-500 text-sm text-center py-2'>
          {error}
        </div>
      )}

      {/* No Suggestions State */}
      {!loading && !error && suggestedUsers.length === 0 && (
        <div className='flex flex-col items-center py-4 text-gray-500'>
          <UserPlus className='w-12 h-12 mb-2' />
          <p className='text-sm'>No suggestions available right now.</p>
          <button
            onClick={() => fetchSuggestions(showAll)}
            className='mt-2 text-blue-500 text-sm'>
            Refresh Suggestions
          </button>
        </div>
      )}

      {/* Suggested Users List */}
      {!loading && suggestedUsers.map((user) => (
        <div key={user.id} className='flex flex-row py-2 gap-3 transition-all duration-300 hover:bg-gray-50'>
          <div className={`relative ${user.has_story ? 'bg-gradient-to-tr from-[#FFC800] to-[#CC00BF] p-[2px] rounded-full' : ''}`}>
            <Link href={`/accounts/${user.username}`}>
              <div className={`rounded-full ${user.has_story ? 'bg-white dark:bg-black p-[2px]' : ''}`}>
                <Avatar
                  alt={user.username}
                  src={user.profile_picture}
                  className="w-10 h-10 text-sm"
                />
              </div>
            </Link>
          </div>
          <div className='mr-auto flex items-center'>
            <div>
              <p className="font-semibold text-sm flex items-center gap-1">
                {user.username}
                {(user.is_staff || user.is_verified) && (
                  <CheckMark
                    fill={user.is_staff ? 'green' : '#0090EE'}
                  />
                )}
              </p>
              <p className='text-sm font-light text-gray-500'>
                {user.followers_count > 0 ? `${user.followers_count} followers` : 'New to platform'}
              </p>
            </div>
          </div>
          <div className='flex items-center'>
            <button
              type='button'
              onClick={() => handleFollow(user.id)}
              className='mt-1 cursor-pointer font-semibold text-[#1877F2] hover:text-blue-700
                       transition-colors duration-200'>
              {user.follows_you ? 'Follow Back' : 'Follow'}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}