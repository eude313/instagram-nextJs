'use client';

import Posts from "@/components/Posts";
import ApiService from '@/lib/ApiService';
import { Spinner } from "@nextui-org/react";
import { useRouter } from 'next/navigation';
import React, { useState, useEffect, useCallback } from "react";
import { useInView } from 'react-intersection-observer';

export default function Page() {
  const router = useRouter();
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const { ref, inView } = useInView({ threshold: 1.0, triggerOnce: false });

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      router.push('/auth/login');
    }
  }, [router]);

  const fetchPosts = useCallback(async () => {
    if (loading || !hasMore) return;

    try {
      setLoading(true);
      const response = await ApiService.getPosts(page);
      if (response.results && response.results.length > 0) {
        setPosts(prevPosts => {
          const newPosts = response.results.filter(
            newPost => !prevPosts.some(existingPost => existingPost.id === newPost.id)
          );
          return [...prevPosts, ...newPosts];
        });
        setPage(prevPage => prevPage + 1);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setHasMore(false);
      } else {
        console.error('Error fetching posts:', error);
      }
    } finally {
      setLoading(false);
    }
  }, [page, loading, hasMore]);

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    if (inView && hasMore && !loading) {
      fetchPosts();
    }
  }, [inView, hasMore, loading, fetchPosts]);

  return (

    <div className='w-auto'>
      {posts.map((post) => (
        <Posts key={post.id} post={post} />
      ))}
      {loading && <div className="flex justify-center"><Spinner /></div>}
      {!hasMore && <div className="text-center text-gray-500">No more posts</div>}
      <div ref={ref} style={{ height: '10px' }}></div>
    </div>
  );
}