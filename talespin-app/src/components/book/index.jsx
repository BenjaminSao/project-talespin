import styles from "./book.module.scss";
import FeatherIcon from "feather-icons-react/build/FeatherIcon";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import jsPDF from "jspdf";

const {
  book,
  bookImage,
  bookContent,
  bookContainer,
  nextPageButton,
  convertToPDFButton,
  sendBookButton,
  emailDialog,
  emailDialogInput,
} = styles;

export default function Book() {
  const { getAccessTokenSilently } = useAuth0();

  const [bookContentData, setBookContent] = useState(null);
  const [pageIndex, setPageIndex] = useState(0);
  const [isEmailDialogOpen, setIsEmailDialogOpen] = useState(false);
  const [email, setEmail] = useState("");

  const router = useRouter();
  const { storyId } = router.query;

  useEffect(() => {
    if (storyId) fetchBook();
  }, [getAccessTokenSilently, storyId]);

  async function fetchBook() {
    try {
      const res = await axios({
        url: `http://localhost:3001/api/stories/${storyId}`,
        method: "GET",
      });
      setBookContent(res.data);
    } catch (e) {
      console.error(e);
    }
  }

  function handleNextPage() {
    if (pageIndex < bookContentData.pages.length - 1) {
      setPageIndex(pageIndex + 1);
    }
  }

  function handlePreviousPage() {
    if (pageIndex > 0) {
      setPageIndex(pageIndex - 1);
    }
  }

  function generatePDF(text) {
    const doc = new jsPDF();

    const maxWidth = 170; // maximum width of the text in the document
    text = doc.splitTextToSize(text, maxWidth);

    doc.text(text, 10, 10);
    doc.save("Book.pdf");
  }

  async function handleConvert() {
    let bookText = "";

    for (let i = 0; i < bookContentData.pages.length; i++) {
      bookText += `${bookContentData.pages[i].text}\n\n\n`;
    }

    try {
      generatePDF(bookText);
    } catch (e) {
      console.error(e);
    }
  }

  async function handleSendBook() {
    setIsEmailDialogOpen(!isEmailDialogOpen);
  }

  async function handleSendEmail() {
    const token = await getAccessTokenSilently();

    try {
      const res = await axios({
        url: "http://localhost:3001/api/emails/",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        method: "POST",
        data: {
          email,
          storyId,
        },
      });

      if (res.status === 200) alert("Email Sent!");
    } catch (e) {
      console.error(e);
      alert("Failed to send Email");
    } finally {
      setEmail("");
      setIsEmailDialogOpen(false);
    }
  }

  return (
    <>
      <div className="flex justify-center mt-6">
        <div>
          {bookContentData && (
            <>
              <h1 className="text-center font-bold"></h1>
              <div className="flex items-center">
                <button
                  className={`${nextPageButton} mr-4`}
                  onClick={() => handlePreviousPage()}
                >
                  <FeatherIcon
                    icon={"arrow-left-circle"}
                    size={64}
                    fill={"#4d4d4d"}
                    color={"#FCFCED"}
                    strokeWidth={"1.5px"}
                  ></FeatherIcon>
                </button>
                <div className={`${bookContainer}`}>
                  <div className={`${book} mt-4 flex flex-col justify-between`}>
                    <div
                      className={`${bookImage}`}
                      style={{
                        backgroundImage: `url(http://localhost:3001/api/images/${bookContentData.pages[pageIndex].image})`,
                      }}
                    ></div>
                    <div className={`${bookContent} flex items-center`}>
                      <p className="text-center">
                        {bookContentData.pages[pageIndex].text}
                      </p>
                    </div>
                    <button
                      className={`${convertToPDFButton}`}
                      onClick={() => handleConvert()}
                    >
                      <FeatherIcon
                        icon={"file-text"}
                        size={48}
                        fill={"#4d4d4d"}
                        color={"#FCFCED"}
                        strokeWidth={"1.5px"}
                      ></FeatherIcon>
                    </button>
                    <button
                      className={`${sendBookButton}`}
                      onClick={() => handleSendBook()}
                    >
                      <FeatherIcon
                        icon={"send"}
                        size={48}
                        fill={"#4d4d4d"}
                        color={"#FCFCED"}
                        strokeWidth={"1.5px"}
                      ></FeatherIcon>
                    </button>
                    <div
                      className={`${emailDialog} ${
                        isEmailDialogOpen ? "visible" : "invisible"
                      }`}
                    >
                      <h1>
                        <strong>Share</strong>
                      </h1>
                      <div className="flex flex-col">
                        <label className="mt-2">Email</label>
                        <div className="flex"></div>
                        <input
                          type="email"
                          className={`${emailDialogInput}`}
                          placeholder="example@email.com"
                          onChange={(t) => setEmail(t.target.value)}
                        />
                        <div className="flex justify-end">
                          <button
                            className="button mt-2"
                            onClick={() => handleSendEmail()}
                          >
                            Send
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <button
                  className={`${nextPageButton} ml-4`}
                  onClick={() => handleNextPage()}
                >
                  <FeatherIcon
                    icon={"arrow-right-circle"}
                    size={64}
                    fill={"#4d4d4d"}
                    color={"#FCFCED"}
                    strokeWidth={"1.5px"}
                  ></FeatherIcon>
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
