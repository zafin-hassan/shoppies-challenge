import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Spinner,
  Image,
} from "@chakra-ui/react";

const ModalComponent = (props) => {
  const {
    isOpen,
    onClose,
    currentMovie,
    modalDataLoading,
    handleNominate,
  } = props;
  return (
    <Modal isOpen={isOpen} onClose={onClose} className="modal-styles">
      {/* <ModalOverlay /> */}
      {modalDataLoading ? (
        <Spinner />
      ) : (
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <h2>
              {currentMovie.Title}
              {currentMovie.Actors}
              {}
            </h2>
            <div>{currentMovie.Plot}</div>
            <Image src={currentMovie.Poster} />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            {/* <Button variant="ghost" onClick={handleNominate(currentMovie)}>
              Nominate
            </Button> */}
          </ModalFooter>
        </ModalContent>
      )}
    </Modal>
  );
};

export default ModalComponent;
