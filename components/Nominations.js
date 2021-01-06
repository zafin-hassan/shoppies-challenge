import { Table, Tbody } from "@chakra-ui/react";
import MovieCard from "./MovieCard";
import { useContext } from "react";
import { MovieContext } from "./../context/MovieContext";

const Nominations = (props) => {
  const { cardState } = useContext(MovieContext);
  const { nominatedMovies } = cardState;
  return (
    <div>
      <Table variant="simple" className="dataTable md:max-w-max">
        <Tbody>
          {nominatedMovies.map((movie, i) => (
            <MovieCard key={i} movie={movie} nominationsTab={true} />
          ))}
        </Tbody>
      </Table>
    </div>
  );
};

export default Nominations;
