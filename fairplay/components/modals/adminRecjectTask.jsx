import React, { useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Textarea } from "@nextui-org/react";

const AdminRejectTask = ({ isOpen, onClose, modalData }) => {
  const [rejectReason, setRejectReason] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleReject = async () => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/admin/rejectTask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          taskId: modalData.id,
          admintext: rejectReason,
        }),
      });

      if (response.ok) {
        console.log("Task inspection status updated successfully");
        onClose();
      } else {
        console.error("Failed to update task inspection status:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating task inspection status:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader>Hylkää suoritus: {modalData.tasktitle}</ModalHeader>
        <ModalBody>
          <Textarea
            label="Hylkäyksen syy"
            placeholder="Jos haluat, voit kirjoittaa syyn hylkäykselle, joka näkyy käyttäjälle"
            value={rejectReason}
            onChange={(e) => setRejectReason(e.target.value)}
            fullWidth
          />
        </ModalBody>
        <ModalFooter>
          <Button variant="light" onClick={onClose} disabled={isSubmitting}>
            Peruuta
          </Button>
          <Button color="danger" variant="flat" onClick={handleReject} disabled={isSubmitting}>
            Hylkää suoritus
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AdminRejectTask;
