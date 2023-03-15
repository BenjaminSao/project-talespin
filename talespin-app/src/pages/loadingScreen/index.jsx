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
    const data = JSON.stringify({
      prompt,
    });

    const config = {
      method: "post",
      url: "http://localhost:3001/api/story/generate-story",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        localStorage.setItem("generatedBook", JSON.stringify(response.data));
        router.push({
          pathname: "/book",
          query: {
            title,
          },
        });
      })
      .catch(() => {
        alert("An error has occurred generating story");
        router.push("/");
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
