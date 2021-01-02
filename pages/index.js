import Head from "next/head";
import styles from "../styles/Home.module.css";
import MovieList from "../components/MovieList";
import Search from "../components/Search";
import * as React from "react";

export default function Home() {
  const [searchResult, setSearchResult] = React.useState("");
  // const [isLoading, setIsLoading] = React.useState(true);

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Search setSearchResult={setSearchResult} />
        <MovieList searchResult={searchResult} />
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  );
}
