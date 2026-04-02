// Get today's day of the year (1–365)
function getDayOfYear() {
  const today = new Date();
  const start = new Date(today.getFullYear(), 0, 0);
  const diff = today - start;
  const oneDay = 1000 * 60 * 60 * 24;
  return Math.floor(diff / oneDay);
}

// Get today's thought
const day = getDayOfYear();
const thought = getThoughtByDay(day);

// Render it (adjust selectors if needed)
document.addEventListener("DOMContentLoaded", () => {
  const titleEl = document.querySelector(".thought-title");
  const bodyEl = document.querySelector(".thought-body");
  const deeperEl = document.querySelector(".thought-deeper");

  if (titleEl) titleEl.textContent = thought.title;
  if (bodyEl) bodyEl.textContent = thought.body;
  if (deeperEl) deeperEl.textContent = thought.deeper;
});
