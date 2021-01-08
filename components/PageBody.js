import MovieList from "./MovieList";
import Search from "./Search";
import { useState, useReducer, useEffect } from "react";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Heading,
  Text,
  VStack,
  Alert,
  AlertIcon,
  AlertTitle,
  Grid,
  AlertDescription,
  GridItem,
} from "@chakra-ui/react";

import Nominations from "./Nominations";
import { MovieContext } from "./../context/MovieContext";
import { cardReducer, initialState } from "./../reducers/index";
import Header from "./Header";

const PageBody = () => {
  const [cardState, dispatch] = useReducer(cardReducer, initialState);
  const [searchResult, setSearchResult] = useState("");
  const [modalDataLoading, setModalDataLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const { nomineeCount } = cardState;

  useEffect(() => {
    const localNominees = localStorage.getItem("nominatedMovies");
    const localNomineesParsed = JSON.parse(localNominees);
    if (localNomineesParsed) {
      localNomineesParsed.map((item) => {
        dispatch({ type: "nominate", payload: item });
      });
    }
  }, []);
  return (
    <VStack width="100%">
      <Header />
      <Search
        className="search-bar"
        setSearchResult={setSearchResult}
        setIsLoading={setIsLoading}
      />
      <Tabs isFitted width={[300, 600, 600]} variant="unstyled">
        <TabList className="tab-container">
          <Tab _selected={{ color: "white", bg: "green.800" }}>
            Search Results
          </Tab>
          <Tab _selected={{ color: "white", bg: "green.800" }}>Nominations</Tab>
        </TabList>
        {cardState.isNomineeLimitReached && (
          <Alert
            status="success"
            variant="subtle"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
            height="200px"
            marginBottom="1.5rem"
          >
            <AlertIcon boxSize="40px" mr={0} />
            <AlertTitle mt={4} mb={1} fontSize="lg">
              Movies selected!
            </AlertTitle>
            <AlertDescription maxWidth="sm">
              Thank you for selecting 5 nominees!
            </AlertDescription>
          </Alert>
        )}
        <MovieContext.Provider value={{ dispatch, cardState }}>
          <TabPanels>
            <TabPanel>
              {!searchResult.Search && (
                <Text textAlign="center">
                  Please Search for a movie to see Search Results
                </Text>
              )}
              <MovieList searchResult={searchResult} />
            </TabPanel>
            <TabPanel>
              {!nomineeCount && (
                <Text textAlign="center">
                  You have not nominated any movies yet
                </Text>
              )}
              <Nominations />
            </TabPanel>
          </TabPanels>
        </MovieContext.Provider>
      </Tabs>
    </VStack>
  );
};

export default PageBody;
