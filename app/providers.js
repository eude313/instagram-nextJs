"use client";

import React from 'react'
import { NextUIProvider } from '@nextui-org/react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { ModalProvider } from "@/contexts/ModalContext";
import { LikeProvider } from "@/contexts/LikeContext";
import AuthGuard from '@/components/AuthGuard/AuthGuard';

export function Providers({ children }) {
  
  return (
    <NextUIProvider>
      <AuthGuard>
        <NextThemesProvider attribute="class"
          defaultTheme="system"
          enableSystem={true}
        >
            <LikeProvider>
              <ModalProvider>
                {children}
              </ModalProvider>
            </LikeProvider>
        </NextThemesProvider>
      </AuthGuard>
    </NextUIProvider>
  );
}