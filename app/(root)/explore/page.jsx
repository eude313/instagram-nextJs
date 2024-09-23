"use client";

import React, { useEffect, useState, useCallback } from 'react';
import ApiService from '@/lib/ApiService';
import { ScrollShadow, Card, Spinner } from "@nextui-org/react";
import { useInView } from 'react-intersection-observer';

export default function ExplorePage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  
  const { ref, inView } = useInView({
    triggerOnce: false, 
    threshold: 1.0,     
  });

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    try {
      const data = await ApiService.getPosts(page); 
      setPosts((prevPosts) => [...prevPosts, ...data.results]);
      setHasMore(data.results.length > 0); 
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  useEffect(() => {
    if (inView && hasMore && !loading) {
      setPage((prevPage) => prevPage + 1); 
    }
  }, [inView, hasMore, loading]);

  if (error) return <div>Error: {error}</div>;

  return (
    <ScrollShadow hideScrollBar className="container mx-auto px-4">
      <div className="grid grid-cols-1 gap-4">
        {posts.map((post) => (
          <Card key={post.id}>
            <Card.Header>
              <Text h4>{post.user.username}</Text>
            </Card.Header>
            <Card.Body>
              <Text>{post.caption}</Text>
            </Card.Body>
            <Card.Footer>
              <Text>{post.created_at}</Text>
              <Text>{post.likes_count} Likes</Text>
              <Text>{post.comments_count} Comments</Text>
            </Card.Footer>
          </Card>
        ))}
      </div>

      <div ref={ref} className="flex justify-center my-4">
        {loading &&  <Spinner size="sm"/>}
        {!hasMore && <p>No more posts</p>}
      </div>
    </ScrollShadow>
  );
}
