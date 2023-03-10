import styles from "./book.module.scss";
import FeatherIcon from "feather-icons-react/build/FeatherIcon";
import { useState } from "react";

const { book, bookImage, bookContent, bookContainer, nextPageButton } = styles;

export default function Book() {
    const mockBookContentData = {
        pages: [
            {
                image: "https://oaidalleapiprodscus.blob.core.windows.net/private/org-NEepx7xdJC9h4A0YHYduXbl8/user-3rpAXihU0WtE6OpYkvEa0sVC/img-zwkESBBvEQkoJIi5syCRwUGq.png?st=2023-03-09T19%3A36%3A20Z&se=2023-03-09T21%3A36%3A20Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-03-08T21%3A45%3A42Z&ske=2023-03-09T21%3A45%3A42Z&sks=b&skv=2021-08-06&sig=6dQ9xBhe%2BfbXfhVGEjOHufGrxH/7kOx8VaL9fAqLcEg%3D",
                text: "Once upon a time in a kingdom far away, there was a little knight named Timmy. Timmy was small in size but big in heart. He loved helping others and always went out of his way to make sure everyone was happy.",
            },
            {
                image: "https://oaidalleapiprodscus.blob.core.windows.net/private/org-NEepx7xdJC9h4A0YHYduXbl8/user-3rpAXihU0WtE6OpYkvEa0sVC/img-IzEjvtwAQHvImFab5glsITz0.png?st=2023-03-09T19%3A38%3A16Z&se=2023-03-09T21%3A38%3A16Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-03-09T19%3A40%3A12Z&ske=2023-03-10T19%3A40%3A12Z&sks=b&skv=2021-08-06&sig=ZDGzmycewzEVB5KR4/KCdzwfa37qTmzFWH6omkotOuA%3D",
                text: "One day, Timmy heard that there were many elderly people in the kingdom who were struggling. They were sick and needed help but no one was willing to go to their rescue. Timmy knew he had to help.",
            },
            {
                image: "https://oaidalleapiprodscus.blob.core.windows.net/private/org-NEepx7xdJC9h4A0YHYduXbl8/user-3rpAXihU0WtE6OpYkvEa0sVC/img-kT5lXFOfNO39CsCFm1hSYb7A.png?st=2023-03-09T19%3A42%3A02Z&se=2023-03-09T21%3A42%3A02Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-03-08T23%3A19%3A00Z&ske=2023-03-09T23%3A19%3A00Z&sks=b&skv=2021-08-06&sig=JJcihkjpJjrOMDw%2BzIidtxtAgKz%2Bh8SQ6td7JeBi5bQ%3D",
                text: "Timmy set out on his journey to help the elderly. As he walked through the kingdom, he came across many scary monsters who tried to stop him. But Timmy was brave and fought them off with his sword.",
            },
            {
                image: "https://oaidalleapiprodscus.blob.core.windows.net/private/org-NEepx7xdJC9h4A0YHYduXbl8/user-3rpAXihU0WtE6OpYkvEa0sVC/img-j0dMreFcyy3ImCnAUjCg6jP1.png?st=2023-03-09T19%3A48%3A43Z&se=2023-03-09T21%3A48%3A43Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-03-09T19%3A40%3A36Z&ske=2023-03-10T19%3A40%3A36Z&sks=b&skv=2021-08-06&sig=oe/4bzYqfug1jdiXiGHmPxvfVAZaDEn8hepjlcVoaW0%3D",
                text: "Finally, Timmy reached the village where the elderly lived. He saw that they were in terrible condition and needed medical attention. Timmy quickly went to work, tending to their wounds and making sure they had food and water.",
            },
        ],
    };
    const [index, setIndex] = useState(0);
    const [bookContentData, setBookContent] = useState(
        mockBookContentData.pages[index]
    );

    function handleNextPage() {
        if (index < mockBookContentData.pages.length - 1) {
            setIndex(index + 1);
            setBookContent(mockBookContentData.pages[index + 1]);
        }
    }

    function handlePreviousPage() {
        if (index > 0) {
            setIndex(index - 1);
            setBookContent(mockBookContentData.pages[index - 1]);
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
                            <div
                                className={`${book} mt-4 flex flex-col justify-between`}
                            >
                                <div
                                    className={`${bookImage}`}
                                    style={{
                                        backgroundImage: `url(${bookContentData.image})`,
                                    }}
                                ></div>
                                <div
                                    className={`${bookContent} flex items-center`}
                                >
                                    <p className="text-center">
                                        {bookContentData.text}
                                    </p>
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
