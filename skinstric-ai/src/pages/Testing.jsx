
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Testing() {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    if (!name.trim()) return;

    sessionStorage.setItem("skinstricName", name.trim());
    navigate("/location");
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
        <p className="testing-label">TO START ANALYSIS</p>

        <div className="testing-diamond" aria-hidden="true" />

        <div className="testing-form">
          <p>CLICK TO TYPE</p>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Introduce Yourself"
              value={name}
              onChange={(e) => setName(e.target.value)}
              aria-label="Your name"
              autoComplete="name"
              autoFocus
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
