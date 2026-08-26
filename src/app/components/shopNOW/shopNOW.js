"use client";

// --- Component ---
import * as React from "react";
import { useRouter } from "next/navigation";

const PROJECT_DATA = [
  {
    title: "Stowave",
    image: "/fullLogo.jpg",
    category: "Collection",
    year: "2025",
    description: "Explore the Stowave collection",
    buttonText: "Explore Collection",
    link: "/collections/stowave",
    isExternal: false,
  },
  {
    title: "Ezzywalk",
    image: "/ezzywalkCollection.jpeg",
    category: "Collection",
    year: "2025",
    description: "Explore the Ezzywalk collection",
    buttonText: "Explore Collection",
    link: "/collections/ezzywalk",
    isExternal: false,
  },
  {
    title: "Stowave Product",
    image: "/stowaveCollection.jpeg",
    category: "Product",
    year: "2025",
    description: "Len Bass",
    buttonText: "Shop Now",
    link: "https://www.stowave.com/products/len-bass",
    isExternal: true,
  },
  {
    title: "Ezzywalk Product",
    image: "/ezzywalkCollection.jpeg",
    category: "Product",
    year: "2025",
    description: "Ultra Cushioned Comfort Slides",
    buttonText: "Shop Now",
    link: "https://www.stowave.com/products/chawla-men-s-ultra-cushioned-comfort-slides-sleek-matte-black",
    isExternal: true,
  },
];

const CONFIG = {
  SCROLL_SPEED: 0.75,
  LERP_FACTOR: 0.05,
  BUFFER_SIZE: 5,
  MAX_VELOCITY: 150,
  SNAP_DURATION: 500,
};

// Utility functions
const lerp = (start, end, factor) => start + (end - start) * factor;

const getProjectData = (index) => {
  const i =
    ((Math.abs(index) % PROJECT_DATA.length) + PROJECT_DATA.length) %
    PROJECT_DATA.length;
  return PROJECT_DATA[i];
};

const getProjectNumber = (index) => {
  return (
    ((Math.abs(index) % PROJECT_DATA.length) + PROJECT_DATA.length) %
      PROJECT_DATA.length +
    1
  )
    .toString()
    .padStart(2, "0");
};

export function Component() {
  const router = useRouter();

  const [visibleRange, setVisibleRange] = React.useState({
    min: -CONFIG.BUFFER_SIZE,
    max: CONFIG.BUFFER_SIZE,
  });

  // Refs for state that changes frequently (animation loop)
  const state = React.useRef({
    currentY: 0,
    targetY: 0,
    isDragging: false,
    isSnapping: false,
    snapStart: { time: 0, y: 0, target: 0 },
    lastScrollTime: Date.now(),
    dragStart: { y: 0, scrollY: 0 },
    projectHeight: 0, // Will be set on mount
    minimapHeight: 250, // Fixed height from CSS
  });

  // Refs to store DOM elements
  const projectsRef = React.useRef(new Map());
  const minimapRef = React.useRef(new Map());
  const infoRef = React.useRef(new Map());
  const requestRef = React.useRef();

  // Handle navigation for collection / product buttons
  const handleNavigate = (data, e) => {
    e.stopPropagation();
    if (data.isExternal) {
      window.open(data.link, "_self");
    } else {
      router.push(data.link);
    }
  };

  // Helper to update parallax for a single item
  const updateParallax = (img, scroll, index, height) => {
    if (!img) return;
    // We can store 'current' parallax value on the element dataset or a separate map if we want smooth lerping
    // for the image inside the container as well.
    // The original code did: `current = lerp(current, target, 0.1)` inside a closure.
    // To keep it simple and stateless for the image inner lerp, we might just calculate it directly
    // or use a separate map for image states if strictly needed.
    // Let's try direct calculation first, or use a weakmap/map for image states.

    // Actually, let's implement the closure-like behavior by storing image states
    if (!img.dataset.parallaxCurrent) {
      img.dataset.parallaxCurrent = "0";
    }

    let current = parseFloat(img.dataset.parallaxCurrent);
    const target = (-scroll - index * height) * 0.2;
    current = lerp(current, target, 0.1);

    // Optimization: only update if changed significantly
    if (Math.abs(current - target) > 0.01) {
      img.style.transform = `translateY(${current}px) scale(1.5)`;
      img.dataset.parallaxCurrent = current.toString();
    }
  };

  const updateSnap = () => {
    const s = state.current;
    const progress = Math.min(
      (Date.now() - s.snapStart.time) / CONFIG.SNAP_DURATION,
      1
    );
    const eased = 1 - Math.pow(1 - progress, 3);
    s.targetY =
      s.snapStart.y + (s.snapStart.target - s.snapStart.y) * eased;
    if (progress >= 1) s.isSnapping = false;
  };

  const snapToProject = () => {
    const s = state.current;
    const current = Math.round(-s.targetY / s.projectHeight);
    const target = -current * s.projectHeight;
    s.isSnapping = true;
    s.snapStart = {
      time: Date.now(),
      y: s.targetY,
      target: target,
    };
  };

  const updatePositions = () => {
    const s = state.current;
    const minimapY = (s.currentY * s.minimapHeight) / s.projectHeight;

    // Update Projects
    projectsRef.current.forEach((el, index) => {
      const y = index * s.projectHeight + s.currentY;
      el.style.transform = `translateY(${y}px)`;
      const img = el.querySelector("img");
      updateParallax(img, s.currentY, index, s.projectHeight);
    });

    // Update Minimap Images
    minimapRef.current.forEach((el, index) => {
      const y = index * s.minimapHeight + minimapY;
      el.style.transform = `translateY(${y}px)`;
      const img = el.querySelector("img");
      if (img) {
        // Minimap parallax uses minimapHeight
        updateParallax(img, minimapY, index, s.minimapHeight);
      }
    });

    // Update Info
    infoRef.current.forEach((el, index) => {
      const y = index * s.minimapHeight + minimapY;
      el.style.transform = `translateY(${y}px)`;
    });
  };

  const animate = () => {
    const s = state.current;
    const now = Date.now();

    if (!s.isSnapping && !s.isDragging && now - s.lastScrollTime > 100) {
      const snapPoint =
        -Math.round(-s.targetY / s.projectHeight) * s.projectHeight;
      if (Math.abs(s.targetY - snapPoint) > 1) snapToProject();
    }

    if (s.isSnapping) updateSnap();
    if (!s.isDragging) {
      s.currentY += (s.targetY - s.currentY) * CONFIG.LERP_FACTOR;
    }

    updatePositions();
  };

  const renderedRange = React.useRef({
    min: -CONFIG.BUFFER_SIZE,
    max: CONFIG.BUFFER_SIZE,
  });

  const animationLoop = () => {
    animate();

    const s = state.current;
    const currentIndex = Math.round(-s.targetY / s.projectHeight);
    const min = currentIndex - CONFIG.BUFFER_SIZE;
    const max = currentIndex + CONFIG.BUFFER_SIZE;

    if (
      min !== renderedRange.current.min ||
      max !== renderedRange.current.max
    ) {
      renderedRange.current = { min, max };
      setVisibleRange({ min, max });
    }

    requestRef.current = requestAnimationFrame(animationLoop);
  };

  const containerElRef = React.useRef(null);

  React.useEffect(() => {
    if (containerElRef.current) {
      state.current.projectHeight = containerElRef.current.offsetHeight;
    }

    const onWheel = (e) => {
      e.preventDefault();
      const s = state.current;
      s.isSnapping = false;
      s.lastScrollTime = Date.now();
      const delta = Math.max(
        Math.min(e.deltaY * CONFIG.SCROLL_SPEED, CONFIG.MAX_VELOCITY),
        -CONFIG.MAX_VELOCITY
      );
      s.targetY -= delta;
    };

    const onTouchStart = (e) => {
      const s = state.current;
      s.isDragging = true;
      s.isSnapping = false;
      s.dragStart = { y: e.touches[0].clientY, scrollY: s.targetY };
      s.lastScrollTime = Date.now();
    };

    const onTouchMove = (e) => {
      const s = state.current;
      if (!s.isDragging) return;
      s.targetY =
        s.dragStart.scrollY + (e.touches[0].clientY - s.dragStart.y) * 1.5;
      s.lastScrollTime = Date.now();
    };

    const onTouchEnd = () => {
      state.current.isDragging = false;
    };

    const onResize = () => {
      state.current.projectHeight = window.innerHeight;
      // Sync container height to match JS logic exactly
      const container = document.querySelector(".parallax-container");
      if (container) {
        container.style.height = `${window.innerHeight}px`;
      }
      // updatePositions is called in loop
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart);
    window.addEventListener("touchmove", onTouchMove);
    window.addEventListener("touchend", onTouchEnd);
    window.addEventListener("resize", onResize);

    // Initial size sync
    onResize();

    // Start Loop
    requestRef.current = requestAnimationFrame(animationLoop);

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("resize", onResize);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, []);

  // Generate range of indices
  const indices = [];
  for (let i = visibleRange.min; i <= visibleRange.max; i++) {
    indices.push(i);
  }

  return (
    <div className="parallax-container">
      <ul className="project-list">
        {indices.map((i) => {
          const data = getProjectData(i);
          return (
            <div
              key={i}
              className="project"
              ref={(el) => {
                if (el) projectsRef.current.set(i, el);
                else projectsRef.current.delete(i);
              }}
            >
              <img src={data.image} alt={data.title} />
              <button
                type="button"
                className="project-cta-button"
                onClick={(e) => handleNavigate(data, e)}
              >
                {data.buttonText}
              </button>
            </div>
          );
        })}
      </ul>

      <div className="minimap">
        <div className="minimap-wrapper">
          <div className="minimap-img-preview">
            {indices.map((i) => {
              const data = getProjectData(i);
              return (
                <div
                  key={i}
                  className="minimap-img-item"
                  ref={(el) => {
                    if (el) minimapRef.current.set(i, el);
                    else minimapRef.current.delete(i);
                  }}
                >
                  <img src={data.image} alt={data.title} />
                </div>
              );
            })}
          </div>
          <div className="minimap-info-list">
            {indices.map((i) => {
              const data = getProjectData(i);
              const num = getProjectNumber(i);
              return (
                <div
                  key={i}
                  className="minimap-item-info"
                  ref={(el) => {
                    if (el) infoRef.current.set(i, el);
                    else infoRef.current.delete(i);
                  }}
                >
                  <div className="minimap-item-info-row">
                    <p>{num}</p>
                    <p>{data.title}</p>
                  </div>
                  <div className="minimap-item-info-row">
                    <p>{data.category}</p>
                    <p>{data.year}</p>
                  </div>
                  <div className="minimap-item-info-row">
                    <p>{data.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

// --- Demo ---
export default function DemoOne() {
  return <Component />;
}