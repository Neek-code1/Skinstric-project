
import { useState } from "react";
import { Link } from "react-router-dom";
import "./Demographics.css";

// Sample values for demonstrating the interface.
// No image-based demographic analysis is performed.

const sampleResults = {
  race: [
    { name: "Southeast asian", value: 62 },
    { name: "White", value: 14 },
    { name: "Black", value: 12 },
    { name: "East asian", value: 4 },
    { name: "Middle eastern", value: 4 },
    { name: "South asian", value: 1 },
    { name: "Latino hispanic", value: 0 },
  ],
  age: [
    { name: "60-69", value: 65 },
    { name: "50-59", value: 15 },
    { name: "40-49", value: 10 },
    { name: "30-39", value: 6 },
    { name: "20-29", value: 3 },
    { name: "70+", value: 1 },
  ],
  sex: [
    { name: "Male", value: 86 },
    { name: "Female", value: 14 },
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
    race: "Southeast asian",
    age: "60-69",
    sex: "Male",
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
      <header className="demographics-header">
        <div className="demographics-brand">
          <Link to="/">SKINSTRIC</Link>
          <span>[ INTRO ]</span>
        </div>

        <button
          className="demographics-code"
          type="button"
        >
          ENTER CODE
        </button>
      </header>

      <section className="demographics-intro">
        <p>A.I. ANALYSIS</p>
        <h1>DEMOGRAPHICS</h1>
        <p>PREDICTED RACE & AGE</p>
      </section>

      <main className="demographics-layout">
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

        <section className="demographics-chart-panel">
          <h2>{active.name}</h2>

          <div className="demographics-chart-area">
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
          </div>
        </section>

        <section className="demographics-results">
          <div className="demographics-results-heading">
            <strong>{category.toUpperCase()}</strong>
            <strong>DEMO CONFIDENCE</strong>
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
                    ? "◈"
                    : "◇"}
                </span>
                {item.name}
              </span>

              <span>{item.value}%</span>
            </button>
          ))}
        </section>
      </main>

      <div className="demographics-bottom">
        <Link to="/select" className="demographics-nav">
          <span className="demographics-arrow-box">
            <span className="demographics-arrow-left" />
          </span>
          <span>BACK</span>
        </Link>

        <p className="demographics-disclaimer">
          Demonstration data only. No actual A.I.
          analysis of your photo has been performed.
        </p>

        <Link to="/" className="demographics-nav">
          <span>HOME</span>
          <span className="demographics-arrow-box">
            <span className="demographics-arrow-right" />
          </span>
        </Link>
      </div>
    </div>
  );
}
