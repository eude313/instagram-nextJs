'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import axiosInstance from '@/lib/axiosInstance';

const PUBLIC_ROUTES = [
  '/auth/login',
  '/auth/register',
  '/auth/forgot-password',
  '/auth/reset-password',
];

export default function AuthGuard({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const isPublicRoute = PUBLIC_ROUTES.some(route => pathname.startsWith(route));

  useEffect(() => {
    const validateToken = async () => {
      const token = localStorage.getItem('access_token');

      // Handle public routes
      if (!token && !isPublicRoute) {
        router.push('/auth/login');
        setIsLoading(false);
        return;
      }

      // Skip validation for public routes if no token exists
      if (!token && isPublicRoute) {
        setIsLoading(false);
        return;
      }

      // Validate token if it exists
      if (token) {
        try {
          const response = await axiosInstance.get('api/auth/validate-token/');
          setIsAuthenticated(true);

          // Redirect authenticated users away from public routes
          if (isPublicRoute) {
            router.push('/');
          }
        } catch (error) {
          console.error('Token validation failed:', error);
          handleAuthError(error);
        }
      }

      setIsLoading(false);
    };

    const handleAuthError = (error) => {
      if (error.response && (error.response.status === 401 || error.response.status === 403)) {
        // Clear all auth-related data
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        setIsAuthenticated(false);

        // Only redirect to login if not already on a public route
        if (!isPublicRoute) {
          router.push('/auth/login');
        }
      }
    };

    validateToken();
  }, [pathname, router, isPublicRoute]);

  // Handle protected routes
  if (!isPublicRoute && !isAuthenticated) {
    return null;
  }

  // Handle public routes or authenticated users
  return children;
}