const navigationLinks = [...document.querySelectorAll(".nav-link")];
const observedSections = navigationLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

const sectionObserver = new IntersectionObserver(
  (entries) => {
    const visibleSection = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

    if (!visibleSection) return;

    navigationLinks.forEach((link) => {
      const isActive = link.getAttribute("href") === `#${visibleSection.target.id}`;
      link.classList.toggle("is-active", isActive);
      if (isActive) {
        link.setAttribute("aria-current", "location");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  },
  {
    rootMargin: "-20% 0px -55% 0px",
    threshold: [0, 0.25, 0.5],
  },
);

observedSections.forEach((section) => sectionObserver.observe(section));
