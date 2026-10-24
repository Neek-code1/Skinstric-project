
import { Link, useNavigate } from "react-router-dom";
import "./Select.css";

const analysisOptions = [
  {
    id: "demographics",
    label: "DEMOGRAPHICS",
    available: true,
  },
  {
    id: "cosmetic",
    label: "COSMETIC CONCERNS",
    available: false,
  },
  {
    id: "skin",
    label: "SKIN TYPE DETAILS",
    available: false,
  },
  {
    id: "weather",
    label: "WEATHER",
    available: false,
  },
];

export default function Select() {
  const navigate = useNavigate();

  function handleSelect(option) {
    if (option.available) {
      navigate("/demographics");
    }
  }

  return (
    <div className="select-page">
      <header className="select-header">
        <div className="select-brand">
          <Link to="/">SKINSTRIC</Link>
          <span>[ INTRO ]</span>
        </div>

        <button className="select-code" type="button">
          ENTER CODE
        </button>
      </header>

      <section className="select-intro">
        <h2>A.I. ANALYSIS</h2>
        <p>A.I. HAS ESTIMATED THE FOLLOWING.</p>
        <p>FIX ESTIMATED INFORMATION IF NEEDED.</p>
      </section>

      <main className="select-main">
        <div className="select-diamond-grid">
          {analysisOptions.map((option) => (
            <button
              key={option.id}
              type="button"
              className={`select-tile select-${option.id}`}
              onClick={() => handleSelect(option)}
              disabled={!option.available}
              aria-label={
                option.available
                  ? `Open ${option.label}`
                  : `${option.label} coming soon`
              }
            >
              <span>{option.label}</span>
            </button>
          ))}
        </div>
      </main>

      <footer className="select-footer">
        <Link to="/processing" className="select-nav">
          <span className="select-arrow-diamond">
            <span className="select-arrow-left" />
          </span>
          <span>BACK</span>
        </Link>

        <Link to="/demographics" className="select-nav">
          <span>GET SUMMARY</span>
          <span className="select-arrow-diamond">
            <span className="select-arrow-right" />
          </span>
        </Link>
      </footer>
    </div>
  );
}
