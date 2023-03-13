import styles from "./book.module.scss";
import FeatherIcon from "feather-icons-react/build/FeatherIcon";
import { useState } from "react";
import { useRouter } from "next/router";

const { book, bookImage, bookContent, bookContainer, nextPageButton } = styles;

export default function Book() {
  const router = useRouter();
  const { storyInformationJSON } = router.query;
  const storyInformation = JSON.parse(storyInformationJSON);

  const [index, setIndex] = useState(0);
  const [bookContentData, setBookContent] = useState(
    storyInformation.pages[index]
  );

  function handleNextPage() {
    if (index < storyInformation.pages.length - 1) {
      setIndex(index + 1);
      setBookContent(storyInformation.pages[index + 1]);
    }
  }

  function handlePreviousPage() {
    if (index > 0) {
      setIndex(index - 1);
      setBookContent(storyInformation.pages[index - 1]);
    }
  }

  return (
    <>
      <div className="flex justify-center mt-6">
        <div>
          <h1 className="text-center font-bold">The Little Knight</h1>
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
                    backgroundImage: `url(${bookContentData.image})`,
                  }}
                ></div>
                <div className={`${bookContent} flex items-center`}>
                  <p className="text-center">{bookContentData.text}</p>
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
        </div>
      </div>
    </>
  );
}
