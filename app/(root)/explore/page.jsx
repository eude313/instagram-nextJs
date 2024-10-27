"use client";

import React, { useEffect, useState, useCallback } from 'react';
import ApiService from '@/lib/ApiService';
import ProgressBar from "@/components/ProgressBar";
import { ScrollShadow, Spinner, Card, CardHeader, CardBody, CardFooter } from "@nextui-org/react";
import { useInView } from 'react-intersection-observer';

export default function ExplorePage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [totalPosts, setTotalPosts] = useState(0);

  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 1.0,
  });

  const fetchPosts = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const data = await ApiService.getPosts(page);
      setPosts((prevPosts) => [...prevPosts, ...data.results]);
      setTotalPosts(data.totalPosts);
      setHasMore(data.next !== null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [page, loading, hasMore]);

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
            <CardHeader>
              <h4>{post.user.username}</h4>
            </CardHeader>
            <CardBody>
              <p>{post.caption}</p>
            </CardBody>
            <CardFooter>
              <p>{post.created_at}</p>
              <p>{post.likes_count} Likes</p>
              <p>{post.comments_count} Comments</p>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div ref={ref} className="flex justify-center my-4">
        {loading && <ProgressBar />}
        {!hasMore && posts.length > 0 && (
          <p>{posts.length === totalPosts ? 'No more posts' : 'Loading more posts...'}</p>
        )}
        {!hasMore && posts.length === 0 && <p>No posts available</p>}
      </div>
    </ScrollShadow>
  );
}

// export default function ExplorePage() {
//   const [posts, setPosts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [page, setPage] = useState(1);
//   const [hasMore, setHasMore] = useState(true);

//   const { ref, inView } = useInView({
//     triggerOnce: false,
//     threshold: 1.0,
//   });

//   const fetchPosts = useCallback(async () => {
//     setLoading(true);
//     try {
//       const data = await ApiService.getPosts(page);
//       setPosts((prevPosts) => [...prevPosts, ...data.results]);
//       setHasMore(data.results.length > 0);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   }, [page]);

//   useEffect(() => {
//     fetchPosts();
//   }, [fetchPosts]);

//   useEffect(() => {
//     if (inView && hasMore && !loading) {
//       setPage((prevPage) => prevPage + 1);
//     }
//   }, [inView, hasMore, loading]);

//   if (error) return <div>Error: {error}</div>;

//   return (
//     <ScrollShadow hideScrollBar className="container mx-auto px-4">
//       <div className="grid grid-cols-1 gap-4">
//         {posts.map((post) => (
//           <Card key={post.id}>
//             <CardHeader>
//               <h4>{post.user.username}</h4>
//             </CardHeader>
//             <CardBody>
//               <p>{post.caption}</p>
//             </CardBody>
//             <CardFooter>
//               <p>{post.created_at}</p>
//               <p>{post.likes_count} Likes</p>
//               <p>{post.comments_count} Comments</p>
//             </CardFooter>
//           </Card>
//         ))}
//       </div>

//       <div ref={ref} className="flex justify-center my-4">
//         {loading && <Spinner size="sm" />}
//         {!hasMore && <p>No more posts</p>}
//       </div>
//     </ScrollShadow>
//   );
// }


