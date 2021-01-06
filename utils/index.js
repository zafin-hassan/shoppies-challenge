import axios from "axios";

const fetchMovieData = (artist) => {
  axios
    .get(
      `http://www.omdbapi.com/?i=${artist.imdbID}&plot=full&type=movie&apikey=${process.env.NEXT_PUBLIC_OMDB_API_KEY}`
    )
    .then((res) => {
      setCurrentMovie(res.data);
      setModalDataLoading(false);
      onOpen();
      console.log(currentMovie);
    });
};

export { fetchMovieData };
