"use client";

import React from 'react'
import { NextUIProvider } from '@nextui-org/react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { ModalProvider } from "@/contexts/ModalContext";
import { LikeProvider } from "@/contexts/LikeContext";
import { ProgressBarProvider } from "@/contexts/ProgressBarContext";
import AuthGuard from '@/components/AuthGuard/AuthGuard';

export function Providers({ children }) {
  
  return (
    <NextUIProvider>
      <AuthGuard>
        <NextThemesProvider attribute="class"
          defaultTheme="system"
          enableSystem={true}
        >
          <ProgressBarProvider>
            <LikeProvider>
              <ModalProvider>
                {children}
              </ModalProvider>
            </LikeProvider>
          </ProgressBarProvider>
        </NextThemesProvider>
      </AuthGuard>
    </NextUIProvider>
  );
}