import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Processing.css";

export default function Processing() {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((previous) => Math.min(previous + 2, 100));
    }, 100);

    return () => clearInterval(interval);
  }, []);

  function handleContinue() {
    if (progress === 100) {
      navigate("/select");
    }
  }

  return (
    <div className="processing-page">
      <header className="navbar">
        <div className="brand">
          <strong>SKINSTRIC</strong>
          <span>[ ANALYSIS ]</span>
        </div>

        <button className="code-btn" type="button">
          ENTER CODE
        </button>
      </header>

      <div className="processing-label">PREPARING YOUR ANALYSIS</div>

      <main className="processing-main">
        <div className="processing-animation">
          <div className="processing-diamond diamond-one" />
          <div className="processing-diamond diamond-two" />
          <div className="processing-diamond diamond-three" />

          <div className="processing-center">
            <h1>
              {progress < 100
                ? "Preparing your analysis"
                : "Preparation complete"}
            </h1>

            <p className="processing-percent">{progress}%</p>

            <p className="processing-note">
              {progress < 100
                ? "Setting up your experience..."
                : "Ready to continue"}
            </p>
          </div>
        </div>
      </main>

      <footer className="processing-footer">
        <Link to="/analysis" className="processing-back">
          ← BACK
        </Link>

        {progress === 100 && (
          <button
            type="button"
            className="processing-continue"
            onClick={handleContinue}
          >
            CONTINUE →
          </button>
        )}
      </footer>
    </div>
  );
}
