import {
  Spinner,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  Image,
  VStack,
  Text,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import axios from "axios";
import { useContext } from "react";
import ModalComponent from "./ModalComponent";
import { MovieContext } from "./../context/MovieContext";

const MovieCard = (props) => {
  const { artist, modalDataLoading, setModalDataLoading } = props;
  const { cardState, dispatch } = useContext(MovieContext);
  const {
    nomineeCount,
    nominatedMovies,
    currentMovie,
    isNomineeLimitReached,
  } = cardState;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const fetchMovieData = (artist) => {
    axios
      .get(
        `http://www.omdbapi.com/?i=${artist.imdbID}&plot=full&type=movie&apikey=${process.env.NEXT_PUBLIC_OMDB_API_KEY}`
      )
      .then((res) => {
        setCurrentMovie(res.data);
        setModalDataLoading(false);
        onOpen();
        console.log(currentMovie);
      });
  };

  const isEqual = (first, second) => {
    return first.imdbID === second.imdbID;
  };
  const isDuplicate = (artist) =>
    nominatedMovies.some((nom) => isEqual(nom, artist));

  const handleNominate = (artist) => {
    if (!isDuplicate(artist)) {
      dispatch({ type: "nominate", payload: artist });
    }
    console.log(artist);
  };
  const handleRemove = (artist) => {
    dispatch({ type: "remove", payload: artist });
  };

  const showMoreInfo = (props) => {
    fetchMovieData(artist);
    console.log(artist);
    onOpen();
  };

  const getButtonLabel = (artist) => {
    return isDuplicate(artist) ? "Nominated" : "Nominate";
  };
  return (
    <Tbody>
      <Tr>
        <Td>
          {" "}
          <Image
            className=""
            maxW="120px"
            src={artist?.Poster}
            alt={artist?.Title}
          />
        </Td>
        <Td>
          <VStack align="self-start">
            <Text>{artist?.Title}</Text>
            <Text fontSize="sm">{artist?.Year}</Text>
          </VStack>
        </Td>
        <Td>
          {!modalDataLoading && (
            <ModalComponent
              onClose={onClose}
              isOpen={isOpen}
              currentMovie={currentMovie}
              modalDataLoading={modalDataLoading}
              handleNominate={handleNominate}
            />
          )}
          {isNomineeLimitReached || isDuplicate(artist) ? (
            <Button isDisabled onClick={() => handleNominate(artist)}>
              {getButtonLabel(artist)}
            </Button>
          ) : (
            <Button onClick={() => handleNominate(artist)}>
              {getButtonLabel(artist)}
            </Button>
          )}
          <Button onClick={() => handleRemove(artist)}>Remove</Button>
          <Button onClick={() => showMoreInfo(artist, onOpen)}>
            More Info
          </Button>
        </Td>
      </Tr>
    </Tbody>
  );
};

export default MovieCard;
