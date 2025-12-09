// ---- Dynamic year ----
    document.getElementById("year").textContent = new Date().getFullYear();

    // ---- Blog data (EDIT THIS ONLY) ----
    // Add / remove posts here. Only previews + Medium links, NOT full content.
            const blogPosts = [

    ];

    function renderBlogs(filter = "all") {
      const container = document.getElementById("blog-list");
      container.innerHTML = "";

      const filtered = blogPosts.filter(post =>
        filter === "all" ? true : post.tag === filter
      );

      filtered.forEach(post => {
        const card = document.createElement("article");
        card.className = "card";

        card.innerHTML = `
          <div class="card-tag-row">
            <span class="card-tag">${post.tag}</span>
            ${post.highlight ? '<span class="card-badge">Top pick</span>' : ""}
          </div>
          <h3 class="card-title">${post.title}</h3>
          <p class="card-excerpt">${post.preview}</p>
          <div class="card-meta">
            <span>${post.date}</span>
            <span class="dot"></span>
            <span>${post.readTime}</span>
          </div>
          <div class="card-actions">
            <a href="${post.url}" target="_blank" rel="noopener">
              🔗 Read on Medium
            </a>
            <span>Opens on Medium (login may be required).</span>
          </div>
        `;

        container.appendChild(card);
      });
    }

    // Initial render
    renderBlogs("all");

    // Filter buttons
    const filterContainer = document.getElementById("blog-filters");
    filterContainer.addEventListener("click", (e) => {
      if (e.target.tagName.toLowerCase() === "button") {
        const filter = e.target.getAttribute("data-filter");
        filterContainer.querySelectorAll("button").forEach(btn => btn.classList.remove("active"));
        e.target.classList.add("active");
        renderBlogs(filter === "all" ? "all" : filter);
      }
    });
