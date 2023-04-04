import styles from "./displayBook.module.scss";
import { useRouter } from "next/router";
import { useState } from "react";

const {
  book,
  bookTitle,
  bookBadgeContainer,
  bookBadge,
  bookPage,
  book2,
  overallBook,
  isBookColor1,
  isBookColor2,
  isBookColor3,
  isBookColor4,
} = styles;

export default function DisplayBook({ storyId, title, bookColor }) {
  const router = useRouter();

  function handleClick() {
    router.push({
      pathname: "/book",
      query: {
        storyId,
      },
    });
  }

  const colorSelector = {
    "scheme-1": isBookColor1,
    "scheme-2": isBookColor2,
    "scheme-3": isBookColor3,
    "scheme-4": isBookColor4,
  };

  return (
    <>
      <div
        className={`mt-4 relative cursor-pointer`}
        onClick={() => handleClick()}
      >
        <div className={`${overallBook} ${colorSelector[bookColor]}`}>
          <div className={`${book} flex flex-col justify-between items-center`}>
            <div className="w-full">
              <div className={`${bookTitle}`}>
                <h1>{title}</h1>
              </div>

              <div className={`${bookBadgeContainer}`}>
                <div className={`${bookBadge}`}></div>
              </div>
            </div>
            <p className="text-sm mb-8">A Story By TaleSpin</p>
          </div>
          <div className={`${bookPage} `}></div>
          <div className={`${book2}`}></div>
        </div>
      </div>
    </>
  );
}
