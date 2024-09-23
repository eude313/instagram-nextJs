'use client';

import Posts from "@/components/Posts";
import ApiService from '@/lib/ApiService';
import { Spinner } from "@nextui-org/react";
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from "react";
import { useInView } from 'react-intersection-observer'; 


export default function Page() {
  const router = useRouter();
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);
  const { ref, inView } = useInView({ threshold: 1.0, triggerOnce: false }); 


  useEffect(() => {
    const token = localStorage.getItem('access_token'); 
    if (!token) {
      router.push('/auth/login');  
    }
  }, [router]);


  useEffect(() => {
    if (inView && hasMore && !loading) {
      setPage((prevPage) => prevPage + 1); 
    }
  }, [inView, hasMore, loading]);

 
  useEffect(() => {
    fetchPosts();
  }, [page]);

  const fetchPosts = async () => {
    try {
      const data = await ApiService.getPosts(page);
      setPosts((prevPosts) => [...prevPosts, ...data.results]);
      if (data.results.length === 0) setHasMore(false); 
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  return (
    <div className='w-auto'>
      <div>
        <Posts posts={posts} />
      </div>
      
      <div ref={ref} className="flex justify-center my-4">
        {loading &&  <Spinner size="sm"/>}
        {!hasMore && <p>No more posts</p>}
      </div>
    </div>
  );
}
