import axiosInstance from './axiosInstance';

const ApiService = {
  getCurrentUser: async () => {    
    const response = await axiosInstance.get('api/users/me/');    
    return response.data;
  },

  searchUsers: async (query) => {
    const response = await axiosInstance.get(`api/users/search/?q=${encodeURIComponent(query)}`);
    return response.data;
  },

  async getCurrentUserProfile() {
    const response = await axiosInstance.get('/profiles/me/');
    return response.data;
  },

  updateUserProfile: async (userData) => {
    const response = await axiosInstance.patch('api/profiles/me/', userData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  removeProfilePicture: async () => {
    const response = await axiosInstance.delete('api/profiles/me/remove-photo/');
    return response.data;
  },

  getPosts: async (page = 1, limit = 10) => {
    const response = await axiosInstance.get(`api/posts/?page=${page}&limit=${limit}`);
    return response.data;
  },

  likePost: async (postId) => {  
    const response = await axiosInstance.post(`api/posts/${postId}/like/`);  
    return response.data;
  },

  getShareLink: async (postId) => {  
    const response = await axiosInstance.get(`api/posts/${postId}/get_share_link/`);  
    return response.data;
  },

  createPost: async (postData) => {
    const response = await axiosInstance.post('/posts/', postData);
    return response.data;
  },

  savePost: async (postId) => {  
    const response = await axiosInstance.post(`api/posts/${postId}/save/`); 
    return response.data;
  },

  unsavePost: async (postId) => {
    const response = await fetch(`api/posts/${postId}/unsave/`, );
    return response.data;
  },

  getReels: async () => {
    const response = await axiosInstance.get('/api/reels/');
    return response.data;
  },

  saveReel: async (reelId) => {
    const response = await fetch(`api/reels/${reelId}/save/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });
    if (!response.ok) {
      throw new Error('Failed to save reel');
    }
    return response.json();
  },

  unsaveReel: async (reelId) => {
    const response = await fetch(`api/reels/${reelId}/unsave/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });
    if (!response.ok) {
      throw new Error('Failed to unsave reel');
    }
    return response.json();
  },

  likeReel: async (reelId) => {  
    const response = await axiosInstance.post(`api/reels/${reelId}/like/`);  
    return response.data;
  },

  getFollowingStories: async () => {
    const response = await axiosInstance.get('/stories/following_stories/');
    return response.data;
  },

  getMyStories: async () => {
    const response = await axiosInstance.get('/stories/my_stories/');
    return response.data;
  },

  createStory: async (storyData) => {
    const response = await axiosInstance.post('/stories/', storyData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  updateStory: async (storyId, storyData) => {
    const response = await axiosInstance.put(`/stories/${storyId}/`, storyData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  deleteStory: async (storyId) => {
    const response = await axiosInstance.delete(`/stories/${storyId}/`);
    return response.data;
  },

  getMessages: async (userId) => {
    const response = await axiosInstance.get(`/messages/?user=${userId}`);
    return response.data;
  },

  sendMessage: async (messageData) => {
    const response = await axiosInstance.post('/messages/', messageData);
    return response.data;
  },

  getFollowers: async (userId) => {
    const response = await axiosInstance.get(`/follows/?followed=${userId}`);
    return response.data;
  },

  getFollowing: async (userId) => {
    const response = await axiosInstance.get(`/follows/?follower=${userId}`);
    return response.data;
  },

  followUser: async (userId) => {
    const response = await axiosInstance.post('/follows/', { followed: userId });
    return response.data;
  },

  getNotifications: async () => {
    const response = await axiosInstance.get('/notifications/');
    return response.data;
  },

  markNotificationAsRead: async (notificationId) => {
    const response = await axiosInstance.patch(`/notifications/${notificationId}/`, { is_read: true });
    return response.data;
  },

};

export default ApiService;