import BookDesignSection from "../sections/home/bookDesign/bookDesign";

import FeatherIcon from "feather-icons-react/build/FeatherIcon";

export default function Home() {
  return (
    <section className="section p-6 md:p-12">
      <nav className="navbar">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <FeatherIcon icon={"feather"} size={32}></FeatherIcon>
            <h1 className="ml-4">TaleSpin</h1>
          </div>
          <a>Home</a>
        </div>
      </nav>

      <BookDesignSection></BookDesignSection>
    </section>
  );
}
