import { VStack } from "@chakra-ui/react";
import MovieCard from "./MovieCard";

const MovieList = (props) => {
  const { searchResult, isLoading } = props;
  return (
    <div>
      {searchResult && !isLoading && (
        <VStack spacing={5}>
          {searchResult?.Search?.map((movie, i) => (
            <MovieCard key={i} movie={movie} nominationsTab={false} />
          ))}
        </VStack>
      )}
    </div>
  );
};

export default MovieList;
