import Head from "next/head";
import styles from "../styles/Home.module.css";
import MovieList from "../components/MovieList";
import Search from "../components/Search";
import { useState } from "react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import Nominations from "../components/Nominations";

export default function Home() {
  const [searchResult, setSearchResult] = useState("");
  const [nominatedMovies, setNominatedMovies] = useState([]);
  const [modalDataLoading, setModalDataLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [currentMovie, setCurrentMovie] = useState();

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
          <TabPanels>
            <TabPanel>
              <MovieList
                searchResult={searchResult}
                nominatedMovies={nominatedMovies}
                setNominatedMovies={setNominatedMovies}
                modalDataLoading={modalDataLoading}
                setModalDataLoading={setModalDataLoading}
                currentMovie={currentMovie}
                setCurrentMovie={setCurrentMovie}
              />
            </TabPanel>
            <TabPanel>
              <Nominations
                nominatedMovies={nominatedMovies}
                setNominatedMovies={setNominatedMovies}
                modalDataLoading={modalDataLoading}
                setModalDataLoading={setModalDataLoading}
                currentMovie={currentMovie}
                setCurrentMovie={setCurrentMovie}
              />
            </TabPanel>
          </TabPanels>
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
