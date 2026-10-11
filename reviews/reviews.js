// ============================================================
//  EDIT THIS FILE to add restaurant reviews.
//  Newest reviews are shown first automatically, grouped by month.
// ============================================================

window.REVIEWS = {
  intro: "short reviews of the fine dining restaurants i've been to in 2026.",

  // Copy a { ... } block to add a review. Only `name` and `date` are required.
  //   date:     "YYYY-MM-DD" — the day you visited
  //   rating:   out of 5, halves allowed (e.g. 4.5)
  //   michelin: "*", "**" or "***" for starred restaurants; leave "" otherwise
  //   order:    the dish you'd tell a friend to get (shown as a scribbled note)
  //   image:    put photos in the reviews/images folder, e.g. "images/kitchen.jpg"
  //   link:     optional website, Instagram or Google Maps link
  reviews: [
    {
      name: "Example Restaurant",
      date: "2026-09-20",
      location: "Capitol Hill, Seattle",
      cuisine: "Korean",
      michelin: "**",
      rating: 4.5,
      review: "Replace this with a few sentences: what stood out, the vibe, whether you'd go back.",
      order: "the kimchi fried rice",
      image: "",
      link: "",
    },
    {
      name: "Another Example",
      date: "2026-08-02",
      location: "Ballard, Seattle",
      cuisine: "Tasting menu",
      michelin: "",
      rating: 4,
      review: "Delete these two examples once you've added your own reviews.",
      order: "",
      image: "",
      link: "",
    },
  ],
};
