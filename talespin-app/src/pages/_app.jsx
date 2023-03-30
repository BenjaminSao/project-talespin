import { Auth0Provider } from "@auth0/auth0-react";
import "../styles/globals.scss";

export default function App({ Component, pageProps }) {
  return (
    <Auth0Provider
      domain="dev-uvuzonh2.us.auth0.com"
      clientId="kNiPiVLBMPyYDYUNow0txbqDm0Wo9Hp7"
      authorizationParams={{
        redirect_uri: "http://localhost:3000/",
        audience: "https://talespin.com/api",
      }}
    >
      <Component {...pageProps} />
    </Auth0Provider>
  );
}
