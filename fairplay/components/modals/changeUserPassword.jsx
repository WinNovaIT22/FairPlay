"use client"

import React, { useState } from "react";
import { MdLockOutline } from "react-icons/md";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input } from "@nextui-org/react";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";

export default function PasswordModal() {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [isVisiblePassword1, setIsVisiblePassword1] = useState(false);
  const [isVisiblePassword2, setIsVisiblePassword2] = useState(false);
  const [isVisiblePassword3, setIsVisiblePassword3] = useState(false);

  const toggleVisibilityPassword1 = () => setIsVisiblePassword1(!isVisiblePassword1);
  const toggleVisibilityPassword2 = () => setIsVisiblePassword2(!isVisiblePassword2);
  const toggleVisibilityPassword3 = () => setIsVisiblePassword3(!isVisiblePassword3);

  return (
    <>
      <Button onPress={onOpen} color="warning" className="font-bold mb-2">
        <MdLockOutline size={18} />Vaihda salasanasi
      </Button>  
      <Modal 
        isOpen={isOpen} 
        onOpenChange={onOpenChange}
        placement="center"
      >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">Vaihda salasana</ModalHeader>
              <ModalBody>
                <Input
                  autoFocus
                  className="mb-3"
                  placeholder="Syötä nykyinen salasana"
                  endContent={
                    <button className="focus:outline-none" type="button" onClick={toggleVisibilityPassword1}>
                    {isVisiblePassword1 ? (
                      <IoEyeOffOutline size={22} className="text-2xl text-slate-300 pointer-events-none" />
                    ) : (
                      <IoEyeOutline size={22} className="text-2xl text-slate-300 pointer-events-none" />
                    )}
                    </button>
                  }
                  type={isVisiblePassword1 ? "text" : "password"}
                />
                <Input
                  label="Uusi salasana"
                  placeholder="Syötä uusi salasana"
                  endContent={
                    <button className="focus:outline-none" type="button" onClick={toggleVisibilityPassword2}>
                    {isVisiblePassword2 ? (
                      <IoEyeOffOutline size={22} className="text-2xl text-slate-300 pointer-events-none" />
                    ) : (
                      <IoEyeOutline size={22} className="text-2xl text-slate-300 pointer-events-none" />
                    )}
                    </button>
                  }
                  type={isVisiblePassword2 ? "text" : "password"}
                  />
                  <Input
                    label="Uusi salasana uudelleen"
                    placeholder="Syötä uusi salasana uudelleen"
                    endContent={
                      <button className="focus:outline-none" type="button" onClick={toggleVisibilityPassword3}>
                      {isVisiblePassword3 ? (
                        <IoEyeOffOutline size={22} className="text-2xl text-slate-300 pointer-events-none" />
                      ) : (
                        <IoEyeOutline size={22} className="text-2xl text-slate-300 pointer-events-none" />
                      )}
                      </button>
                    }
                    type={isVisiblePassword3 ? "text" : "password"}
                  />
                </ModalBody>
                <ModalFooter>
                  <Button variant="light" onPress={onClose} className="font-bold">
                      Peruuta
                  </Button>
                  <Button color="success" variant="flat" onPress={onClose} className="font-bold">
                      Vahvista
                  </Button>
                </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}