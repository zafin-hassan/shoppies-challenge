import Head from "next/head";
import MovieList from "../components/MovieList";
import Search from "../components/Search";
import { useState, useReducer, useEffect } from "react";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Heading,
  VStack,
} from "@chakra-ui/react";
import Nominations from "../components/Nominations";
import { MovieContext } from "./../context/MovieContext";
import { cardReducer, initialState } from "./../reducers/index";
import Header from "../components/Header";

export default function Home() {
  const [cardState, dispatch] = useReducer(cardReducer, initialState);
  const [searchResult, setSearchResult] = useState("");
  const [modalDataLoading, setModalDataLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const localNominees = localStorage.getItem("nominatedMovies");
    const localNomineesParsed = JSON.parse(localNominees);
    if (localNomineesParsed) {
      localNomineesParsed.map((item) => {
        dispatch({ type: "nominate", payload: item });
        console.log(item);
      });
    }
  }, []);

  return (
    <div className="page-container" width="100%">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* <div> */}{" "}
      <VStack width="100%">
        <Header />
        <Search
          className="search-bar"
          setSearchResult={setSearchResult}
          setIsLoading={setIsLoading}
        />
        <Tabs variant="unstyled">
          <TabList className="tab-container">
            <Tab _selected={{ color: "white", bg: "#004C3F" }}>
              Search Results
            </Tab>
            <Tab _selected={{ color: "white", bg: "#004C3F" }}>Nominations</Tab>
          </TabList>
          {cardState.isNomineeLimitReached && (
            <div>Thanks for selecting 5 nominations!</div>
          )}
          <MovieContext.Provider value={{ dispatch, cardState }}>
            <TabPanels>
              <TabPanel>
                <MovieList searchResult={searchResult} />
              </TabPanel>
              <TabPanel>
                <Nominations />
              </TabPanel>
            </TabPanels>
          </MovieContext.Provider>
        </Tabs>
      </VStack>
      {/* </div> */}
      {/* <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer> */}
    </div>
  );
}
