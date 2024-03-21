"use client"

import React, { useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";
import { Link } from "@nextui-org/react";
import UploadImage from "@/components/ui/uploadImage"
import { BsSend } from "react-icons/bs";

const InspectVehicle = ({ isOpen, onClose, vehicleName, vehicleId }) => {
  const [image, setImage] = useState(null);

  const handleImageUpload = async () => {
    try {
      if (!image) {
        console.error("No image selected.");
        return;
      }

      const formData = new FormData();
        formData.append("id", vehicleId);
        formData.append("image", image.file);
          
      const response = await fetch("/api/user/inspectVehicle", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        console.log("Image uploaded successfully.");
        window.location.reload(true);
        onClose();
      } else {
        console.error("Failed to upload image:", response.statusText);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <>
      <Modal size={"lg"} placement={"center"} isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">Katsasta: {vehicleName}</ModalHeader>
          <ModalBody>
            <p className="text-sm"> 
              Voit katsastaa ajoneuvosi sähköisenä tässä tai kerhotalolla katsastajan katsastamana. 
              Lisätietoa: <Link className="text-sm" underline="always" isExternal href="https://www.konepyoraklubi.fi/tapahtumat/">https://www.konepyoraklubi.fi/tapahtumat/</Link>
            </p>
            <p className="font-semibold">Ohje katsastukseen</p>
            <p className="text-sm">
              Katsasta ajoneuvo lähettämällä valokuva matkamittaristasi niin, että kuvassa näkyy kokonaismatka. Jos kuvaasi tallentuu 
              kuvauspäivämäärä esim. puhelimella kuvattaessa niin se riittää todistamaan kuvausajankohdan. Jos ei tai et ole varma, ota kuvaan 
              mukaan kuvauspäivän Satakunnan Kansa tai muu sanomalehti. <b>Kuvassa pitää näkyä matkamittarin lukema ja kuvausajankohta.</b>
            </p>
            <p className="font-semibold text-center mt-3">Lähetä kuva matkamittaristasi</p>
              <UploadImage setImage={setImage}/>
          </ModalBody>
          <ModalFooter>
            <Button variant="light" onPress={onClose}>
              Peruuta
            </Button>
            <Button color="success" variant="flat" isDisabled={!image} onPress={handleImageUpload} endContent={<BsSend size={18}/>}>
              Lähetä
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default InspectVehicle;