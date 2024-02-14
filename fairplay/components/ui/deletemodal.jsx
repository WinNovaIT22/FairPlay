"use client"

import React, { useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input } from "@nextui-org/react";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { RiDeleteBin6Line } from "react-icons/ri";

export default function DeleteModal() {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [isVisiblePassword1, setIsVisiblePassword1] = useState(false);

  const toggleVisibilityPassword1 = () => setIsVisiblePassword1(!isVisiblePassword1);

  return (
    <>
      <Button onPress={onOpen} variant="solid" color="danger" className="font-bold mb-3">
        <RiDeleteBin6Line size={18} />Poista käyttäjä
      </Button>  
      <Modal 
        isOpen={isOpen} 
          onOpenChange={onOpenChange}
          placement="center"
        >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Poista käyttäjä</ModalHeader>
                <ModalBody>
                  <p className="text-sm">Vahvista käyttäjä poisto kirjoittamalla salasanasi</p>
                  <Input
                    autoFocus
                    placeholder="Syötä salasana"
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
                </ModalBody>
                <ModalFooter>
                  <Button variant="light" onPress={onClose} className="font-bold">
                    Peruuta
                  </Button>
                  <Button color="danger" variant="flat" onPress={onClose} className="font-bold">
                    <RiDeleteBin6Line size={18} />Poista käyttäjä ikuisesti
                  </Button>
                </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}