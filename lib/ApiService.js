import axiosInstance from './axiosInstance';

const ApiService = {

  registerUser: async (userData) => {
    try {
      const response = await axiosInstance.post('api/auth/register/', userData);
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        throw error.response.data;
      } else {
        throw new Error('An error occurred during registration.');
      }
    }
  },

  loginUser: async (credentials) => {
    try {
      const response = await axiosInstance.post('api/auth/login/', credentials);
      if (response.status === 200) {
        const { access, refresh } = response.data;
        localStorage.setItem('access_token', access);
        localStorage.setItem('refresh_token', refresh);
        return response.data;
      }
      throw new Error('Login failed');
    } catch (error) {
      if (error.response && error.response.data) {
        throw error.response.data;
      } else {
        throw new Error('An error occurred during login.');
      }
    }
  },

  // logoutUser: async () => {
  //   try {
  //     const refresh_token = localStorage.getItem('refresh_token');
  //     if (refresh_token) {
  //       await axiosInstance.post('api/auth/logout/', { refresh_token });
  //     }
  //   } catch (error) {
  //     console.error('Logout error:', error);
  //   } finally {
  //     localStorage.removeItem('access_token');
  //     localStorage.removeItem('refresh_token');
  //   }
  // },
  logoutUser: async () => {
    try {
      const refresh_token = localStorage.getItem('refresh_token');
      if (refresh_token) {
        await axiosInstance.post('api/auth/logout/', { refresh_token });
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Clear all auth-related items from localStorage
      localStorage.clear();  // Or specifically remove tokens
      // Reset axiosInstance default headers if you're setting them
      delete axiosInstance.defaults.headers.common['Authorization'];
    }
  },

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

  getPost: async (postId) => {
    const response = await this.axiosInstance.get(`api/posts/${postId}/`);
    return response.data;
  },

  getPosts: async (page = 1, limit = 10) => {
    try {
      const response = await axiosInstance.get('/api/posts/', {
        params: {
          page,
          limit
        }
      });
      return {
        results: response.data.results,
        totalPosts: response.data.total_posts,
        next: response.data.next,
        previous: response.data.previous
      };
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch posts');
    }
  },

  getUserHoverDetails: async (userId) => {
    try {
      const response = await axiosInstance.get(`/api/users/${userId}/hover_details/`);
      return response.data;
    } catch (error) {
      console.error('Error fetching user details:', error);
      throw new Error(error.response?.data?.message || 'Failed to fetch user details');
    }
  },

  followUser: async (userId) => {
    try {
      const response = await axiosInstance.post(`api/users/${userId}/follow/`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to follow user');
    }
  },

  unfollowUser: async (userId) => {
    try {
      const response = await axiosInstance.post(`api/users/${userId}/unfollow/`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to unfollow user');
    }
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
    const response = await fetch(`api/posts/${postId}/unsave/`,);
    return response.data;
  },

  postComment: async (postId, commentData) => {
    const response = await axiosInstance.post(`/api/posts/${postId}/comments/`, { content: commentData });
    return response.data;
  },

  getComments: async (postId) => {
    const response = await axiosInstance.get(`/api/posts/${postId}/comments/`);
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

  createOrGetChat: async ({ participants, type }) => {
    try {
      const response = await fetch('/api/chats', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          participants,
          type
        }),
      });
      
      if (!response.ok) throw new Error('Failed to create/get chat');
      return await response.json();
    } catch (error) {
      console.error('Error in createOrGetChat:', error);
      throw error;
    }
  },

  getMessages: async (chatId) => {
    try {
      const response = await fetch(`/api/chats/${chatId}/messages`);
      if (!response.ok) throw new Error('Failed to fetch messages');
      return await response.json();
    } catch (error) {
      console.error('Error in getMessages:', error);
      throw error;
    }
  }
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