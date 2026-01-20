import React from "react";
import "./Landingpage.css"; // Custom CSS

const Landingpage = () => {
  return (
    <div className="landing-page">
      {/* Header / Navbar - Updated */}
      <header className="navbar d-flex justify-content-between align-items-center p-3">
        <h1 className="logo">TravelFlix</h1>

        {/* Navbar links */}
        <nav>
          <ul className="nav-links d-flex gap-3 mb-0">
            <li><a href="#home">Home</a></li>
            <li><a href="#destinations">Destinations</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>

        <button className="btn btn-danger">Sign In</button>
      </header>

      {/* Hero Section */}
      <div className="hero-section text-center text-white d-flex flex-column justify-content-center align-items-center">
        <h2 className="hero-title">Explore the World Like Never Before</h2>
        <p className="hero-subtitle">Discover new destinations, plan trips, and create memories.</p>
        <button className="btn btn-primary btn-lg mt-3 mb-3">Get Started</button>
      </div>

      {/* New Tourism Highlights Section */}
      <section className="tourism-highlights text-center py-5" id="destinations">
        <h3 className="section-title">Popular Destinations</h3>
        <p className="section-subtitle">From mountains to beaches, explore the best places to travel.</p>

        <div className="highlights-container d-flex justify-content-center flex-wrap gap-4 mt-4">
          <div className="highlight-card">
            <img src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e" alt="Beach" />
            <h5>Sunny Beaches</h5>
            <p>Relax and unwind at the world's most beautiful beaches.</p>
          </div>
          <div className="highlight-card">
            <img src="https://images.unsplash.com/photo-1501785888041-af3ef285b470" alt="Mountains" />
            <h5>Majestic Mountains</h5>
            <p>Adventure awaits in breathtaking mountain ranges.</p>
          </div>
          <div className="highlight-card">
            <img src="https://i.pinimg.com/736x/7a/51/6d/7a516dd17eca3968d12a22da149754b3.jpg" alt="City" />
            <h5>Vibrant Cities</h5>
            <p>Experience culture, food, and nightlife in top cities.</p>
          </div>
        </div>
      </section>

      {/* Optional Footer / CTA */}
      <footer className="text-center text-white mt-auto py-3" id="contact">
        <p>Join us and start your adventure today! | Contact: info@travelflix.com</p>
      </footer>
    </div>
  );
};

export default Landingpage;
