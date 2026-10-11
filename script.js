(function () {
  const site = window.SITE;
  // [ink, light tint] pairs used for duotone prints. Cards use a project's
  // `color` if set, otherwise they cycle through these in order.
  const tones = {
    blue: ["var(--blue)", "color-mix(in srgb, var(--blue) 18%, var(--paper))"],
    red: ["var(--red)", "var(--pink)"],
    green: ["var(--green)", "color-mix(in srgb, var(--green) 20%, var(--paper))"],
  };
  const toneCycle = Object.values(tones);
  const $ = (id) => document.getElementById(id);
  const el = (tag, props = {}, children = []) => {
    const node = Object.assign(document.createElement(tag), props);
    for (const child of [].concat(children)) node.append(child);
    return node;
  };
  const print = (image, alt, word, tone) => {
    const fig = el("div", { className: "duotone" + (image ? "" : " placeholder") },
      image
        ? el("img", { src: image, alt, loading: "lazy" })
        : el("span", { className: "placeholder-word", textContent: word, ariaHidden: "true" })
    );
    if (!image) fig.style.setProperty("--chars", word.length);
    fig.style.setProperty("--tone", tone[0]);
    fig.style.setProperty("--tone-light", tone[1]);
    return fig;
  };

  // ---------- Basic text ----------
  const [first, ...rest] = site.name.split(" ");
  document.title = site.name;
  $("logo").textContent = site.name;
  $("name-first").textContent = first;
  $("name-last").textContent = rest.join(" ");
  $("tagline").textContent = site.tagline;
  $("location").textContent = site.location || "";
  $("status").textContent = site.status || "";
  $("year").textContent = new Date().getFullYear();
  $("footer-text").textContent = `© ${new Date().getFullYear()} ${site.name}`;
  $("note").textContent = site.note || "";

  // ---------- Hero photo ----------
  const hero = $("hero-photo");
  if (site.photo) {
    hero.append(el("img", { src: site.photo, alt: site.name }));
  } else {
    hero.classList.add("placeholder");
  }

  // ---------- Rotating role word ----------
  const roleEl = $("role-word");
  let roleIndex = 0;
  const showRole = () => {
    roleEl.textContent = site.roles[roleIndex % site.roles.length];
    roleEl.classList.remove("swap");
    void roleEl.offsetWidth; // restart the animation
    roleEl.classList.add("swap");
    roleIndex++;
  };
  showRole();
  if (site.roles.length > 1 && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
    setInterval(showRole, 2600);
  }

  // ---------- Socials ----------
  site.socials.forEach((s) => {
    const link = el("a", { className: "scribble", href: s.url, textContent: s.label + " ↗" });
    if (!s.url.startsWith("mailto:")) Object.assign(link, { target: "_blank", rel: "noopener" });
    $("socials").append(el("li", {}, link));
  });

  // ---------- Projects + filters ----------
  const grid = $("projects");
  const renderProjects = (filter) => {
    grid.replaceChildren();
    site.projects
      .map((p, i) => ({ ...p, tone: tones[p.color] || toneCycle[i % toneCycle.length] }))
      .filter((p) => filter === "All" || p.category === filter)
      .forEach((p, i) => {
        const card = el("a", { className: "card", href: p.url || "#", target: "_blank", rel: "noopener" }, [
          el("div", { className: "frame" }, [el("span", { className: "tape" }), print(p.image, p.title, p.label || p.category, p.tone)]),
          el("div", { className: "card-meta mono" }, [
            el("span", { textContent: p.category }),
            el("span", { textContent: p.year || "" }),
          ]),
          el("h3", { textContent: p.title }),
          el("p", { textContent: p.description }),
          el("span", { className: "card-cta mono scribble", textContent: "View project →" }),
        ]);
        card.style.animationDelay = `${i * 60}ms`;
        grid.append(card);
      });
  };

  const categories = ["All", ...new Set(site.projects.map((p) => p.category))];
  const filters = $("filters");
  categories.forEach((cat) => {
    const btn = el("button", { type: "button", className: "scribble", textContent: cat });
    btn.setAttribute("aria-pressed", cat === "All");
    btn.addEventListener("click", () => {
      filters.querySelectorAll("button").forEach((b) => b.setAttribute("aria-pressed", b === btn));
      renderProjects(cat);
    });
    filters.append(btn);
  });
  if (!site.showFilters || categories.length <= 2) filters.hidden = true;
  renderProjects("All");

  // ---------- About + resume + contact ----------
  site.about.forEach((text) => $("about-body").append(el("p", { textContent: text })));
  if (site.resumeUrl) {
    $("resume-link").href = site.resumeUrl;
    $("resume-text").textContent = site.resumeText || "";
  } else {
    $("resume").hidden = true;
    document.querySelector('a[href="#resume"]').hidden = true;
  }
  $("contact-link").href = "mailto:" + site.contactEmail;

  // ---------- Theme toggle ----------
  const root = document.documentElement;
  try {
    const saved = localStorage.getItem("theme");
    if (saved) root.dataset.theme = saved;
  } catch (e) {}
  $("theme-toggle").addEventListener("click", () => {
    const isDark = root.dataset.theme
      ? root.dataset.theme === "dark"
      : matchMedia("(prefers-color-scheme: dark)").matches;
    root.dataset.theme = isDark ? "light" : "dark";
    try { localStorage.setItem("theme", root.dataset.theme); } catch (e) {}
  });
})();
