import Container from "../../components/container";
import Navbar from "../../components/navbar";

import styles from "./loadingScreen.module.scss";

const { loader } = styles;

import { useRouter } from "next/router";
import { useEffect } from "react";

import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

export default function LoadingScreen() {
  const router = useRouter();
  const { title, prompt } = router.query;
  const { isAuthenticated, user } = useAuth0();

  useEffect(() => {
    if (user)
      fetchGeneratedBook();
  }, [isAuthenticated, user]);

  async function fetchGeneratedBook() {
    const data = JSON.stringify({
      title,
      prompt,
      colorScheme: "blue", // TODO: CHANGE
      storyLength: 5,
      artStyle: "artstation",
      ownerId: user.sub
    });

    const config = {
      method: "post",
      url: "http://localhost:3001/api/stories",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };
    try {
      const res = await axios(config);
      
      router.push({
        pathname: "/book",
        query: {
          storyId: res.data.storyId
        }
      })
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <>
      <Container>
        <Navbar></Navbar>
        <div className="flex items-center">
          <div className={`${loader}`}></div>
        </div>
      </Container>
    </>
  );
}
