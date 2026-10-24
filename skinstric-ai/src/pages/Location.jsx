
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Location() {
  const [location, setLocation] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    if (!location.trim()) return;

    sessionStorage.setItem(
      "skinstricLocation",
      location.trim()
    );

    navigate("/upload");
  }

  return (
    <div className="testing-page">
      <header className="navbar">
        <div className="brand">
          <strong>SKINSTRIC</strong>
          <span>[ INTRO ]</span>
        </div>

        <button className="code-btn" type="button">
          ENTER CODE
        </button>
      </header>

      <main className="testing-content">
        <p className="testing-label">
          TO START ANALYSIS
        </p>

        {/* Decorative diamond only */}
        <div
          className="testing-diamond"
          aria-hidden="true"
        />

        {/* Form stays horizontal */}
        <div className="testing-form">
          <p>CLICK TO TYPE</p>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Where are you from?"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              aria-label="Your location"
              autoComplete="address-level2"
              required
            />

            <button type="submit">
              PROCEED →
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
