import styles from "./displayBook.module.scss";
import { useRouter } from "next/router";

const { book, bookTitle, bookBadgeContainer, bookBadge, bookPage, book2 } =
  styles;

export default function DisplayBook({ id, title, bookColor }) {
  const router = useRouter();

  function handleClick() {
    router.push("/book", {
      query: {
        id,
      },
    });
  }

  return (
    <>
      <div
        className={`mt-4 relative cursor-pointer`}
        onClick={() => handleClick()}
      >
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
    </>
  );
}
