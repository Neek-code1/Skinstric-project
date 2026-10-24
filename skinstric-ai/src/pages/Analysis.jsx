import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Analysis.css";

export default function Analysis() {
  const navigate = useNavigate();

  // Retrieve photo saved from Upload.jsx
  const [photo] = useState(() => {
    try {
      return sessionStorage.getItem("skinstricPhoto");
    } catch (error) {
      console.error("Unable to retrieve photo:", error);
      return null;
    }
  });

  // Navigate to the processing animation
  function startAnalysis() {
    if (!photo) {
      return;
    }

    navigate("/processing");
  }

  return (
    <div className="analysis-page">
      {/* HEADER */}
      <header className="analysis-header">
        <div className="brand">
          <strong>SKINSTRIC</strong>
          <span>[ ANALYSIS ]</span>
        </div>

        <button className="code-btn" type="button">
          ENTER CODE
        </button>
      </header>

      {/* MAIN CONTENT */}
      <main className="analysis-main">
        <p className="analysis-label">PREPARING YOUR ANALYSIS</p>

        <h1>Your Skinstric Analysis</h1>

        {/* PHOTO PREVIEW */}
        {photo ? (
          <>
            <img
              src={photo}
              alt="Photo submitted for analysis"
              className="analysis-photo"
            />

            <p>Photo received successfully.</p>

            <p className="analysis-description">
              Your photo is ready for the next step.
            </p>

            {/* ACTION BUTTONS */}
            <div className="analysis-actions">
              <Link to="/upload" className="analysis-button">
                CHANGE PHOTO
              </Link>

              <button
                type="button"
                className="analysis-button"
                onClick={startAnalysis}
              >
                START ANALYSIS →
              </button>
            </div>
          </>
        ) : (
          <>
            <p className="analysis-description">
              No photo was found. Please capture or upload a photo to continue.
            </p>

            <Link to="/upload" className="analysis-button">
              UPLOAD PHOTO
            </Link>
          </>
        )}
      </main>

      {/* FOOTER */}
      <footer className="analysis-footer">
        <Link to="/upload" className="analysis-back">
          ← BACK
        </Link>

        <span>SKINSTRIC AI ANALYSIS</span>
      </footer>
    </div>
  );
}
