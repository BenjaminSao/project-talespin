import { auth } from "express-oauth2-jwt-bearer";

export const checkJwt = auth({
  audience: "https://talespin.com/api",
  issuerBaseURL: `https://dev-uvuzonh2.us.auth0.com/`,
  tokenSigningAlg: "RS256",
});
