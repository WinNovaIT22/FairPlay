"use client";

import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Autocomplete,
  AutocompleteItem,
} from "@nextui-org/react";
import { useAsyncList } from "@react-stately/data";
import { HiOutlinePlus } from "react-icons/hi2";
import { IoSearchOutline } from "react-icons/io5";

const AddVehicle = ({ isOpen, onClose, onVehicleAdded }) => {
  const [selectedVehicle, setSelectedVehicle] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

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
        const result = await response.json();
        onVehicleAdded(result.user);
        onClose();
      } else {
        console.error("Failed to add vehicle:", response.statusText);
      }
    } catch (error) {
      console.error("Error adding vehicle:", error);
    }
  };

  let list = useAsyncList({
    async load({ filterText }) {
      try {
        const response = await fetch(`/api/search?paramName=${filterText}`);
        const responseData = await response.json();

        return {
          items: responseData.data || [],
        };
      } catch (error) {
        console.error("Error loading data:", error);
        return {
          items: [],
        };
      }
    },
  });

  useEffect(() => {
    if (searchQuery.trim() !== "") {
      list.setFilterText(searchQuery);
    } else {
      setSearchQuery("");
    }
  }, [searchQuery]);

  return (
    <>
      <Modal size={"lg"} placement={"center"} isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            Lisää uusi ajoneuvo
          </ModalHeader>
          <ModalBody>
            <Autocomplete
              variant="faded"
              inputValue={searchQuery}
              isLoading={list.isLoading}
              items={list.items}
              label="Ajoneuvo"
              radius="sm"
              name="vehicle"
              placeholder="Hae oma ajoneuvosi"
              labelPlacement="outside"
              onInputChange={(value) => {
                setSearchQuery(value), setSelectedVehicle(value);
              }}
              startContent={
                <IoSearchOutline
                  size={22}
                  className="mr-1 text-2xl text-slate-300 pointer-events-none flex-shrink-0"
                />
              }
            >
              {(item) => (
                <AutocompleteItem
                  key={item.id}
                  value={`${item.merkkiSelvakielinen} ${item.kaupallinenNimi}`}
                  textValue={`${item.merkkiSelvakielinen} ${item.kaupallinenNimi}`}
                  className="py-2"
                >
                  {item.merkkiSelvakielinen} {item.kaupallinenNimi}
                </AutocompleteItem>
              )}
            </Autocomplete>
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

export default AddVehicle;
