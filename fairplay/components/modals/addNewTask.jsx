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
  Checkbox,
  CheckboxGroup,
  Textarea,
  Divider,
} from "@nextui-org/react";
import { HiOutlinePlus } from "react-icons/hi2";

const AddTask = ({ isOpen, onClose }) => {
  const [task, setTask] = useState("");
  const [taskdesc, setTaskdesc] = useState("");
  const [image, setImage] = useState(false);
  const [text, setText] = useState(false);
  const [again, setAgain] = useState(false);
  const [points, setPoints] = useState("");

  const addVehicle = async () => {
    try {
      const formData = new FormData();
      formData.append("task", task);
      formData.append("taskdesc", taskdesc);
      formData.append("image", image);
      formData.append("text", text);
      formData.append("again", again);
      formData.append("points", points);

      const response = await fetch("/api/admin/createTasks", {
        method: "POST",
        body: formData,
      });

      console.log(formData)

      if (response.ok) {
        console.log("Task created successfully.");
        window.location.reload(true);
        onClose();
      } else {
        console.error("Failed to create task:", response.statusText);
      }
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  return (
    <>
      <Modal size={"xl"} placement={"center"} isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            Lisää uusi suoritus
          </ModalHeader>
          <ModalBody>
            <Input
              label="Suoritus"
              labelPlacement="outside"
              placeholder="Mitä pitää tehdä, suorituksen nimi, yms.."
              onChange={(e) => setTask(e.target.value)}
            />
            <Textarea
              label="Kuvaus (valinnainen)"
              placeholder="Kerro tarvittaessa lisätietoa tempusta"
              labelPlacement="outside"
              onChange={(e) => setTaskdesc(e.target.value)}
            />
            <Input
              type="number"
              label="Pistemäärä"
              placeholder="0"
              labelPlacement="outside"
              onChange={(e) => setPoints(e.target.value)}
              className="w-24"
              endContent={
                <div className="pointer-events-none flex items-center">
                  <span className="text-default-400 text-small">p</span>
                </div>
              }
            />
            <CheckboxGroup
              label="Mitä kilpailijalta vaaditaan palauttaessa?"
              orientation="horizontal"
              className="mt-2"
            >
              <Checkbox
                value="text"
                onChange={(e) => setText(e.target.checked)}
              >
                teksti
              </Checkbox>
              <Checkbox
                value="image"
                onChange={(e) => setImage(e.target.checked)}
              >
                kuva
              </Checkbox>
            </CheckboxGroup>
            <Divider orientation="horizontal" />
            <Checkbox onChange={(e) => setAgain(e.target.checked)}>
              Suorituksen voi palauttaa useamman kerran
            </Checkbox>
          </ModalBody>
          <ModalFooter>
            <Button variant="light" onPress={onClose}>
              Peruuta
            </Button>
            <Button
              color="success"
              variant="flat"
              onPress={addVehicle}
              startContent={<HiOutlinePlus size={18} />}
            >
              Lisää
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddTask;
