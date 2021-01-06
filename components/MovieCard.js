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
  const { movie, modalDataLoading, setModalDataLoading } = props;
  const { cardState, dispatch } = useContext(MovieContext);
  const {
    nomineeCount,
    nominatedMovies,
    currentMovie,
    isNomineeLimitReached,
  } = cardState;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const fetchMovieData = (movie) => {
    axios
      .get(
        `http://www.omdbapi.com/?i=${movie.imdbID}&plot=full&type=movie&apikey=${process.env.NEXT_PUBLIC_OMDB_API_KEY}`
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
  const isDuplicate = (movie) =>
    nominatedMovies.some((nom) => isEqual(nom, movie));

  const handleNominate = (movie) => {
    if (!isDuplicate(movie)) {
      dispatch({ type: "nominate", payload: movie });
    }
    console.log(movie);
  };
  const handleRemove = (movie) => {
    dispatch({ type: "remove", payload: movie });
  };

  const showMoreInfo = (props) => {
    fetchMovieData(movie);
    console.log(movie);
    onOpen();
  };

  const getButtonLabel = (movie) => {
    return isDuplicate(movie) ? "Nominated" : "Nominate";
  };
  return (
    <Tbody>
      <Tr>
        <Td>
          {" "}
          <Image
            className=""
            maxW="120px"
            src={movie?.Poster}
            alt={movie?.Title}
          />
        </Td>
        <Td>
          <VStack align="self-start">
            <Text>{movie?.Title}</Text>
            <Text fontSize="sm">{movie?.Year}</Text>
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
          {isNomineeLimitReached || isDuplicate(movie) ? (
            <Button isDisabled onClick={() => handleNominate(movie)}>
              {getButtonLabel(movie)}
            </Button>
          ) : (
            <Button onClick={() => handleNominate(movie)}>
              {getButtonLabel(movie)}
            </Button>
          )}
          <Button onClick={() => handleRemove(movie)}>Remove</Button>
          <Button onClick={() => showMoreInfo(movie, onOpen)}>More Info</Button>
        </Td>
      </Tr>
    </Tbody>
  );
};

export default MovieCard;
