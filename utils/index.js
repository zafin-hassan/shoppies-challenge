import axios from "axios";

const fetchMovieData = (movie) => {
  axios
    .get(
      `https://www.omdbapi.com/?i=${movie.imdbID}&plot=full&type=movie&apikey=${process.env.NEXT_PUBLIC_OMDB_API_KEY}`
    )
    .then((res) => {
      setCurrentMovie(res.data);
      setModalDataLoading(false);
      onOpen();
    });
};

export { fetchMovieData };
