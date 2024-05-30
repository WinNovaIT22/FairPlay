"use client";

import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
} from "@nextui-org/react";

const EditUserPoints = ({ isOpen, onClose }) => {
  return (
    <Modal size={"lg"} placement={"center"} isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          Muuta käyttäjän pisteitä
        </ModalHeader>
        <ModalBody>
          <Input placeholder="Syötä.." type="text" />
        </ModalBody>
        <ModalFooter>
          <Button variant="light" onPress={onClose}>
            Peruuta
          </Button>
          <Button color="success" variant="flat">
            Vahvista
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditUserPoints;
