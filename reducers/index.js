export function cardReducer(cardState, action) {
  switch (action.type) {
    case "nominate":
      return {
        ...cardState,
        currentMovie: action.payload,
        nominatedMovies: [...cardState.nominatedMovies, action.payload],
        nomineeCount: cardState.nomineeCount + 1,
        isNomineeLimitReached: cardState.nomineeCount + 1 >= 5,
      };
    case "remove":
      return {
        ...cardState,
        currentMovie: action.payload,
        nominatedMovies: cardState.nominatedMovies.filter(
          (item) => item.imdbID !== action.payload.imdbID
        ),
        nomineeCount: cardState.nomineeCount - 1,
        isNomineeLimitReached: cardState.nomineeCount - 1 >= 5,
      };
    case "reset":
      return init(action.payload);
    default:
      throw new Error();
  }
}

export const initialState = {
  nomineeCount: 0,
  nominatedMovies: [],
  currentMovie: [],
  isNomineeLimitReached: false,
};
