import React, { useEffect, useRef } from "react";
import bouquetImage from "../assets/bouquet_homepage.jpeg";

interface HomeProps {
  setCurrentPage?: (page: string) => void;
}

const Home: React.FC<HomeProps> = ({ setCurrentPage }) => {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    setTimeout(() => el.classList.add("loaded"), 50);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Jost:wght@200;300;400&display=swap');

        :root {
          --cream: #faf6f1;
          --blush: #e8c4b0;
          --rose: #c4786a;
          --deep: #3a2218;
          --sage: #8a9e8a;
        }

        .hero-root {
          font-family: 'Jost', sans-serif;
          min-height: 100vh;
          background: var(--cream);
          overflow: hidden;
          position: relative;
        }

        /* ── NOISE OVERLAY ── */
        .hero-root::before {
          content: '';
          position: fixed;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
          pointer-events: none;
          z-index: 100;
          opacity: 0.4;
        }

        /* ── HERO ── */
        .hero-wrap {
          display: grid;
          grid-template-columns: 1fr 1fr;
          min-height: 100vh;
          position: relative;
        }

        @media (max-width: 768px) {
          .hero-wrap { grid-template-columns: 1fr; }
          .hero-image-col { min-height: 50vh; order: -1; }
          .hero-text-col { padding: 3rem 2rem 4rem; }
          .hero-title { font-size: clamp(3rem, 12vw, 5rem) !important; }
        }

        /* ── IMAGE COLUMN ── */
        .hero-image-col {
          position: relative;
          overflow: hidden;
        }

        .hero-image-col img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          transform: scale(1.08);
          transition: transform 1.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .loaded .hero-image-col img {
          transform: scale(1);
        }

        .hero-image-col::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(
            105deg,
            transparent 40%,
            rgba(250, 246, 241, 0.6) 70%,
            var(--cream) 100%
          );
        }

        /* decorative arch frame */
        .arch-frame {
          position: absolute;
          inset: 2rem;
          border: 1px solid rgba(196, 120, 106, 0.25);
          border-radius: 60% 60% 50% 50% / 40% 40% 60% 60%;
          z-index: 2;
          pointer-events: none;
          opacity: 0;
          transition: opacity 1.2s ease 0.6s;
        }

        .loaded .arch-frame { opacity: 1; }

        /* ── TEXT COLUMN ── */
        .hero-text-col {
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 5rem 5rem 5rem 4rem;
          position: relative;
          z-index: 2;
        }

        .eyebrow {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-family: 'Jost', sans-serif;
          font-size: 0.7rem;
          font-weight: 300;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: var(--rose);
          margin-bottom: 2rem;
          opacity: 0;
          transform: translateY(16px);
          transition: opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s;
        }

        .loaded .eyebrow { opacity: 1; transform: none; }

        .eyebrow-line {
          flex: 0 0 40px;
          height: 1px;
          background: var(--rose);
        }

        .hero-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(4rem, 7vw, 6.5rem);
          font-weight: 300;
          line-height: 1.05;
          color: var(--deep);
          margin: 0 0 2.5rem;
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.9s ease 0.4s, transform 0.9s ease 0.4s;
        }

        .loaded .hero-title { opacity: 1; transform: none; }

        .hero-title em {
          font-style: italic;
          color: var(--rose);
          display: block;
        }

        .hero-desc {
          font-family: 'Jost', sans-serif;
          font-size: 0.95rem;
          font-weight: 200;
          line-height: 1.85;
          color: #7a6a60;
          max-width: 360px;
          margin-bottom: 3.5rem;
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.8s ease 0.6s, transform 0.8s ease 0.6s;
        }

        .loaded .hero-desc { opacity: 1; transform: none; }

        /* ── BUTTONS ── */
        .btn-group {
          display: flex;
          gap: 1.25rem;
          align-items: center;
          flex-wrap: wrap;
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.8s ease 0.8s, transform 0.8s ease 0.8s;
        }

        .loaded .btn-group { opacity: 1; transform: none; }

        .btn-primary {
          padding: 1rem 2.5rem;
          background: var(--deep);
          color: var(--cream);
          font-family: 'Jost', sans-serif;
          font-size: 0.75rem;
          font-weight: 300;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          border: none;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .btn-primary::before {
          content: '';
          position: absolute;
          inset: 0;
          background: var(--rose);
          transform: translateX(-100%);
          transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .btn-primary:hover::before { transform: translateX(0); }
        .btn-primary:hover { box-shadow: 0 8px 32px rgba(58, 34, 24, 0.25); transform: translateY(-2px); }

        .btn-primary span { position: relative; z-index: 1; }

        .btn-ghost {
          padding: 1rem 2.5rem;
          background: transparent;
          color: var(--deep);
          font-family: 'Jost', sans-serif;
          font-size: 0.75rem;
          font-weight: 300;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          border: 1px solid rgba(58, 34, 24, 0.3);
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .btn-ghost:hover {
          border-color: var(--rose);
          color: var(--rose);
          transform: translateY(-2px);
        }

        /* ── FLOATING STATS ── */
        .stat-card {
          position: absolute;
          background: rgba(250, 246, 241, 0.9);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(196, 120, 106, 0.2);
          padding: 1.25rem 1.75rem;
          z-index: 5;
          opacity: 0;
          transition: opacity 0.8s ease, transform 0.8s ease;
        }

        .stat-card.card-1 {
          bottom: 12%;
          left: 4%;
          transform: translateY(20px);
          transition-delay: 1s;
        }

        .stat-card.card-2 {
          top: 15%;
          right: 2%;
          transform: translateY(-20px);
          transition-delay: 1.2s;
        }

        .loaded .stat-card { opacity: 1; transform: none; }

        .stat-number {
          font-family: 'Cormorant Garamond', serif;
          font-size: 2rem;
          font-weight: 300;
          color: var(--rose);
          line-height: 1;
          display: block;
        }

        .stat-label {
          font-size: 0.65rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #9a8a80;
          font-weight: 300;
          display: block;
          margin-top: 0.25rem;
        }

        /* ── VERTICAL TEXT ── */
        .vert-text {
          position: absolute;
          left: -0.5rem;
          top: 50%;
          transform: translateY(-50%) rotate(-90deg);
          font-size: 0.6rem;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: var(--sage);
          font-weight: 200;
          white-space: nowrap;
          opacity: 0;
          transition: opacity 1s ease 1.4s;
        }

        .loaded .vert-text { opacity: 1; }

        /* ── SCROLL CUE ── */
        .scroll-cue {
          position: absolute;
          bottom: 2.5rem;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          opacity: 0;
          transition: opacity 0.8s ease 1.6s;
          z-index: 5;
        }

        .loaded .scroll-cue { opacity: 1; }

        .scroll-cue-line {
          width: 1px;
          height: 48px;
          background: linear-gradient(to bottom, var(--rose), transparent);
          animation: scrollPulse 2s ease-in-out infinite;
        }

        @keyframes scrollPulse {
          0%, 100% { opacity: 0.3; transform: scaleY(1); }
          50% { opacity: 1; transform: scaleY(1.15); }
        }

        .scroll-cue span {
          font-size: 0.6rem;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: var(--rose);
          font-weight: 300;
        }

        /* ── BACKGROUND DECORATIVE CIRCLES ── */
        .deco-circle {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
        }

        .deco-circle-1 {
          width: 400px;
          height: 400px;
          border: 1px solid rgba(196, 120, 106, 0.08);
          top: -100px;
          right: 45%;
          z-index: 1;
        }

        .deco-circle-2 {
          width: 200px;
          height: 200px;
          border: 1px solid rgba(138, 158, 138, 0.12);
          bottom: 80px;
          right: 6%;
          z-index: 1;
        }
      `}</style>

      <div className="hero-root" ref={heroRef}>
        {/* Decorative background shapes */}
        <div className="deco-circle deco-circle-1"></div>
        <div className="deco-circle deco-circle-2"></div>

        <div className="hero-wrap">
          {/* ── IMAGE COLUMN ── */}
          <div className="hero-image-col">
            <img src={bouquetImage} alt="Handcrafted Bouquet" />
            <div className="arch-frame"></div>

            {/* Stat cards overlaid on image */}
            <div className="stat-card card-1">
              <span className="stat-number">500+</span>
              <span className="stat-label">Arrangements made</span>
            </div>
          </div>

          {/* ── TEXT COLUMN ── */}
          <div className="hero-text-col">
            <div className="vert-text">Est. in love · Crafted by hand</div>

            <p className="eyebrow">
              <span className="eyebrow-line"></span>
              Floral Atelier
            </p>

            <h1 className="hero-title">
              Where flowers
              <em>speak</em>
            </h1>

            <p className="hero-desc">
              Each bouquet is a handcrafted story — blooms chosen with
              intention, arranged with care, delivered to say what words cannot.
            </p>

            <div className="btn-group">
              <button
                className="btn-primary"
                onClick={() => setCurrentPage?.("catalogues")}
              >
                <span>View Collection</span>
              </button>
              <button
                className="btn-ghost"
                onClick={() => setCurrentPage?.("contact")}
              >
                Contact Us
              </button>
            </div>
          </div>
        </div>

        {/* Scroll cue */}
        <div className="scroll-cue">
          <span>Scroll</span>
          <div className="scroll-cue-line"></div>
        </div>
      </div>
    </>
  );
};

export default Home;
