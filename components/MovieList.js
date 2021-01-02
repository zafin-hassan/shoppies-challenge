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
} from "@chakra-ui/react";
import MovieCard from "./MovieCard";

const MovieList = (props) => {
  const { searchResult } = props;
  return (
    <div>
      {searchResult && (
        <Table variant="simple" className="dataTable">
          {searchResult?.Search?.map((artist, i) => (
            <MovieCard key={i} artist={artist} />
          ))}
        </Table>
      )}
    </div>
  );
};

export default MovieList;
