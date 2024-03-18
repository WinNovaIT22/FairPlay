"use client"

import React, { useState } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input } from '@nextui-org/react';
import { IoEyeOutline, IoEyeOffOutline } from 'react-icons/io5';
import { toast } from 'react-toastify';

const PasswordModal = ({ isOpen, onClose, user }) => {
  const [isVisiblePassword, setIsVisiblePassword] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const toggleVisibilityPassword = () => setIsVisiblePassword(!isVisiblePassword);

  const updatePassword = async () => {
    try {
      const response = await fetch('/api/user/updatePasswordAdmin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: user.id, newPassword }),
      });

      if (response.ok) {
        console.log('Password updated successfully');
        onClose();
        notify()
      } else {
        const data = await response.json();
        notifyError()
        setErrorMessage(data.message || 'Failed to update password');
      }
    } catch (error) {
      console.error('Error updating password:', error);
      setErrorMessage('Something went wrong');
    }
  };

  const notify = () => toast.success("Salasana vaihdettu!");
  const notifyError = () => toast.error("Salasanan vaihto epäonnistui");

  return (
    <Modal size={'lg'} placement={'center'} isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">Vaihda salasana käyttäjälle</ModalHeader>
        <ModalBody>
          <Input
            placeholder="Syötä uusi salasana"
            endContent={
              <button className="focus:outline-none" type="button" onClick={toggleVisibilityPassword}>
                {isVisiblePassword ? (
                  <IoEyeOffOutline size={22} className="text-2xl text-slate-300 pointer-events-none" />
                ) : (
                  <IoEyeOutline size={22} className="text-2xl text-slate-300 pointer-events-none" />
                )}
              </button>
            }
            type={isVisiblePassword ? 'text' : 'password'}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </ModalBody>
        <ModalFooter>
          <Button variant="light" onPress={onClose} className="font-bold">
            Peruuta
          </Button>
          <Button color="success" variant="flat" onPress={updatePassword} className="font-bold">
            Vahvista
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default PasswordModal;