import Navbar from "../components/navbar";

import BookDesignSection from "../sections/home/bookDesign";


export default function Home() {
  return (
    <section className="section p-6 md:p-12">
      <Navbar></Navbar>
      <BookDesignSection></BookDesignSection>
    </section>
  );
}
