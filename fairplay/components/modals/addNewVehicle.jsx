import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";

const AddVehicle = ({ isOpen, onClose }) => {

    return (
      <>
        <Modal size={"lg"} placement={"center"} isOpen={isOpen} onClose={onClose}>
          <ModalContent>
            <ModalHeader className="flex flex-col gap-1">Lisää uusi ajoneuvo</ModalHeader>
            <ModalBody>
                <p className="text-sm"> 
                    Lisää ajoneuvo
                </p>
            </ModalBody>
            <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                    Close
                </Button>
                <Button color="primary" onPress={onClose}>
                    Action
                </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    );
  }

export default AddVehicle;