import React from "react";
import { Link } from "react-router-dom";
import "../App.css"

export default function Home() {
  return (
    <main>
      <Hero />
    </main>
  );
}

// hero content
const Hero = () => (
  <section className="hero">
    {/* content for the hero */}
    <div className="hero__content">
      <h1 className="hero__title">Minty Yard</h1>
      <p className="hero__subtitle">A fine dining experience</p>

      <Link to="/menu">Menu</Link>
      <Link to="/book">Book</Link>
    </div>
  </section>
);

