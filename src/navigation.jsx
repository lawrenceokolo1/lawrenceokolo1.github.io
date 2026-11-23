import { useEffect } from "react";

const key = () => `scroll:${window.location.pathname}`;

/**
 * Pages are full page loads, so the browser can lose your place when you press Back
 * (especially in dev, where content renders after load). Remember each page's scroll
 * position and put it back when the visitor returns with Back/Forward.
 */
export function useScrollMemory() {
  useEffect(() => {
    const save = () => sessionStorage.setItem(key(), String(window.scrollY));
    const [nav] = performance.getEntriesByType("navigation");
    const saved = sessionStorage.getItem(key());
    if (nav?.type === "back_forward" && saved !== null) {
      requestAnimationFrame(() => window.scrollTo({ top: Number(saved), behavior: "instant" }));
    }
    window.addEventListener("pagehide", save);
    return () => window.removeEventListener("pagehide", save);
  }, []);
}

/** "← Back" link: returns to the previous page on this site, or the homepage when arriving from elsewhere. */
export function BackLink({ fallback = "/", label = "Back" }) {
  const onClick = (e) => {
    const fromThisSite = document.referrer.startsWith(window.location.origin);
    if (fromThisSite && window.history.length > 1) {
      e.preventDefault();
      window.history.back();
    }
  };
  return (
    <a href={fallback} className="back-link" onClick={onClick}>
      <span aria-hidden>←</span> {label}
    </a>
  );
}
