
import { Link, useNavigate } from "react-router-dom";
import "./ThankYou.css";

export default function ThankYou() {
  const navigate = useNavigate();

  return (
    <div className="thankyou-page">
      <header className="thankyou-header">
        <div className="thankyou-brand">
          <Link to="/">SKINSTRIC</Link>
          <span>[ INTRO ]</span>
        </div>

        <button type="button" className="thankyou-code">
          ENTER CODE
        </button>
      </header>

      <p className="thankyou-label">
        TO START ANALYSIS
      </p>

      <main className="thankyou-main">
        <div className="thankyou-diamonds" aria-hidden="true">
          <div className="thankyou-diamond thankyou-one" />
          <div className="thankyou-diamond thankyou-two" />
          <div className="thankyou-diamond thankyou-three" />
        </div>

        <div className="thankyou-center">
          <h1>Thank you!</h1>
          <p>Proceed for the next step</p>
        </div>
      </main>

      <footer className="thankyou-footer">
        <Link to="/location" className="thankyou-nav">
          <span className="thankyou-arrow-diamond">
            <span className="thankyou-arrow thankyou-left" />
          </span>
          <span>BACK</span>
        </Link>

        <button
          type="button"
          className="thankyou-nav"
          onClick={() => navigate("/upload")}
        >
          <span>PROCEED</span>
          <span className="thankyou-arrow-diamond">
            <span className="thankyou-arrow thankyou-right" />
          </span>
        </button>
      </footer>
    </div>
  );
}
