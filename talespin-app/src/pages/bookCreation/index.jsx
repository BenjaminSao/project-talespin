import { useAuth0 } from "@auth0/auth0-react";
import Navbar from "../../components/navbar";
import BookDesignSection from "../../sections/bookCreation/bookDesign";

export default function BookCreation() {
  const { isAuthenticated } = useAuth0();

  return (
    <section className="section p-6 md:p-12">
      <Navbar></Navbar>
      {
        isAuthenticated && 
        (
          <BookDesignSection></BookDesignSection>
        )
      }
    </section>
  );
}
