'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import axiosInstance from '@/lib/axiosInstance';

export default function AuthGuard({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const validateToken = async () => {
      const token = localStorage.getItem('access_token');
      
      if (!token && !pathname.startsWith('/auth')) {
        router.push('/auth/login');
        return;
      }
    
      if (token) {
        try {
          await axiosInstance.get('api/auth/validate-token/');
          setIsAuthenticated(true);
        } catch (error) {
          console.error('Token validation failed:', error);
          
          if (error.response && (error.response.status === 401 || error.response.status === 403)) {
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            router.push('/auth/login');
          }
        }
      }
    };
    validateToken();
  }, [pathname, router]);

  // For protected routes, render children only if authenticated
  if (!pathname.startsWith('/auth') && !isAuthenticated) {
    return null; // Or a loading spinner
  }

  return children;
}