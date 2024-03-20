import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";
import { Link } from "@nextui-org/react";

const InspectVehicle = ({ isOpen, onClose, vehicleName }) => {

    return (
      <>
        <Modal size={"lg"} placement={"center"} isOpen={isOpen} onClose={onClose}>
          <ModalContent>
            <ModalHeader className="flex flex-col gap-1">Katsasta: {vehicleName}</ModalHeader>
            <ModalBody>
              <p className="text-sm"> 
                Voit katsastaa ajoneuvosi sähköisenä tässä tai kerhotalolla katsastajan katsastamana. Lisätietoa: <Link className="text-sm" underline="always" isExternal href="https://www.konepyoraklubi.fi/tapahtumat/">https://www.konepyoraklubi.fi/tapahtumat/</Link>
              </p>
              <p className="font-semibold">Ohje katsastukseen</p>
              <p className="text-sm">
                Katsasta ajoneuvo lähettämällä valokuva matkamittaristasi niin, että kuvassa näkyy kokonaismatka. Jos kuvaasi tallentuu 
                kuvauspäivämäärä esim. puhelimella kuvattaessa niin se riittää todistamaan kuvausajankohdan. Jos ei tai et ole varma, ota kuvaan 
                mukaan kuvauspäivän Satakunnan Kansa tai muu sanomalehti. <b>Kuvassa pitää näkyä matkamittarin lukema ja kuvausajankohta.</b>
              </p>
              <p className="font-semibold">Lähetä kuva matkamittarista</p>
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

export default InspectVehicle;