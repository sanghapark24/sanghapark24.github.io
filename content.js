// ============================================================
//  EDIT THIS FILE to change what appears on your site.
//  You shouldn't need to touch index.html, styles.css or script.js.
// ============================================================

window.SITE = {
  name: "Sangha Park",
  // Words that rotate in the middle of the hero: "—— ___ ——"
  roles: ["marketer", "thinker", "explorer"],
  // Short line shown under the hero.
  tagline: "find me somewhere on the internet.",
  location: "seattle",
  status: "open to new projects",

  // Optional photo of you for the hero, e.g. "images/me.jpg".
  // It's printed as a duotone, so any photo looks consistent.
  photo: "images/me.jpg",

  // Social links. Add, remove or reorder freely.
  socials: [
    { label: "Email", url: "mailto:sanghapark24@gmail.com" },
    { label: "LinkedIn", url: "https://www.linkedin.com/in/sanghapark" },
    { label: "Goodreads", url: "https://www.goodreads.com/sangha" },
    { label: "Letterboxd", url: "https://letterboxd.com/sangha" },
    { label: "TikTok", url: "https://www.tiktok.com/@sparkpado" },
  ],

  // Portfolio items. `category` powers the filter buttons.
  // `image` is optional. Put files in the /images folder, e.g. "images/project1.jpg".
  // Images are printed as duotones. Without one, the card shows a halftone block
  // with `label` (or the category, if there's no label) hand-lettered on it.
  // `color` is optional: "blue", "red" or "green".
  // Set to true to show category filter buttons above your projects.
  showFilters: false,
  projects: [
    {
      title: "tiktok mcp",
      category: "professional",
      label: "mcp",
      color: "blue",
      year: "2026",
      description: "launch and gtm of the tiktok for business mcp. first ad platform mcp to be officially listed in claude's connector directory.",
      url: "https://business-api.tiktok.com/portal/docs/tiktok-ads-mcp-server/v1.3",
    },
    {
      title: "tiktok shop app store",
      category: "professional",
      label: "shop",
      color: "red",
      year: "2023-2025",
      description: "expansion of the tiktok shop partner ecosystem. launched new partner categories and partners helping tiktok shop sellers scale their business.",
      url: "https://seller-us.tiktok.com/appstore/us/",
    },
    {
      title: "pinterest business partners",
      category: "professional",
      label: "pinterest",
      color: "green",
      year: "2020-2023",
      description: "management and growth of the pinterest business partner program. launched new partners and scaled ad revenue via partnerships.",
      url: "https://business.pinterest.com/pinterest-business-partners/",
    },
  ],

  // A few sentences about you. Each string becomes its own paragraph.
  about: [
    "hi! I'm sangha. I'm currently a product marketing manager at tiktok. In my free time I am a hobby enthusiast and a patron of the arts (most recently: culinary arts).",
    "got recommendations for a fine-dining restaurant, book, or movie? shoot me a note.",
  ],

  // A handwritten note scribbled next to the About section. Leave "" to hide it.
  note: "",

  // Resume section. Paste your Google Drive share link below.
  // In Drive, set sharing to "Anyone with the link" so visitors can open it.
  resumeUrl: "https://drive.google.com/file/d/1-G5zOogcvi025-6WmQSWpab10YO4B6Tl/view?usp=sharing",
  resumeText: "my work and education history can be found in my resume.",

  contactEmail: "sanghapark24@gmail.com",
};
