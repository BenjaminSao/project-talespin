import { Auth0Provider } from "@auth0/auth0-react";
import Head from 'next/head';
import "../styles/globals.scss";

export default function App({ Component, pageProps }) {
  return (
    <>
    <Head>
      <title>TaleSpin</title>
    </Head>
    <Auth0Provider
      domain="dev-uvuzonh2.us.auth0.com"
      clientId="kNiPiVLBMPyYDYUNow0txbqDm0Wo9Hp7"
      authorizationParams={{
        redirect_uri: "https://www.talespin.me/",
        audience: "https://talespin.com/api",
      }}
    >
      <Component {...pageProps} />
    </Auth0Provider>
    </>
  );
}
