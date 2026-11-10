const toggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".main-nav");
if (toggle && nav) {
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
  });
  nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
    nav.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
  }));
}
document.querySelector("#year").textContent = new Date().getFullYear();

// Episode number advances at 00:00 on the first Saturday of each month.
// November 2026 is the reference month: Episode 95.
const episodeLabel = document.querySelector("#episode-number");
if (episodeLabel) {
  const baseYear = 2026;
  const baseMonth = 10; // November (0-based)
  const baseEpisode = 95;
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const firstSaturday = (year, month) => {
    const firstDay = new Date(year, month, 1);
    return 1 + ((6 - firstDay.getDay() + 7) % 7);
  };

  let episode = baseEpisode;
  const monthsSinceBase =
    (today.getFullYear() - baseYear) * 12 +
    (today.getMonth() - baseMonth);

  for (let offset = 1; offset <= monthsSinceBase; offset++) {
    const monthDate = new Date(baseYear, baseMonth + offset, 1);
    const year = monthDate.getFullYear();
    const month = monthDate.getMonth();
    const releaseDay = new Date(year, month, firstSaturday(year, month));
    if (today >= releaseDay) episode++;
  }

  episodeLabel.textContent = `EPISODE ${episode}`;
}
