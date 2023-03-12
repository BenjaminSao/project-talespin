import Container from "../../components/container";
import Navbar from "../../components/navbar";

import styles from "./loadingScreen.module.scss";

const { loader } = styles;

import { useRouter } from "next/router";
import { useEffect } from "react";

export default function LoadingScreen() {
  const router = useRouter();
  const { title, prompt } = router.query;

  useEffect(() => {
    fetchGeneratedBook();
  }, []);

  async function fetchGeneratedBook() {
    setTimeout(async () => {
      await router.push("/book");
    }, 1000);
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
