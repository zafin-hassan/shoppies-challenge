import { Table } from "@chakra-ui/react";
import MovieCard from "./MovieCard";
import { useContext } from "react";
import { MovieContext } from "./../context/MovieContext";

const Nominations = (props) => {
  const { cardState } = useContext(MovieContext);
  const { nominatedMovies } = cardState;
  return (
    <div>
      <Table variant="simple" className="dataTable">
        {nominatedMovies.map((movie, i) => (
          <MovieCard key={i} movie={movie} />
        ))}
      </Table>
    </div>
  );
};

export default Nominations;
