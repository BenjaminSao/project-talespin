import Image from "next/image";
import { useAuth0 } from "@auth0/auth0-react";

export default function Hero() {
  const { loginWithRedirect } = useAuth0();

  function handleLogister() {
    const currentUrl = window.location.origin + window.location.pathname;
    const redirectUrl = currentUrl + "dashboard";
    loginWithRedirect({
      redirectUri: redirectUrl,
    });
  }

  return (
    <>
      <section className="section p-6 md:p-12">
        <div className="flex justify-center items-center py-12">
          <div className="flex flex-col items-center">
            <Image
              src="/hero-image.png"
              alt="magical book"
              width={400}
              height={400}
            ></Image>
            <h1 className="mt-8">
              Welcome to <strong>TaleSpin</strong>
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
