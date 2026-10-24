
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Testing.css";

export default function Testing() {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();

    const cleanName = name.trim();

    if (!cleanName) return;

    sessionStorage.setItem("skinstricName", cleanName);
    navigate("/location");
  }

  return (
    <div className="testing-page">
      <header className="testing-header">
        <div className="testing-brand">
          <Link to="/">SKINSTRIC</Link>
          <span>[ INTRO ]</span>
        </div>

        <button
          className="testing-code-btn"
          type="button"
        >
          ENTER CODE
        </button>
      </header>

      <div className="testing-top-label">
        TO START ANALYSIS
      </div>

      <main className="testing-content">
        <div className="testing-diamonds" aria-hidden="true">
          <div className="testing-diamond testing-diamond-one" />
          <div className="testing-diamond testing-diamond-two" />
          <div className="testing-diamond testing-diamond-three" />
        </div>

        <div className="testing-center">
          <p className="testing-click-label">
            CLICK TO TYPE
          </p>

          <form
            className="testing-form"
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              placeholder="Introduce Yourself"
              value={name}
              onChange={(event) => setName(event.target.value)}
              aria-label="Your name"
              autoComplete="name"
              maxLength={80}
            />
          </form>
        </div>
      </main>

      <footer className="testing-footer">
        <Link to="/" className="testing-nav testing-back">
          <span className="testing-arrow-diamond">
            <span className="testing-arrow testing-arrow-left" />
          </span>
          <span>BACK</span>
        </Link>
      </footer>
    </div>
  );
}
