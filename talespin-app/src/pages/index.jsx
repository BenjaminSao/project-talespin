import Navbar from "../components/navbar";
import Hero from "../sections/home/hero/hero";

export default function Home() {
    return (
        <>
            <section className="section p-6 md:p-12">
                <Navbar></Navbar>
            </section>
            <Hero></Hero>
        </>
    );
}
