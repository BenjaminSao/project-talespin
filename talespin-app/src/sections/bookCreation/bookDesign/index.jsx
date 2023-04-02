import styles from "./bookDesign.module.scss";

import { useState } from "react";
import { useRouter } from "next/router";

import FeatherIcon from "feather-icons-react/build/FeatherIcon";

const {
  overallBook,
  book,
  bookTitle,
  bookBadgeContainer,
  bookBadge,
  bookPage,
  book2,
  controls,
  controlNavigationButton,
  controlColorButtons,
  controlColorButton,
  isCl1,
  isCl2,
  isCl3,
  isCl4,
  isSelected,
  storyLengthButtons,
  storyLengthButton,
  isLengthSelected,
  artStyleButtons,
  artStyleButton,
  isArtSelected,
  isBookColor1,
  isBookColor2,
  isBookColor3,
  isBookColor4,
} = styles;

export default function BookDesignSection() {
  const router = useRouter();
  const [bookGenerationStep, setBookGenerationStep] = useState(0);

  const [color, setColor] = useState("scheme-1");
  const [art, setArt] = useState("colorful");
  const [length, setLength] = useState("short");

  const colorSelector = {
    "scheme-1": isBookColor1,
    "scheme-2": isBookColor2,
    "scheme-3": isBookColor3,
    "scheme-4": isBookColor4,
  };

  const [title, setTitle] = useState("");
  const [prompt, setPrompt] = useState("");

  function handleNextButton() {
    if (bookGenerationStep === 0) {
      if (!title) alert("Please Enter a Title");
      else setBookGenerationStep(1);
    } else {
      if (!prompt) alert("Please Enter a Prompt");
      else
        router.push({
          pathname: "/loadingScreen",
          query: {
            title,
            prompt,
            color,
            art,
            length,
          },
        });
    }
  }

  return (
    <>
      <div className="section mt-8">
        <div className="flex flex-col items-center">
          <h1>To start, let's name and design the book!</h1>
          <div
            className={`${overallBook} ${colorSelector[color]} mt-4 relative`}
          >
            <div
              className={`${book} flex flex-col justify-between items-center ${
                bookGenerationStep === 0 ? "" : "invisible"
              }`}
            >
              <div className="w-full">
                <div className={`${bookTitle}`}>
                  <textarea
                    rows={2}
                    placeholder={"Title"}
                    onChange={(t) => setTitle(t.target.value)}
                  />
                </div>

                <div className={`${bookBadgeContainer}`}>
                  <div className={`${bookBadge}`}></div>
                </div>
              </div>
              <p className="small mb-8 ">A Story By TaleSpin</p>
            </div>

            <div className={`${bookPage} `}>
              <div className="flex items-center mb-4">
                <FeatherIcon icon={"feather"}></FeatherIcon>
                <p className="font-bold ml-4">Tell me a Tale!</p>
              </div>

              <textarea
                rows={8}
                placeholder="A little knight who goes across the kingdom to help the elderly. He fights scary monsters and rescues a princess from the evil forces! ..."
                className="mb-4"
                onChange={(t) => setPrompt(t.target.value)}
              />

              <div className="mb-8">
                <p className="font-bold">I want my story to be...</p>
                <div className={`${storyLengthButtons} mt-4`}>
                  <button
                    className={`${storyLengthButton} mr-4 ${
                      length === "short" ? isLengthSelected : ""
                    }`}
                    onClick={() => setLength("short")}
                  >
                    Short
                  </button>
                  <button
                    className={`${storyLengthButton} mr-4 ${
                      length === "medium" ? isLengthSelected : ""
                    }`}
                    onClick={() => setLength("medium")}
                  >
                    Medium
                  </button>
                  <button
                    className={`${storyLengthButton} mr-4 ${
                      length === "long" ? isLengthSelected : ""
                    }`}
                    onClick={() => setLength("long")}
                  >
                    Long
                  </button>
                </div>
              </div>

              <div>
                <p className="font-bold">I art should be...</p>
                <div className={`${artStyleButtons} mt-4`}>
                  <button
                    className={`${artStyleButton} mr-4 ${
                      art === "colorful" ? isArtSelected : ""
                    }`}
                    onClick={() => setArt("colorful")}
                  >
                    Colorful
                  </button>
                  <button
                    className={`${artStyleButton} mr-4 ${
                      art === "minimal" ? isArtSelected : ""
                    }`}
                    onClick={() => setArt("minimal")}
                  >
                    Minimal
                  </button>
                  <button
                    className={`${artStyleButton} mr-4 ${
                      art === "realistic" ? isArtSelected : ""
                    }`}
                    onClick={() => setArt("realistic")}
                  >
                    Realistic
                  </button>
                </div>
              </div>
            </div>
            <div className={`${book2}`}></div>
          </div>
        </div>
      </div>

      <div className="section mt-12">
        <div className={`${controls} flex justify-between items-center`}>
          <button
            className={`${controlNavigationButton}`}
            onClick={() => setBookGenerationStep(bookGenerationStep - 1)}
          >
            <label>Back</label>
            <FeatherIcon
              icon={"arrow-left-circle"}
              size={64}
              fill={"#4d4d4d"}
              color={"#FCFCED"}
              strokeWidth={"1.5px"}
            ></FeatherIcon>
          </button>

          <div className={`${controlColorButtons}`}>
            <button
              className={`${controlColorButton} ${isCl1} ${
                color === "scheme-1" ? isSelected : ""
              }`}
              onClick={() => setColor("scheme-1")}
            ></button>
            <button
              className={`${controlColorButton} ${isCl2} ${
                color === "scheme-2" ? isSelected : ""
              }`}
              onClick={() => setColor("scheme-2")}
            ></button>
            <button
              className={`${controlColorButton} ${isCl3} ${
                color === "scheme-3" ? isSelected : ""
              }`}
              onClick={() => setColor("scheme-3")}
            ></button>
            <button
              className={`${controlColorButton} ${isCl4} ${
                color === "scheme-4" ? isSelected : ""
              }`}
              onClick={() => setColor("scheme-4")}
            ></button>
          </div>

          <button
            className={`${controlNavigationButton}`}
            onClick={() => handleNextButton()}
          >
            <label>{bookGenerationStep === 1 ? "Write" : "Next!"}</label>
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
    </>
  );
}
