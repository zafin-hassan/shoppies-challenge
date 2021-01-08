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
  VStack,
  Heading,
  Text,
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
    <Modal isCentered isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      {modalDataLoading ? (
        <Spinner />
      ) : (
        <ModalContent>
          <ModalHeader>
            {currentMovie.Title}
            {", "}
            {currentMovie.Year}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4} align="left">
              <Text>
                <Text fontWeight="bold">{"Actors:"}</Text>
                {currentMovie.Actors}
              </Text>
              <Text>
                <Text fontWeight="bold">{"Plot:"}</Text>
                {currentMovie.Plot}
              </Text>
              <Text align="left">
                <Text fontWeight="bold">{"Awards: "}</Text>
                {currentMovie.Awards}
              </Text>
              <Text align="left">
                <Text fontWeight="bold">{"Ratings: "}</Text>
                {currentMovie.Ratings[1] ? (
                  <Text>
                    {`${currentMovie.Ratings[1].Source}: `}
                    {currentMovie.Ratings[1].Value}
                  </Text>
                ) : (
                  <></>
                )}
                <Text>
                  {"imdb: "}
                  {currentMovie.imdbRating}
                </Text>
              </Text>
              <Text>
                <Text fontWeight="bold">{"Box Office: "}</Text>
                {currentMovie.BoxOffice}
              </Text>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button
              bg="green.500"
              _hover={{ bg: "green.500" }}
              mr={3}
              onClick={onClose}
            >
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      )}
    </Modal>
  );
};

export default ModalComponent;
