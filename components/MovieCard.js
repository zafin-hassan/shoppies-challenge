import { AddIcon, CheckIcon, DeleteIcon, InfoIcon } from "@chakra-ui/icons";
import {
  TableCaption,
  VStack,
  Text,
  Button,
  useDisclosure,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import Image from "next/image";
import axios from "axios";
import { useContext } from "react";
import ModalComponent from "./ModalComponent";
import { MovieContext } from "./../context/MovieContext";

const MovieCard = (props) => {
  const { movie, modalDataLoading, nominationsTab: nominationsTab } = props;
  const { cardState, dispatch } = useContext(MovieContext);
  const {
    nominatedMovies,
    currentMovie,
    isNomineeLimitReached,
    isModalDataLoading,
  } = cardState;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const fetchMovieData = (movie) => {
    axios
      .get(
        `https://www.omdbapi.com/?i=${movie.imdbID}&type=movie&apikey=${process.env.NEXT_PUBLIC_OMDB_API_KEY}`
      )
      .then((res) => {
        dispatch({ type: "info", payload: res.data });
        onOpen();
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
      const newNominatedMovies = [...cardState.nominatedMovies, movie];
      localStorage.setItem(
        "nominatedMovies",
        JSON.stringify(newNominatedMovies)
      );
    }
  };
  const handleRemove = (movie) => {
    dispatch({ type: "remove", payload: movie });
    const newList = cardState.nominatedMovies?.filter(
      (item) => item.imdbID !== movie.imdbID
    );
    localStorage.setItem("nominatedMovies", JSON.stringify(newList));
  };

  const showMoreInfo = (props) => {
    fetchMovieData(movie);
    onOpen();
  };

  const getButtonLabel = (movie) => {
    return isDuplicate(movie) ? (
      <CheckIcon w={3} h={3} />
    ) : (
      <AddIcon w={3} h={3} />
    );
  };
  const handleModalClose = () => {
    dispatch({ type: "closeInfo", payload: movie });
    onClose();
  };
  return (
    <Grid templateColumns="repeat(3, 1fr)" gap={6}>
      <GridItem>
        {" "}
        {movie.Poster !== "N/A" ? (
          <Image
            width="120px"
            height="180px"
            layout="fixed"
            loading="lazy"
            src={movie?.Poster}
            alt={movie?.Title}
            // priority
          />
        ) : (
          <Text width="120px" height="180px">
            {"Image Unavailable 😔"}
          </Text>
        )}
      </GridItem>
      <GridItem>
        <VStack align="self-start">
          <Text width={[100, 150, 200]}>{movie?.Title}</Text>
          <Text fontSize="sm">{movie?.Year}</Text>
        </VStack>
      </GridItem>
      <GridItem>
        {!isModalDataLoading && (
          <ModalComponent
            onClose={handleModalClose}
            isOpen={isOpen}
            currentMovie={currentMovie}
            modalDataLoading={isModalDataLoading}
            handleNominate={handleNominate}
          />
        )}
        <VStack>
          {!nominationsTab && (
            <div>
              {isNomineeLimitReached || isDuplicate(movie) ? (
                <Button isDisabled bg="green.500" _hover={{ bg: "green.500" }}>
                  {getButtonLabel(movie)}
                </Button>
              ) : (
                <Button
                  bg="green.500"
                  _hover={{ bg: "green.500" }}
                  onClick={() => handleNominate(movie)}
                >
                  {getButtonLabel(movie)}
                </Button>
              )}
            </div>
          )}
          {nominationsTab && (
            <Button
              bg="red.500"
              _hover={{ bg: "red.500" }}
              onClick={() => handleRemove(movie)}
            >
              <DeleteIcon w={3} h={3} />
            </Button>
          )}
          <Button onClick={() => showMoreInfo(movie, onOpen)}>
            <InfoIcon w={3} h={3} />
          </Button>
        </VStack>
      </GridItem>
    </Grid>
  );
};

export default MovieCard;
