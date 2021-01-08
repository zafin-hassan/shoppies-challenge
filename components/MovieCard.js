import { AddIcon, CheckIcon, CloseIcon } from "@chakra-ui/icons";
import {
  TableCaption,
  Image,
  VStack,
  Text,
  Button,
  useDisclosure,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import axios from "axios";
import { useContext } from "react";
// import ModalComponent from "./ModalComponent";
import { MovieContext } from "./../context/MovieContext";

const MovieCard = (props) => {
  const {
    movie,
    modalDataLoading,
    nominationsTab: nominationsTab,
    setModalDataLoading,
  } = props;
  const { cardState, dispatch } = useContext(MovieContext);
  const { nominatedMovies, currentMovie, isNomineeLimitReached } = cardState;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const fetchMovieData = (movie) => {
    axios
      .get(
        `https://www.omdbapi.com/?i=${movie.imdbID}&plot=full&type=movie&apikey=${process.env.NEXT_PUBLIC_OMDB_API_KEY}`
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
      const newNominatedMovies = [...cardState.nominatedMovies, movie];
      localStorage.setItem(
        "nominatedMovies",
        JSON.stringify(newNominatedMovies)
      );
    }
    console.log(movie);
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
    console.log(movie);
    onOpen();
  };

  const getButtonLabel = (movie) => {
    return isDuplicate(movie) ? (
      <CheckIcon w={3} h={3} />
    ) : (
      <AddIcon w={3} h={3} />
    );
  };
  return (
    <Grid templateColumns="repeat(3, 1fr)" gap={6}>
      <GridItem>
        {" "}
        <Image
          className=""
          maxW="120px"
          src={movie?.Poster}
          alt={movie?.Title}
        />
      </GridItem>
      <GridItem>
        <VStack align="self-start">
          <Text width={[100, 150, 200]}>{movie?.Title}</Text>
          <Text fontSize="sm">{movie?.Year}</Text>
          {/* {!nominationsTab && (
            <div>
              {isNomineeLimitReached || isDuplicate(movie) ? (
                <Button isDisabled onClick={() => handleNominate(movie)}>
                  {getButtonLabel(movie)}
                </Button>
              ) : (
                <Button onClick={() => handleNominate(movie)}>
                  {getButtonLabel(movie)}
                </Button>
              )}
            </div>
          )}
          {nominationsTab && (
            <Button onClick={() => handleRemove(movie)}>Remove</Button>
          )}
          <Button onClick={() => showMoreInfo(movie, onOpen)}>More Info</Button> */}
        </VStack>
      </GridItem>
      <GridItem>
        {/* {!modalDataLoading && (
            <ModalComponent
              onClose={onClose}
              isOpen={isOpen}
              currentMovie={currentMovie}
              modalDataLoading={modalDataLoading}
              handleNominate={handleNominate}
            />
          )} */}
        <VStack>
          {!nominationsTab && (
            <div>
              {isNomineeLimitReached || isDuplicate(movie) ? (
                <Button isDisabled onClick={() => handleNominate(movie)}>
                  {getButtonLabel(movie)}
                </Button>
              ) : (
                <Button onClick={() => handleNominate(movie)}>
                  {getButtonLabel(movie)}
                </Button>
              )}
            </div>
          )}
          {nominationsTab && (
            <Button onClick={() => handleRemove(movie)}>
              <CloseIcon w={3} h={3} />
            </Button>
          )}
          {/* <Button onClick={() => showMoreInfo(movie, onOpen)}>More Info</Button> */}
        </VStack>
      </GridItem>
    </Grid>
  );
};

export default MovieCard;
