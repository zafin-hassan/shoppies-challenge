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
  const { searchResult, isLoading } = props;
  return (
    <div>
      {searchResult && !isLoading && (
        <Table variant="simple" className="dataTable">
          {searchResult?.Search?.map((movie, i) => (
            <MovieCard key={i} movie={movie} />
          ))}
        </Table>
      )}
    </div>
  );
};

export default MovieList;
