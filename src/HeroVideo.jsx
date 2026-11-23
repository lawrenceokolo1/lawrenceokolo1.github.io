import { useEffect, useRef } from "react";

/** Muted looping background clip for the hero; visitors who prefer reduced motion get the still poster. */
export default function HeroVideo() {
  const ref = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) ref.current.pause();
  }, []);

  return (
    <div className="hero__media" aria-hidden="true">
      <video ref={ref} autoPlay muted loop playsInline preload="auto" poster="/img/hero-poster.webp">
        <source src="/video/hero.webm" type="video/webm" />
        <source src="/video/hero.mp4" type="video/mp4" />
      </video>
      <div className="hero__shade" />
    </div>
  );
}
