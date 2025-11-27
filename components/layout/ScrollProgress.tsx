"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const ScrollProgress = () => {
  const [scrollPercentage, setScrollPercentage] = useState(0);
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();

  // Track scroll progress
  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollTop = window.scrollY;
          const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
          const progress = Math.min((scrollTop / documentHeight) * 100, 100);
          setScrollPercentage(progress);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle Page Load Progress with smoother animation
  useEffect(() => {
    setLoading(true);
    setScrollPercentage(0);
    
    // Simulate loading progress
    const loadingSteps = [15, 45, 75, 90, 100];
    const timings = [100, 200, 150, 100, 200];
    
    loadingSteps.forEach((step, index) => {
      setTimeout(() => {
        setScrollPercentage(step);
      }, timings.slice(0, index + 1).reduce((a, b) => a + b, 0));
    });

    setTimeout(() => {
      setLoading(false);
      // Don't reset to 0 immediately, let scroll position take over
      const scrollTop = window.scrollY;
      const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
      const actualProgress = documentHeight > 0 ? (scrollTop / documentHeight) * 100 : 0;
      setScrollPercentage(actualProgress);
    }, 1000);
  }, [pathname]);

  return (
    <>
      {/* Main progress bar */}
      <div
        className={`fixed top-0 left-0 w-full h-1 z-[9999] transition-opacity duration-300 ${
          scrollPercentage === 0 && !loading ? "opacity-0" : "opacity-100"
        }`}
        style={{
          background: 'linear-gradient(90deg, hsl(var(--muted)) 0%, hsl(var(--muted)) 100%)',
        }}
      >
        {/* Animated progress fill */}
        <div
          className="h-full relative overflow-hidden"
          style={{
            width: `${scrollPercentage}%`,
            background: loading 
              ? 'linear-gradient(90deg, hsl(var(--primary)) 0%, hsl(var(--primary)/0.8) 50%, hsl(var(--primary)) 100%)'
              : 'linear-gradient(90deg, hsl(var(--primary)) 0%, hsl(var(--primary)/0.9) 100%)',
            transition: loading 
              ? 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1)' 
              : 'width 0.1s ease-out',
          }}
        >
          {/* Shimmer effect during loading */}
          {loading && (
            <div
              className="absolute inset-0 opacity-60"
              style={{
                background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)',
                animation: 'shimmer 1.5s infinite',
              }}
            />
          )}
          
          {/* Glow effect */}
          <div
            className="absolute inset-0 opacity-50 blur-sm"
            style={{
              background: 'linear-gradient(90deg, hsl(var(--primary)/0.6) 0%, hsl(var(--primary)/0.8) 100%)',
            }}
          />
        </div>
        
        {/* Leading edge glow */}
        {scrollPercentage > 0 && (
          <div
            className="absolute top-0 h-full w-4 opacity-75 blur-md"
            style={{
              left: `${Math.max(0, scrollPercentage - 2)}%`,
              background: 'radial-gradient(ellipse, hsl(var(--primary)) 0%, transparent 70%)',
              transition: 'left 0.1s ease-out',
            }}
          />
        )}
      </div>

      {/* Subtle top border accent */}
      <div
        className={`fixed top-1 left-0 w-full h-[1px] z-[9998] transition-opacity duration-300 ${
          scrollPercentage === 0 && !loading ? "opacity-0" : "opacity-30"
        }`}
        style={{
          background: 'linear-gradient(90deg, transparent 0%, hsl(var(--primary)/0.3) 50%, transparent 100%)',
          width: `${scrollPercentage}%`,
          transition: 'width 0.1s ease-out, opacity 0.3s ease-in-out',
        }}
      />

      {/* CSS for shimmer animation */}
      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(400%); }
        }
      `}</style>
    </>
  );
};

export default ScrollProgress;
