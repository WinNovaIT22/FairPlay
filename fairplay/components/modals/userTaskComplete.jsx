"use client";

import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Textarea,
} from "@nextui-org/react";
import UploadImage from "@/components/ui/uploadImage";
import { BsSend } from "react-icons/bs";

const UserTaskComplete = ({ isOpen, onClose, taskData, onTaskCompleted }) => {
  const [image, setImage] = useState(null);
  const [textValue, setTextValue] = useState("");

  const handleImageUpload = async () => {
    try {
      if (taskData.image && !image) {
        console.error("No image selected.");
        return;
      }

      const formData = new FormData();
      formData.append("id", taskData.id);

      if (taskData.image) {
        formData.append("image", image.file);
      }

      if (taskData.text) {
        formData.append("text", textValue);
      }

      const response = await fetch("/api/user/completeTasks", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Data uploaded successfully.");
        onTaskCompleted(result.task);
        onClose();
      } else {
        console.error("Failed to upload data:", response.statusText);
      }
    } catch (error) {
      console.error("Error uploading data:", error);
    }
  };

  return (
    <Modal size={"lg"} placement={"center"} isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          Suorita tehtävä: {taskData.tasktitle}
        </ModalHeader>
        <ModalBody>
          <p className="text-sm text-green-500">{taskData.points} pistettä</p>
          <p className="text-sm">{taskData.taskdesc}</p>

          {taskData.admintext !== null && (
            <>
              <p className="font-semibold text-center mt-3 text-yellow-500">Tämä tehtävä palautettiin sinulle syystä: {taskData.admintext}</p>
            </>
          )}

          {taskData.text && (
            <>
              <p className="font-semibold text-center mt-3">Palauta teksti</p>
              <Textarea
                value={textValue}
                onChange={(e) => setTextValue(e.target.value)}
                placeholder="Kirjoita teksti tähän"
              />
            </>
          )}

          {taskData.image && (
            <>
              <p className="font-semibold text-center mt-3">Palauta kuva</p>
              <UploadImage setImage={setImage} />
            </>
          )}
        </ModalBody>
        <ModalFooter>
          <Button variant="light" onPress={onClose}>
            Peruuta
          </Button>
          <Button
            color="success"
            variant="flat"
            isDisabled={taskData.image && !image}
            onPress={handleImageUpload}
            endContent={<BsSend size={18} />}
          >
            Palauta
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default UserTaskComplete;
