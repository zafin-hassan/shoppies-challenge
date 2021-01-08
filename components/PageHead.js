import Head from "next/head";
const metaData = {
  pageTitle: "The Shoppies",
  currentURL: "https://shoppies-challenge.vercel.app/",
  metaImage: "/ShoppiesChallenge.png",
  twitterMetaImage:
    "https://shoppies-challenge.vercel.app/ShoppiesChallenge.png",
  description: "Movie awards for entrepreneurs",
};
const PageHead = () => {
  return (
    <Head>
      {/* <title>Shoppies</title> */}
      <link rel="icon" href="/shopify.png" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />
      <title>{metaData.pageTitle}</title>
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:image" content={metaData.twitterMetaImage} />
      {/* Open Graph */}
      <meta property="og:url" content={metaData.currentURL} key="ogurl" />
      <meta property="og:image" content={metaData.metaImage} key="ogimage" />
      <meta
        property="og:site_name"
        content={metaData.pageTitle}
        key="ogsitename"
      />
      <meta property="og:title" content={metaData.pageTitle} key="ogtitle" />
      <meta
        property="og:description"
        content={metaData.description}
        key="ogdesc"
      />
    </Head>
  );
};

export default PageHead;
