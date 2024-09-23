'use client';

import React from 'react';
import { 
  Modal, 
  Button, 
  Input,  
  ModalHeader,     
  ModalBody, 
  ModalFooter,
  ModalContent
} from '@nextui-org/react';

export default function SearchModal({ open, onClose }) { 

  return(
    <Modal open={open} onClose={onClose}>
      <ModalContent>
        <ModalHeader>
          <h2>Search</h2>
        </ModalHeader>
        <ModalBody>
          <Input clearable label="Search" placeholder="Type here..." />
        </ModalBody>
        <ModalFooter>
          <Button flat auto color="error" onPress={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
};

