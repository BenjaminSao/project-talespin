import Container from "../../components/container";
import Navbar from "../../components/navbar";
import DisplayBook from "../../components/displayBook";

import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import axios from "axios";

export default function Dashboard() {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    fetchBooks();
  }, [getAccessTokenSilently]);

  async function fetchBooks() {
    const token = await getAccessTokenSilently();

    const res = await axios.get("http://localhost:3001/stories", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log(res.data);
  }

  const mockBooks = [
    {
      id: "1",
      title: "bruh1",
    },
    {
      id: "2",
      title: "bruh2",
    },
  ];

  return (
    <>
      <Container>
        <Navbar></Navbar>
        {isAuthenticated && (
          <>
            <section className="section mt-16">
              <p className="is-small">
                Welcome back, <strong>{user.name}</strong>
              </p>
              <h1>Your Stories</h1>
            </section>
            <div className="flex flex-wrap mt-6 gap-10">
              {mockBooks.map((book) => (
                <DisplayBook
                  key={book.id}
                  id={book.id}
                  title={book.title}
                ></DisplayBook>
              ))}
            </div>
          </>
        )}
      </Container>
    </>
  );
}
