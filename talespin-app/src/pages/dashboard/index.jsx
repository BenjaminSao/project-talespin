import Container from "../../components/container";
import Navbar from "../../components/navbar";
import DisplayBook from "../../components/displayBook";

import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard() {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [bookData, setBookData] = useState([]);

  useEffect(() => {
    if (user) fetchBooks();
  }, [getAccessTokenSilently, user]);

  async function fetchBooks() {
    const token = await getAccessTokenSilently();
    try {
      const res = await axios.get(
        `http://localhost:3001/api/stories/users/${user.sub}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setBookData(res.data);
    } catch (e) {
      console.error(e);
    }
  }

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
              {bookData.length !== 0 ? (
                <>
                  {bookData.map((book) => (
                    <DisplayBook
                      key={book.info.id}
                      storyId={book.info.id}
                      title={book.info.title}
                    ></DisplayBook>
                  ))}
                </>
              ) : (
                <>
                  <h1>
                    <strong>No Books</strong>
                  </h1>
                </>
              )}
            </div>
          </>
        )}
      </Container>
    </>
  );
}
