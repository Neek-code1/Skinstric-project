
import { Routes, Route, Link } from "react-router-dom";

import Testing from "./pages/Testing";
import Location from "./pages/Location";
import Upload from "./pages/Upload";
import Analysis from "./pages/Analysis";
import Processing from "./pages/Processing";
import Demographics from "./pages/Demographics";

import "./App.css";

// SKINSTRIC LANDING PAGE

function Home() {
  return (
    <div className="skinstric">
      <header className="navbar">
        <div className="brand">
          <strong>SKINSTRIC</strong>
          <span>[ INTRO ]</span>
        </div>

        <button className="code-btn" type="button">
          ENTER CODE
        </button>
      </header>

      <main className="hero">
        <div
          className="side-diamond diamond-left"
          aria-hidden="true"
        />
        <div
          className="side-diamond diamond-right"
          aria-hidden="true"
        />

        <a href="#about" className="hero-nav discover">
          <span className="arrow-diamond">
            <span className="arrow-shape left-arrow" />
          </span>
          <span>DISCOVER A.I.</span>
        </a>

        <h1 className="hero-title">
          Sophisticated
          <br />
          skincare
        </h1>

        <Link to="/testing" className="hero-nav take-test">
          <span>TAKE TEST</span>
          <span className="arrow-diamond">
            <span className="arrow-shape right-arrow" />
          </span>
        </Link>
      </main>

      <footer className="footer" id="about">
        <p>
          SKINSTRIC DEVELOPED AN A.I. THAT CREATES A
          <br />
          HIGHLY-PERSONALISED ROUTINE TAILORED TO
          <br />
          WHAT YOUR SKIN NEEDS.
        </p>
      </footer>
    </div>
  );
}

// ALL APPLICATION ROUTES

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/testing" element={<Testing />} />
      <Route path="/location" element={<Location />} />
      <Route path="/upload" element={<Upload />} />
      <Route path="/analysis" element={<Analysis />} />
      <Route path="/processing" element={<Processing />} />
      <Route
        path="/demographics"
        element={<Demographics />}
      />
      <Route
        path="*"
        element={
          <main style={{ padding: "40px" }}>
            <h1>Page not found</h1>
            <Link to="/">RETURN HOME</Link>
          </main>
        }
      />
    </Routes>
  );
}
