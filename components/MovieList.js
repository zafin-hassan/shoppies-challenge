import SearchBar from "./Search";
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
  useDisclosure,
} from "@chakra-ui/react";
import MovieCard from "./MovieCard";
import { useState } from "react";

const MovieList = (props) => {
  const {
    searchResult,
    nominatedMovies,
    setNominatedMovies,
    isLoading,
    modalDataLoading,
    setModalDataLoading,
    currentMovie,
    setCurrentMovie,
  } = props;

  // const [isLoading, setIsLoading] = useState(true);

  // const [selectedNominee, setSelectedNominee] = useState();

  return (
    <div>
      {searchResult && !isLoading && (
        <Table variant="simple" className="dataTable">
          {searchResult?.Search?.map((artist, i) => (
            <MovieCard
              key={i}
              artist={artist}
              nominatedMovies={nominatedMovies}
              setNominatedMovies={setNominatedMovies}
              currentMovie={currentMovie}
              setCurrentMovie={setCurrentMovie}
              // isLoading={isLoading}
              // setIsLoading={setIsLoading}
              // selectedNominee={selectedNominee}
              // setSelectedNominee={setSelectedNominee}
              modalDataLoading={modalDataLoading}
              setModalDataLoading={setModalDataLoading}
            />
          ))}
        </Table>
      )}
    </div>
  );
};

export default MovieList;
