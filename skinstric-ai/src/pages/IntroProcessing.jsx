
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./IntroProcessing.css";

export default function IntroProcessing() {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const startedAt = Date.now();
    const duration = 3000;

    const interval = setInterval(() => {
      const elapsed = Date.now() - startedAt;
      const nextProgress = Math.min(
        Math.round((elapsed / duration) * 100),
        100
      );

      setProgress(nextProgress);

      if (nextProgress >= 100) {
        clearInterval(interval);
        navigate("/thank-you", { replace: true });
      }
    }, 50);

    return () => clearInterval(interval);
  }, [navigate]);

  return (
    <div className="intro-processing-page">
      <header className="intro-processing-header">
        <div className="intro-processing-brand">
          <strong>SKINSTRIC</strong>
          <span>[ INTRO ]</span>
        </div>

        <button type="button" className="intro-processing-code">
          ENTER CODE
        </button>
      </header>

      <p className="intro-processing-label">
        TO START ANALYSIS
      </p>

      <main className="intro-processing-main">
        <div className="intro-processing-diamonds" aria-hidden="true">
          <div className="intro-processing-diamond intro-processing-one" />
          <div className="intro-processing-diamond intro-processing-two" />
          <div className="intro-processing-diamond intro-processing-three" />
        </div>

        <div className="intro-processing-center">
          <h1>Processing</h1>
          <p>Please wait...</p>
          <span>{progress}%</span>
        </div>
      </main>
    </div>
  );
}
