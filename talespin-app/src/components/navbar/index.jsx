import FeatherIcon from "feather-icons-react/build/FeatherIcon";
import { useAuth0 } from "@auth0/auth0-react";
import { useState, useEffect } from "react";

export default function Navbar() {
  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();

  function handleLogister() {
    const currentUrl = window.location.origin + window.location.pathname;
    const redirectUrl = currentUrl + "dashboard";
    loginWithRedirect({
      redirectUri: redirectUrl,
    });
  }

  return (
    <>
      <nav className="navbar">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <FeatherIcon icon={"feather"} size={32}></FeatherIcon>
            <h1 className="ml-4">TaleSpin</h1>
          </div>
          <div>
            {!isAuthenticated ? (
              <>
                <a onClick={() => handleLogister()} className="mr-4">
                  Login
                </a>
              </>
            ) : (
              <>
                <a href="/bookCreation" className="mr-4">
                  + Create
                </a>
                <a href="/dashboard" className="mr-4">
                  Dashboard
                </a>
                <a
                  onClick={() =>
                    logout({
                      logoutParams: { returnTo: window.location.origin },
                    })
                  }
                  className="mr-4"
                >
                  Logout
                </a>
              </>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}
