import Container from "../../components/container";
import Navbar from "../../components/navbar";

import styles from "./loadingScreen.module.scss";

const { loader } = styles;

import { useRouter } from "next/router";
import { useEffect } from "react";

import axios from "axios";

export default function LoadingScreen() {
  const router = useRouter();
  const { title, prompt } = router.query;

  useEffect(() => {
    fetchGeneratedBook();
  }, []);

  async function fetchGeneratedBook() {
    let data = JSON.stringify({
      prompt,
    });

    let config = {
      method: "post",
      url: "http://localhost:3001/api/story/generateStory",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(response.data);
        router.push({
          pathname: "/book",
          query: {
            storyInformationJSON: JSON.stringify(response.data),
          },
        });
      })
      .catch(function (error) {
        console.log(error);
      });
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
