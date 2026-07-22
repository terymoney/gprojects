import { useEffect, useRef, useState } from "react";

type WebsiteStatistic = {
  value: number;
  suffix: string;
  label: string;
};

// Hardcoded for now; replace this array with GProjects CMS data when the CMS is ready.
const websiteStatistics: WebsiteStatistic[] = [
  {
    value: 100,
    suffix: "+",
    label: "Happy Clients",
  },
  {
    value: 112,
    suffix: "+",
    label: "Successful Home Care",
  },
  {
    value: 35,
    suffix: "+",
    label: "Corporate Social Responsibility",
  },
];

function AnimatedCounter({
  value,
  suffix,
  label,
  shouldAnimate,
  skipAnimation,
  duration = 1200,
}: WebsiteStatistic & {
  shouldAnimate: boolean;
  skipAnimation: boolean;
  duration?: number;
}) {
  const [displayValue, setDisplayValue] = useState(skipAnimation ? value : 0);
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    if (skipAnimation) {
      const skipTimer = window.setTimeout(() => setDisplayValue(value), 0);
      hasAnimatedRef.current = true;
      return () => window.clearTimeout(skipTimer);
    }

    if (!shouldAnimate || hasAnimatedRef.current) {
      return;
    }

    hasAnimatedRef.current = true;
    let animationFrame = 0;
    let startTime = 0;

    const animate = (timestamp: number) => {
      if (!startTime) {
        startTime = timestamp;
      }

      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(Math.round(value * easedProgress));

      if (progress < 1) {
        animationFrame = window.requestAnimationFrame(animate);
      } else {
        setDisplayValue(value);
      }
    };

    animationFrame = window.requestAnimationFrame(animate);

    return () => {
      window.cancelAnimationFrame(animationFrame);
    };
  }, [duration, shouldAnimate, skipAnimation, value]);

  return (
    <article className="website-stat-item" aria-label={`${value} plus ${label}`}>
      <strong aria-hidden="true">
        {displayValue}
        {suffix}
      </strong>
      <span>{label}</span>
    </article>
  );
}

export default function WebsiteStatsSection() {
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const [skipAnimation, setSkipAnimation] = useState(false);
  const statsGridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
      const fallbackTimer = window.setTimeout(() => {
        setSkipAnimation(true);
        setShouldAnimate(true);
      }, 0);
      return () => window.clearTimeout(fallbackTimer);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry?.isIntersecting) {
          setShouldAnimate(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.35 },
    );

    if (statsGridRef.current) {
      observer.observe(statsGridRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section id="gprojects-stats" className="section website-stats-section">
      <div className="container">
        <div className="website-stats-panel">
          <header className="website-stats-heading scroll-reveal">
            <span className="eyebrow eyebrow--mint">Our Impact</span>
            <h2>GProjects at a Glance</h2>
            <p>A growing record of service, project support and social responsibility.</p>
          </header>

          <div className="website-stats-grid reveal-pop" ref={statsGridRef}>
            {websiteStatistics.map((statistic) => (
              <AnimatedCounter
                key={statistic.label}
                {...statistic}
                shouldAnimate={shouldAnimate}
                skipAnimation={skipAnimation}
                duration={1400}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
