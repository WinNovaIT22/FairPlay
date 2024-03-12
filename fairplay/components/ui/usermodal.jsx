"use client"

import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Chip, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react";
import { MdBlock, MdOutlineAdminPanelSettings, MdOutlineRemoveCircleOutline, MdLockOutline } from "react-icons/md";

const roleColorMap = {
  ylläpitäjä: "success",
  kilpailija: "default",
};  

const ModalComponent = ({ isOpen, onClose, modalData }) => {

  if (!modalData) {
    return null;
  }

  const updateUserRole = async (newRole) => {
    try {
      const response = await fetch("/api/user/updateRole", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: modalData.id, newRole }),
      });

      if (response.ok) {
        console.log("User role updated successfully");
        window.location.reload(true);
      } else {
        console.error("Failed to update user role");
      }
    } catch (error) {
      console.error("Error updating user role:", error);
    }
  };

  return (
    <Modal size={"lg"} placement={"center"} isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader>Profiili</ModalHeader>
        <ModalBody>
          {modalData && (
            <>
              <p>{modalData.firstname} {modalData.lastname} <Chip color={roleColorMap[modalData.role]} size="sm" variant="flat">{modalData.role}</Chip><br></br>{modalData.email}</p>
              <p>Ajoneuvo(t): {modalData.vehicle}</p>
            </>
          )}
        </ModalBody>
        <ModalFooter>
          <Dropdown>
            <DropdownTrigger>
              <Button variant="flat">Hallitse</Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Static Actions">
              {modalData.role !== "ylläpitäjä" ? (
                <DropdownItem key="admin" className="text-success" color="success" onClick={() => updateUserRole("ylläpitäjä")} startContent={<MdOutlineAdminPanelSettings />}>Anna ylläpito-oikeudet</DropdownItem>
              ) : (
                <DropdownItem key="remove-admin" className="text-danger" color="danger" onClick={() => updateUserRole("kilpailija")} startContent={<MdOutlineRemoveCircleOutline />}>Poista ylläpito-oikeudet</DropdownItem>
              )}
              <DropdownItem key="block" className="text-warning" color="warning" startContent={<MdLockOutline />}>Vaihda salasana</DropdownItem>
              <DropdownItem key="block" className="text-danger" color="danger" startContent={<MdBlock />}>Anna porttikielto</DropdownItem>
            </DropdownMenu>
          </Dropdown>

        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalComponent;