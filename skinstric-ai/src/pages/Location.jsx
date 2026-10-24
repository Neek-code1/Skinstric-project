
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Location.css";

export default function Location() {
  const navigate = useNavigate();

  const [location, setLocation] = useState("");

  /* ==========================================
     SAVE LOCATION AND CONTINUE
  ========================================== */

  function handleSubmit(event) {
    event.preventDefault();

    const cleanLocation = location.trim();

    if (!cleanLocation) return;

    try {
      sessionStorage.setItem(
        "skinstricLocation",
        cleanLocation
      );
    } catch (error) {
      console.error("Unable to save location:", error);
    }

    // Go to introduction processing screen
    navigate("/intro-processing");
  }

  return (
    <div className="location-page">

      {/* ======================================
          HEADER
      ====================================== */}

      <header className="location-header">
        <div className="location-brand">
          <Link to="/">
            SKINSTRIC
          </Link>

          <span>[ INTRO ]</span>
        </div>

        <button
          type="button"
          className="location-code-btn"
        >
          ENTER CODE
        </button>
      </header>

      {/* ======================================
          TOP LEFT LABEL
      ====================================== */}

      <div className="location-top-label">
        TO START ANALYSIS
      </div>

      {/* ======================================
          MAIN CONTENT
      ====================================== */}

      <main className="location-content">

        {/* THREE DOTTED DIAMONDS */}

        <div
          className="location-diamonds"
          aria-hidden="true"
        >
          <div className="location-diamond location-diamond-one" />

          <div className="location-diamond location-diamond-two" />

          <div className="location-diamond location-diamond-three" />
        </div>

        {/* LOCATION INPUT */}

        <div className="location-center">
          <p className="location-click-label">
            CLICK TO TYPE
          </p>

          <form
            className="location-form"
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              placeholder="Where are you from?"
              value={location}
              onChange={(event) =>
                setLocation(event.target.value)
              }
              aria-label="Your location"
              autoComplete="address-level2"
              maxLength={100}
              required
            />
          </form>
        </div>
      </main>

      {/* ======================================
          FOOTER NAVIGATION
      ====================================== */}

      <footer className="location-footer">
        <Link
          to="/testing"
          className="location-back"
        >
          <span className="location-arrow-diamond">
            <span className="location-arrow-left" />
          </span>

          <span>BACK</span>
        </Link>
      </footer>
    </div>
  );
}
