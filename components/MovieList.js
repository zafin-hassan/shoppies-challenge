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
          {searchResult?.Search?.map((artist, i) => (
            <MovieCard key={i} artist={artist} />
          ))}
        </Table>
      )}
    </div>
  );
};

export default MovieList;
