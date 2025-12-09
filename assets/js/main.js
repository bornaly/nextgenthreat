// main.js – NextGen Threat front-end logic
// Handles: dynamic year, blog card pagination, filters, and Load 8 more posts

(function () {
  "use strict";

  const yearSpan = document.getElementById("year");
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();

  const POSTS_PER_PAGE = 8;
  let visibleCount = POSTS_PER_PAGE;
  let activeFilter = "all";

  const blogContainer = document.getElementById("blog-list");
  const loadMoreBtn = document.getElementById("load-more");
  const filterButtons = document.querySelectorAll("#blog-filters button");

  if (!blogContainer) return;

  const allCards = Array.from(blogContainer.querySelectorAll(".blog-card"));

  const posts = allCards.map((card) => {
    let tag = card.getAttribute("data-tag") || "";
    if (!tag) {
      const badge = card.querySelector(".blog-card-badge");
      if (badge) tag = badge.textContent.trim();
    }
    const lower = tag.toLowerCase();
    if (lower.includes("linux")) tag = "Linux";
    else if (lower.includes("windows")) tag = "Windows";
    else if (lower.includes("automation")) tag = "Automation";
    else if (!tag) tag = "Security";
    return { tag, card };
  });

  function getFiltered() {
    if (activeFilter === "all") return posts;
    return posts.filter((p) => p.tag === activeFilter);
  }

  function render() {
    const filtered = getFiltered();
    const toShow = filtered.slice(0, visibleCount);

    blogContainer.innerHTML = "";
    toShow.forEach((p) => blogContainer.appendChild(p.card));

    if (loadMoreBtn) {
      loadMoreBtn.style.display = visibleCount >= filtered.length ? "none" : "inline-flex";
    }
  }

  function setFilter(value) {
    activeFilter = value;
    visibleCount = POSTS_PER_PAGE;
    render();
    filterButtons.forEach((btn) => {
      const val = btn.getAttribute("data-filter") || "all";
      btn.classList.toggle("active", val === value);
    });
  }

  function initFilters() {
    filterButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        setFilter(btn.getAttribute("data-filter") || "all");
      });
    });
  }

  function initLoadMore() {
    if (!loadMoreBtn) return;
    loadMoreBtn.addEventListener("click", () => {
      visibleCount += POSTS_PER_PAGE;
      render();
    });
  }

  function init() {
    initFilters();
    initLoadMore();
    setFilter("all");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
