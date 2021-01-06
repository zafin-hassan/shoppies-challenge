import Head from "next/head";
import styles from "../styles/Home.module.css";
import MovieList from "../components/MovieList";
import Search from "../components/Search";
import { useState, useReducer } from "react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import Nominations from "../components/Nominations";
import { MovieContext } from "./../context/MovieContext";
import { cardReducer, initialState } from "./../reducers/index";

export default function Home() {
  const [cardState, dispatch] = useReducer(cardReducer, initialState);
  const [searchResult, setSearchResult] = useState("");
  const [modalDataLoading, setModalDataLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Search
          className="search-bar"
          setSearchResult={setSearchResult}
          setIsLoading={setIsLoading}
        />
        <Tabs>
          <TabList>
            <Tab>Search Results</Tab>
            <Tab>Nominations</Tab>
          </TabList>
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
      </main>

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
