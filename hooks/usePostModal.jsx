'use client';

import { useCallback } from 'react';
import { useModal } from '@/contexts/ModalContext';  

export function usePostModal(router) {
  const { openModal, closeModal, isOpen, modalContent } = useModal();

  const openPostModal = useCallback((postId) => {
    openModal({ type: 'post', postId });
    if (router) {
      router.push(`?postId=${postId}`, undefined, { shallow: true });
    }
  }, [openModal, router]);

  const closePostModal = useCallback(() => {
    closeModal();
    if (router) {
      router.push(router.pathname, undefined, { shallow: true });
    }
  }, [closeModal, router]);

  const isPostModalOpen = isOpen && modalContent?.type === 'post';
  const currentPostId = isPostModalOpen ? modalContent.postId : null;

  return { openPostModal, closePostModal, isPostModalOpen, currentPostId };
}