'use client';

import {
  Modal,
  Button,
  Input,
  ModalBody,
  ModalContent,
  Avatar,
  Checkbox,
  Spinner,
  cn,
  Divider,
  Chip
} from '@nextui-org/react';
import { Close } from '@/icons';
import debounce from 'lodash/debounce';
import ApiService from '@/lib/ApiService';
import { useRouter } from 'next/navigation';
import { useModal } from '@/contexts/ModalContext';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import React, { useState, useCallback, useEffect } from 'react';

export default function SearchModal() {
  const router = useRouter();
  const { modalState, closeModal } = useModal();
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [chatName, setChatName] = useState('');
  const [error, setError] = useState(null);
  const isSmallScreen = useMediaQuery('(max-width: 768px)');

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const user = await ApiService.getCurrentUser();
        setCurrentUser(user);
      } catch (error) {
        console.error("Error fetching current user:", error);
        setError("Failed to load user information");
      }
    };

    fetchCurrentUser();
  }, []);

  const debouncedSearch = useCallback(
    debounce(async (query) => {
      if (query.trim()) {
        setIsLoading(true);
        try {
          const results = await ApiService.searchUsers(query);
          // Filter out the current user from search results
          const filteredResults = results.filter(user => user.id !== currentUser?.id);
          setSearchResults(filteredResults);
        } catch (error) {
          console.error("Error searching users:", error);
          setError("Failed to search users");
        } finally {
          setIsLoading(false);
        }
      } else {
        setSearchResults([]);
      }
    }, 300),
    [currentUser]
  );

  const handleInputChange = (e) => {
    setError(null); // Clear any previous errors
    const query = e.target.value;
    setSearchQuery(query);
    debouncedSearch(query);
  };

  const handleUserSelect = (user) => {
    setSelectedUsers(prev => {
      const isSelected = prev.find(u => u.id === user.id);
      if (isSelected) {
        return prev.filter(u => u.id !== user.id);
      }
      return [...prev, user];
    });
  };

  const handleStartChat = async () => {
    if (!selectedUsers.length || !currentUser) {
      setError("Please select at least one user to chat with");
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      // Prepare participant IDs, ensuring no duplicates
      const participantIds = [
        currentUser.id,
        ...selectedUsers.map(user => user.id)
      ].filter((id, index, self) => self.indexOf(id) === index);

      const chatData = {
        type: selectedUsers.length === 1 ? 'single' : 'group',
        participants: participantIds,
        name: selectedUsers.length > 1 ? chatName.trim() : undefined
      };

      const response = await ApiService.createOrGetChat(chatData);

      if (response && response.id) {
        closeModal();
        router.push(`/chats/${response.id}`);
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (error) {
      console.error("Error creating chat:", error);
      setError(error.message || "Failed to create chat. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Reset state when modal closes
  useEffect(() => {
    if (!modalState.isOpen) {
      setSelectedUsers([]);
      setSearchQuery('');
      setSearchResults([]);
      setChatName('');
      setError(null);
    }
  }, [modalState.isOpen]);

  return (
    <Modal
      placement='top'
      onClose={closeModal}
      classNames={{
        body: "bg-[#DBDBDB] dark:bg-[#262626]",
        closeButton: "hidden",
      }}
      isOpen={modalState.isOpen && modalState.type === 'searchModal'}>
      <Button isIconOnly onPress={closeModal} aria-label="close" className="bg-inherit absolute top-0 right-0 m-4">
        <Close />
      </Button>
      <ModalContent>
        <ModalBody className='px-0'>
          <div className="flex justify-center my-2 border-b border-b-[#DBDBDB] dark:border-b-[#262626]">
            <h2 className="font-semibold">
              {selectedUsers.length === 0 ? 'New Message' :
                selectedUsers.length === 1 ? 'New Chat' : 'New Group'}
            </h2>
          </div>

          {error && (
            <div className="px-2 py-1 mb-2 text-red-500 text-sm">
              {error}
            </div>
          )}

          <div className="px-2">
            <Input
              clearable
              label="Search"
              placeholder="Search users..."
              value={searchQuery}
              className="mb-2"
              onChange={handleInputChange}
              endContent={isLoading ? <Spinner size="sm" /> : null}
            />

            {selectedUsers.length > 1 && (
              <Input
                label="Group Name"
                placeholder="Enter group name..."
                value={chatName}
                className="mb-2"
                onChange={(e) => setChatName(e.target.value)}
                isRequired
              />
            )}

            {selectedUsers.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-2">
                {selectedUsers.map((user) => (
                  <Chip
                    key={user.id}
                    onClose={() => handleUserSelect(user)}
                    variant="flat"
                    avatar={
                      <Avatar
                        name={user.username}
                        src={user.profile_picture}
                        alt={user.username}
                      />
                    }
                  >
                    {user.username}
                  </Chip>
                ))}
              </div>
            )}

            <div className="flex flex-col gap-2 max-h-[300px] overflow-y-auto">
              {searchResults.map((user) => (
                <div
                  key={user.id}
                  className={cn(
                    "flex items-center justify-between p-2 hover:bg-content2 rounded-lg cursor-pointer",
                    selectedUsers.some(u => u.id === user.id) && "bg-content2"
                  )}
                  onClick={() => handleUserSelect(user)}
                >
                  <div className="flex items-center gap-2">
                    <Avatar
                      size="sm"
                      src={user.profile_picture}
                      alt={user.username}
                    />
                    <span className="text-sm">{user.username}</span>
                  </div>
                  <Checkbox
                    isSelected={selectedUsers.some(u => u.id === user.id)}
                  />
                </div>
              ))}
            </div>

            {searchQuery && !isLoading && searchResults.length === 0 && (
              <p className="text-center text-default-400">No users found</p>
            )}

            <Button
              className="mt-4"
              fullWidth
              color="primary"
              onPress={handleStartChat}
              isDisabled={selectedUsers.length === 0 || (selectedUsers.length > 1 && !chatName.trim()) || isLoading}
            >
              {isLoading ? <Spinner size="sm" /> :
                selectedUsers.length === 0 ? 'Select Users to Chat' :
                  selectedUsers.length === 1 ? 'Start Chat' :
                    `Create Group Chat (${selectedUsers.length} users)`}
            </Button>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}