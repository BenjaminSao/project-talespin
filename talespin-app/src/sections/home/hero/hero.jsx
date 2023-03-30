import Image from "next/image";
import { useAuth0 } from "@auth0/auth0-react";

export default function Hero() {
  const { loginWithRedirect } = useAuth0();

  function handleLogister() {
    loginWithRedirect({
      redirectUri: "http://localhost:3000/dashboard",
    });
  }

  return (
    <>
      <section className="section p-6 mt-12 md:p-12">
        <div className="flex justify-center items-center">
          <div className="flex flex-col items-center">
            <Image
              src="/hero-image.png"
              alt="magical book"
              width={400}
              height={400}
            ></Image>
            <h1 className="mt-8">
              Welcome to <strong>TailSpin</strong>
            </h1>
            <button
              className="button style-1 mt-4"
              onClick={() => handleLogister()}
            >
              Login / Register
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
