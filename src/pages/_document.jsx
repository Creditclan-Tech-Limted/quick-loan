import Document, { Head, Html, Main, NextScript } from "next/document";
import React from "react";
import Script from "next/script";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        </Head>
        <body>
          <Main />
          <NextScript />
          <a href="#" id="creditclan-widget" className="hidden">
            Apply on CreditClan
          </a>
          <Script
            src="https://eligibility.clan.africa/assets/scripts/client.js"
            strategy="beforeInteractive"
          />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
