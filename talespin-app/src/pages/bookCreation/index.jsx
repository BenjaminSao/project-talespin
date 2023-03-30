import Navbar from "../../components/navbar";
import BookDesignSection from "../../sections/bookCreation/bookDesign";

export default function BookCreation() {
    return (
        <section className="section p-6 md:p-12">
            <Navbar></Navbar>
            <BookDesignSection></BookDesignSection>
        </section>
    );
}
