import { VStack } from "@chakra-ui/react";
import MovieCard from "./MovieCard";
import { useContext } from "react";
import { MovieContext } from "./../context/MovieContext";

const Nominations = (props) => {
  const { cardState } = useContext(MovieContext);
  const { nominatedMovies } = cardState;
  return (
    <div>
      <VStack spacing={5}>
        {nominatedMovies.map((movie, i) => (
          <MovieCard key={i} movie={movie} nominationsTab={true} />
        ))}
      </VStack>
    </div>
  );
};

export default Nominations;
