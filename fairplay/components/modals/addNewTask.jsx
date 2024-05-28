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
  Textarea,
  Divider,
} from "@nextui-org/react";
import { HiOutlinePlus } from "react-icons/hi2";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddTask = ({ isOpen, onClose, year, onTaskAdded }) => {
  const [task, setTask] = useState("");
  const [taskdesc, setTaskdesc] = useState("");
  const [image, setImage] = useState(false);
  const [text, setText] = useState(false);
  const [again, setAgain] = useState(false);
  const [points, setPoints] = useState(0);

  const addTask = async () => {
    try {
      const response = await fetch("/api/admin/createTasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          task: task,
          taskdesc: taskdesc,
          image: image,
          text: text,
          again: again,
          points: points,
          year: year,
        }),
      });

      if (response.ok) {
        console.log("Task created successfully.");
        // Notify parent component to fetch tasks
        onTaskAdded();
      } else {
        console.error("Failed to create task:", response.statusText);
      }
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  const notify = () => toast.success("Suoritus lisätty ja päivittyy 2min sisällä.");

  const handlePress = () => {
    addTask();
    onClose();
    notify();
  };

  return (
    <Modal size={"xl"} placement={"center"} isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          Lisää uusi suoritus {year}
        </ModalHeader>
        <ModalBody>
          <Input
            label="Suoritus"
            labelPlacement="outside"
            placeholder="Mitä pitää tehdä, suorituksen nimi, yms.."
            onChange={(e) => setTask(e.target.value)}
            value={task}
          />
          <Textarea
            label="Kuvaus (valinnainen)"
            placeholder="Kerro tarvittaessa lisätietoa tempusta"
            labelPlacement="outside"
            onChange={(e) => setTaskdesc(e.target.value)}
            value={taskdesc}
          />
          <Input
            type="number"
            label="Pistemäärä"
            placeholder="0"
            labelPlacement="outside"
            onChange={(e) => setPoints(Number(e.target.value))}
            value={points}
            className="w-24"
            endContent={
              <div className="pointer-events-none flex items-center">
                <span className="text-default-400 text-small">p</span>
              </div>
            }
          />
          <div className="mt-2">
            <p className="text-sm mb-2 text-gray-400">Mitä kilpailijalta vaaditaan palauttaessa?</p>
            <Checkbox
              isSelected={text}
              onChange={(e) => setText(e.target.checked)}
              className="mr-2"
            >
              teksti
            </Checkbox>
            <Checkbox
              isSelected={image}
              onChange={(e) => setImage(e.target.checked)}
            >
              kuva
            </Checkbox>
          </div>
          <Divider orientation="horizontal" className="my-4" />
          <Checkbox
            isSelected={again}
            onChange={(e) => setAgain(e.target.checked)}
          >
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
            onPress={handlePress}
            startContent={<HiOutlinePlus size={18} />}
          >
            Lisää
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddTask;
