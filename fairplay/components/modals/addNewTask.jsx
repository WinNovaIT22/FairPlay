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
  const [selectedVehicle, setSelectedVehicle] = useState("");

  const addVehicle = async () => {
    try {
      const response = await fetch("/api/user/updateVehicles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ vehicle: selectedVehicle }),
      });

      if (response.ok) {
        console.log("Vehicle added successfully");
        window.location.reload(true);
        onClose();
      } else {
        console.error("Failed to add vehicle:", response.statusText);
      }
    } catch (error) {
      console.error("Error adding vehicle:", error);
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
            />
            <Textarea
              label="Kuvaus (valinnainen)"
              placeholder="Kerro tarvittaessa lisätietoa tempusta"
              labelPlacement="outside"
            />
            <Input
              type="number"
              label="Pistemäärä"
              placeholder="0"
              labelPlacement="outside"
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
              <Checkbox value="buenos-aires">teksti</Checkbox>
              <Checkbox value="sydney">kuva</Checkbox>
            </CheckboxGroup>
            <Divider orientation="horizontal" />
            <Checkbox>Suorituksen voi palauttaa useamman kerran</Checkbox>
          </ModalBody>
          <ModalFooter>
            <Button variant="light" onPress={onClose}>
              Peruuta
            </Button>
            <Button
              color="success"
              variant="flat"
              onPress={addVehicle}
              isDisabled={!selectedVehicle}
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
