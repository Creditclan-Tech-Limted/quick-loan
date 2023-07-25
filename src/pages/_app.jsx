import React from "react";
import "@/assets/globals.css";

const App = ({ Component, pageProps }) => {
  return (
    <>
      <title>Clan</title>
      <Component { ...pageProps } />
    </>
  );
};

export default App
