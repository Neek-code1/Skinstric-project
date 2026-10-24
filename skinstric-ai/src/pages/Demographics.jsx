
import { useState } from "react";
import { Link } from "react-router-dom";
import "./Demographics.css";

// DEMONSTRATION DATA ONLY
// These are not actual AI predictions.

const sampleResults = {
  race: [
    { name: "Black", value: 82 },
    { name: "White", value: 9 },
    { name: "Asian", value: 5 },
    { name: "Other", value: 4 },
  ],
  age: [
    { name: "30-39", value: 68 },
    { name: "20-29", value: 18 },
    { name: "40-49", value: 10 },
    { name: "Other", value: 4 },
  ],
  sex: [
    { name: "Female", value: 94 },
    { name: "Male", value: 6 },
  ],
};

const categories = [
  { id: "race", label: "RACE" },
  { id: "age", label: "AGE" },
  { id: "sex", label: "SEX" },
];

export default function Demographics() {
  const [category, setCategory] = useState("race");

  const [selected, setSelected] = useState({
    race: "Black",
    age: "30-39",
    sex: "Female",
  });

  const results = sampleResults[category];

  const active =
    results.find(
      (item) => item.name === selected[category]
    ) || results[0];

  function chooseResult(name) {
    setSelected((previous) => ({
      ...previous,
      [category]: name,
    }));
  }

  return (
    <div className="demographics-page">
      {/* HEADER */}
      <header className="demographics-header">
        <div className="demographics-brand">
          <Link to="/">SKINSTRIC</Link>
          <span>[ ANALYSIS ]</span>
        </div>

        <button
          className="demographics-code"
          type="button"
        >
          ENTER CODE
        </button>
      </header>

      {/* PAGE TITLE */}
      <section className="demographics-intro">
        <p>A.I. ANALYSIS</p>
        <h1>DEMOGRAPHICS</h1>
        <p>PREDICTED RACE & AGE</p>
        <span className="demographics-demo-label">
          DEMONSTRATION RESULTS — NOT REAL PREDICTIONS
        </span>
      </section>

      {/* DASHBOARD */}
      <main className="demographics-layout">
        {/* LEFT CATEGORY SELECTOR */}
        <aside className="demographics-categories">
          {categories.map((item) => (
            <button
              key={item.id}
              type="button"
              className={
                category === item.id
                  ? "demographics-category active"
                  : "demographics-category"
              }
              onClick={() => setCategory(item.id)}
            >
              <strong>{selected[item.id]}</strong>
              <span>{item.label}</span>
            </button>
          ))}
        </aside>

        {/* CENTER CONFIDENCE CHART */}
        <section className="demographics-chart-panel">
          <h2>{active.name}</h2>
          <p>{category.toUpperCase()}</p>

          <div
            className="demographics-chart"
            role="img"
            aria-label={
              `${active.name}: ${active.value}% demo value`
            }
            style={{
              "--percentage": `${active.value}%`,
            }}
          >
            <div className="demographics-chart-inner">
              <strong>{active.value}%</strong>
            </div>
          </div>
        </section>

        {/* RIGHT RESULTS PANEL */}
        <section className="demographics-results">
          <div className="demographics-results-heading">
            <strong>{category.toUpperCase()}</strong>
            <strong>DEMO VALUE</strong>
          </div>

          {results.map((item) => (
            <button
              key={item.name}
              type="button"
              className={
                active.name === item.name
                  ? "demographics-result selected"
                  : "demographics-result"
              }
              onClick={() => chooseResult(item.name)}
            >
              <span>
                <span
                  className="demographics-diamond"
                  aria-hidden="true"
                >
                  {active.name === item.name
                    ? "◆"
                    : "◇"}
                </span>
                {item.name}
              </span>

              <span>{item.value}%</span>
            </button>
          ))}
        </section>
      </main>

      <p className="demographics-disclaimer">
        These values are fictional sample data for
        interface testing. No AI analysis of your
        photograph has been performed.
      </p>

      {/* FOOTER */}
      <footer className="demographics-footer">
        <Link to="/processing">◇ BACK</Link>
        <Link to="/">HOME ◇</Link>
      </footer>
    </div>
  );
}
