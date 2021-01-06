import Head from "next/head";
import styles from "../styles/Home.module.css";
import MovieList from "../components/MovieList";
import Search from "../components/Search";
import { useState, useReducer } from "react";
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

export default function Home() {
  const [cardState, dispatch] = useReducer(cardReducer, initialState);
  const [searchResult, setSearchResult] = useState("");
  const [modalDataLoading, setModalDataLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <VStack>
        <Heading>Shoppies</Heading>
        <Search
          className="search-bar"
          setSearchResult={setSearchResult}
          setIsLoading={setIsLoading}
        />
        <Tabs variant="soft-rounded" colorScheme="green">
          <TabList>
            <Tab>Search Results</Tab>
            <Tab>Nominations</Tab>
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
