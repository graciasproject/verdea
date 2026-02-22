"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;
    if (!cursor || !follower) return;

    // Use quickTo for performant cursor tracking
    const xTo = gsap.quickTo(cursor, "x", { duration: 0.1, ease: "power3" });
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.1, ease: "power3" });
    const followerXTo = gsap.quickTo(follower, "x", { duration: 0.3, ease: "power3" });
    const followerYTo = gsap.quickTo(follower, "y", { duration: 0.3, ease: "power3" });

    const moveCursor = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
      followerXTo(e.clientX);
      followerYTo(e.clientY);
    };

    window.addEventListener("mousemove", moveCursor);

    // Add scale effect on hoverable elements
    const handleHoverEnter = () => {
      gsap.to(cursor, { scale: 0, duration: 0.2 });
      gsap.to(follower, {
        scale: 1.5,
        backgroundColor: "rgba(198, 167, 94, 0.2)", // Verdea Gold translucent
        border: "1px solid rgba(198, 167, 94, 1)",
        duration: 0.3,
      });
    };

    const handleHoverLeave = () => {
      gsap.to(cursor, { scale: 1, duration: 0.2 });
      gsap.to(follower, {
        scale: 1,
        backgroundColor: "transparent",
        border: "1px solid rgba(28, 28, 28, 0.5)", // Dark border
        duration: 0.3,
      });
    };

    // Attach listeners to interactive elements
    const interactiveElements = document.querySelectorAll("a, button, input, select, textarea, .interactive-hover");
    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", handleHoverEnter);
      el.addEventListener("mouseleave", handleHoverLeave);
    });

    // Cleanup
    return () => {
      window.removeEventListener("mousemove", moveCursor);
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleHoverEnter);
        el.removeEventListener("mouseleave", handleHoverLeave);
      });
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-2 h-2 bg-verdea-gold rounded-full pointer-events-none z-[9999] mix-blend-difference hidden md:block"
        style={{ transform: "translate(-50%, -50%)" }}
      />
      <div
        ref={followerRef}
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-verdea-dark/50 pointer-events-none z-[9998] transition-colors hidden md:block"
        style={{ transform: "translate(-50%, -50%)" }}
      />
    </>
  );
}
