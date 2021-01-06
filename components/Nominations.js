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
} from "@chakra-ui/react";
import MovieCard from "./MovieCard";
const Nominations = (props) => {
  const {
    nominatedMovies,
    setNominatedMovies,
    modalDataLoading,
    setModalDataLoading,
    currentMovie,
    setCurrentMovie,
  } = props;

  console.log(nominatedMovies);
  return (
    <div>
      <Table variant="simple" className="dataTable">
        {nominatedMovies.map((artist, i) => (
          <MovieCard
            key={i}
            artist={artist}
            nominatedMovies={nominatedMovies}
            setNominatedMovies={setNominatedMovies}
            currentMovie={currentMovie}
            setCurrentMovie={setCurrentMovie}
            // isLoading={isLoading}
            // setIsLoading={setIsLoading}
            //   selectedNominee={selectedNominee}
            //   setSelectedNominee={setSelectedNominee}
            modalDataLoading={modalDataLoading}
            setModalDataLoading={setModalDataLoading}
          />
        ))}
      </Table>
    </div>
  );
};

export default Nominations;
