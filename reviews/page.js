(function () {
  const site = window.SITE;
  const data = window.REVIEWS;
  const $ = (id) => document.getElementById(id);
  const el = (tag, props = {}, children = []) => {
    const node = Object.assign(document.createElement(tag), props);
    for (const child of [].concat(children)) node.append(child);
    return node;
  };
  const tones = [
    ["var(--blue)", "color-mix(in srgb, var(--blue) 18%, var(--paper))"],
    ["var(--red)", "var(--pink)"],
    ["var(--green)", "color-mix(in srgb, var(--green) 20%, var(--paper))"],
  ];
  const months = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];

  // "2026-09-20" -> parts, without time-zone shifts from Date parsing.
  const parseDate = (str) => {
    const [y, m, d] = String(str).split("-").map(Number);
    return { y, m, d };
  };
  const stars = (rating) => {
    const full = Math.floor(rating);
    const half = rating - full >= 0.5;
    return "★".repeat(full) + (half ? "½" : "") + "☆".repeat(5 - full - (half ? 1 : 0));
  };

  // ---------- Header ----------
  $("logo").textContent = site.name;
  $("intro").textContent = data.intro || "";
  $("year").textContent = new Date().getFullYear();
  const reviews = [...data.reviews].sort((a, b) => String(b.date).localeCompare(String(a.date)));
  $("count").textContent = `${reviews.length} ${reviews.length === 1 ? "place" : "places"}`;

  // ---------- Reviews, grouped by month ----------
  const list = $("reviews");
  let currentMonth = "";
  reviews.forEach((r, i) => {
    const { y, m, d } = parseDate(r.date);
    const monthLabel = `${months[m - 1]} ${y}`;
    if (monthLabel !== currentMonth) {
      currentMonth = monthLabel;
      list.append(el("h2", { className: "month mono", textContent: monthLabel }));
    }

    const tone = tones[i % tones.length];
    const photo = el("div", { className: "duotone review-photo" + (r.image ? " full-color" : " placeholder") },
      r.image
        ? el("img", { src: r.image, alt: r.name, loading: "lazy" })
        : el("span", { className: "placeholder-word", textContent: r.cuisine || r.name, ariaHidden: "true" })
    );
    photo.style.setProperty("--tone", tone[0]);
    photo.style.setProperty("--tone-light", tone[1]);
    if (!r.image) photo.style.setProperty("--chars", (r.cuisine || r.name).length);

    // `michelin: "**"` -> "2 Michelin stars", shown between cuisine and location.
    const starCount = (String(r.michelin || "").match(/\*/g) || []).length;
    const michelin = starCount
      ? el("span", { className: "michelin", textContent: `${starCount} Michelin star${starCount > 1 ? "s" : ""}` })
      : "";
    const meta = [r.cuisine, michelin, r.location].filter(Boolean)
      .flatMap((part, j) => (j ? [" · ", part] : [part]));
    const title = r.link
      ? el("a", { className: "scribble", href: r.link, target: "_blank", rel: "noopener", textContent: r.name })
      : r.name;

    list.append(el("article", { className: "review" }, [
      el("div", { className: "frame" }, [el("span", { className: "tape" }), photo]),
      el("div", { className: "review-body" }, [
        el("div", { className: "card-meta mono" }, [
          el("span", { textContent: `${months[m - 1].slice(0, 3)} ${d}` }),
          r.rating ? el("span", { className: "stars", textContent: stars(r.rating), title: `${r.rating} out of 5` }) : "",
        ]),
        el("h3", {}, title),
        meta.length ? el("p", { className: "review-meta mono" }, meta) : "",
        r.review ? el("p", { className: "review-text", textContent: r.review }) : "",
        r.order ? el("p", { className: "order-note hand", textContent: "order: " + r.order }) : "",
      ]),
    ]));
  });

  if (!reviews.length) {
    list.append(el("p", { className: "tagline", textContent: "No reviews yet. Check back soon." }));
  }

  // ---------- Theme toggle (shared preference with the home page) ----------
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
