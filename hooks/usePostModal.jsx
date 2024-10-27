import { useCallback, useEffect } from 'react';
import { useModal } from '@/contexts/ModalContext';
import { useRouter } from 'next/navigation';
import { usePathname, useSearchParams } from 'next/navigation';

export function usePostModal() {
  const { modalState, openModal, closeModal } = useModal();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const openPostModal = useCallback((postId) => {
    openModal('post', { postId });
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set('postId', postId);
    router.push(`${pathname}?${newSearchParams.toString()}`, { shallow: true });
  }, [openModal, router, pathname, searchParams]);

  const closePostModal = useCallback(() => {
    closeModal();
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.delete('postId');
    router.push(`${pathname}${newSearchParams.toString() ? `?${newSearchParams.toString()}` : ''}`, { shallow: true });
  }, [closeModal, router, pathname, searchParams]);

  useEffect(() => {
    const postId = searchParams.get('postId');
    if (postId && !modalState.isOpen) {
      openModal('post', { postId });
    }
  }, [searchParams, modalState.isOpen, openModal]);

  const isPostModalOpen = modalState.isOpen && modalState.type === 'post';
  const currentPostId = isPostModalOpen ? modalState.data.postId : null;

  return { openPostModal, closePostModal, isPostModalOpen, currentPostId };
}