'use client';

import Posts from "@/components/Posts";
import ApiService from '@/lib/ApiService';
import { Spinner } from "@nextui-org/react";
import { useRouter } from 'next/navigation';
import ProgressBar from "@/components/ProgressBar";
import React, { useState, useEffect, useCallback } from "react";
import { useInView } from 'react-intersection-observer';

export default function Page() {
  const router = useRouter();
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const { ref, inView } = useInView({ threshold: 1.0, triggerOnce: false });


  const initializePosts = useCallback(async () => {
    try {
      setLoading(true);
      const response = await ApiService.getPosts(1);

      if (response.results && response.results.length > 0) {
        setPosts(response.results);
        setTotalPosts(response.totalPosts);
        setHasMore(response.next !== null);
        setPage(2);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Error fetching initial posts:', error);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  }, []);

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
        setTotalPosts(response.totalPosts);
        setHasMore(response.next !== null);
        setPage(prevPage => prevPage + 1);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  }, [page, loading, hasMore]);

  useEffect(() => {
    initializePosts();
  }, [initializePosts]);

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
      {loading && <ProgressBar />}
      {!hasMore && <div className="text-center text-gray-500">No more posts</div>}
      <div ref={ref} style={{ height: '10px' }}></div>
    </div>
  );
}