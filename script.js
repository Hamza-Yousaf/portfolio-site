const pages = [...document.querySelectorAll(".page-view")];
const navigationLinks = [...document.querySelectorAll(".nav-link, .home-next")];

function showPage(pageId) {
  const activePage = pages.find((page) => page.id === pageId);
  if (!activePage) return;

  pages.forEach((page) => {
    const isActive = page === activePage;
    page.hidden = !isActive;
    page.classList.toggle("is-active", isActive);
  });

  navigationLinks.forEach((link) => {
    const isActive = link.getAttribute("href") === `#${pageId}`;
    link.classList.toggle("is-active", isActive);

    if (link.classList.contains("nav-link") && isActive) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  });

  window.scrollTo(0, 0);
}

navigationLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    const pageId = link.getAttribute("href").slice(1);
    if (!pages.some((page) => page.id === pageId)) return;

    event.preventDefault();
    if (window.location.hash !== link.getAttribute("href")) {
      window.history.pushState(null, "", link.getAttribute("href"));
    }
    showPage(pageId);
  });
});

window.addEventListener("popstate", () => {
  showPage(window.location.hash.slice(1) || "home");
});

const initialPageId = window.location.hash.slice(1);
showPage(pages.some((page) => page.id === initialPageId) ? initialPageId : "home");

const resumeFullscreenButton = document.querySelector("[data-resume-fullscreen]");
const resumePreview = document.querySelector("#resume-preview");
const resumeStatus = document.querySelector("[data-resume-status]");

if (resumeFullscreenButton && resumePreview && resumeStatus) {
  resumeFullscreenButton.addEventListener("click", async () => {
    try {
      if (document.fullscreenElement === resumePreview) {
        await document.exitFullscreen();
      } else {
        await resumePreview.requestFullscreen();
      }
    } catch (error) {
      console.error("Could not toggle resume fullscreen.", error);
      resumeStatus.textContent = "Fullscreen is not available in this browser.";
    }
  });

  document.addEventListener("fullscreenchange", () => {
    resumeFullscreenButton.textContent =
      document.fullscreenElement === resumePreview ? "Exit fullscreen" : "Fullscreen";
    resumeStatus.textContent = "";
  });
}
