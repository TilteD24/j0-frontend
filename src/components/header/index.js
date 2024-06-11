import React, { useState, useEffect } from "react";
import banner from "./banner.png";
import "./index.css";

function Header({ accessToken, imageLoaded, onImageLoad }) {
  const [username, setUsername] = useState(null);

  const logoutHandler = () => {
    setUsername(null);
    localStorage.removeItem("accessToken");
  };

  useEffect(() => {
    if (accessToken) {
      fetch("https://judge0-backend-4gbd.onrender.com/login", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
        .then((res) => res.json())
        .then((res) => {
          setUsername(res.username);
        });
    }
  }, [accessToken]);

  return (
    <div className="header-container">
      <header className="header">
        <div className="header__logo">
          <a href="/">
            <img
              src={banner}
              alt="Judge0"
              className="header__logo-img"
              onLoad={() => onImageLoad(true)}
            />
          </a>
        </div>
        {imageLoaded && (
          <nav className="header__nav">
            {username ? (
              <>
                <span className="header__nav-item">{username}</span>
                <a className="header__nav-item" onClick={logoutHandler}>
                  Logout
                </a>
                <a className="header__nav-item" href="/submissions">
                  Submissions
                </a>
              </>
            ) : (
              <>
                <a className="header__nav-item" href="/login">
                  Login
                </a>
                <a className="header__nav-item" href="/register">
                  Register
                </a>
              </>
            )}
          </nav>
        )}
      </header>
    </div>
  );
}

export default Header;
