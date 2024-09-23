import { createContext, useContext, useState } from 'react';

const ModalContext = createContext();

export function ModalProvider({ children }) {
  const [modals, setModals] = useState({});

  const openModal = (modalName) => {
    setModals((prevModals) => ({ ...prevModals, [modalName]: true }));
    console.log(`Opening ${modalName}`); // Debugging output
  };

  const closeModal = (modalName) => {
    setModals((prevModals) => ({ ...prevModals, [modalName]: false }));
    console.log(`Closing ${modalName}`); // Debugging output
  };

  return (
    <ModalContext.Provider value={{ modals, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
}

export const useModal = () => useContext(ModalContext);
