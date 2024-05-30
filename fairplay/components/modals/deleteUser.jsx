"use client";

import React, { useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input } from "@nextui-org/react";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { RiDeleteBin6Line } from "react-icons/ri";
import { signOut } from "next-auth/react";

export default function DeleteModal({ userId }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isVisiblePassword1, setIsVisiblePassword1] = useState(false);
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const toggleVisibilityPassword1 = () => setIsVisiblePassword1(!isVisiblePassword1);

  const handleDeleteUser = async () => {
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/user/deleteUser", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, password }),
      });

      if (response.ok) {
        console.log("User deleted successfully");
        signOut()
      } else {
        const data = await response.json();
        setError(data.message || "Failed to delete user");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      setError("Error deleting user");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Button onPress={onOpen} color="danger" className="font-bold">
        <RiDeleteBin6Line size={18} /> Poista itsesi
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="center"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Poista itsesi</ModalHeader>
              <ModalBody>
                <p className="text-sm">Vahvista käyttäjäsi poisto kirjoittamalla salasanasi</p>
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
              </ModalBody>
              <ModalFooter>
                <Button variant="light" onPress={onClose} className="font-bold">
                  Peruuta
                </Button>
                <Button
                  color="danger"
                  variant="flat"
                  onPress={handleDeleteUser}
                  className="font-bold"
                  isLoading={isLoading}
                >
                  <RiDeleteBin6Line size={18} /> Poista käyttäjä ikuisesti
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
