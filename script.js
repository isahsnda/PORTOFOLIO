async function loadPortfolio() {
  try {
    const response = await fetch("portfolio.json");

    if (!response.ok) {
      throw new Error("Gagal memuat portfolio.json");
    }

    const data = await response.json();

    document.getElementById("name").textContent = data.name;

    const photo = document.getElementById("profile-photo");
    photo.src = data.photo || "profile.jpg";
    photo.alt = `Foto profil ${data.name}`;

    photo.onerror = () => {
      photo.style.display = "none";
    };

    const bio = document.getElementById("bio");

    data.bio.forEach((paragraph) => {
      const p = document.createElement("p");
      p.textContent = paragraph;
      bio.appendChild(p);
    });

    const links = document.getElementById("social-links");

    data.links.forEach((link) => {
      const a = document.createElement("a");
      a.textContent = link.name;
      a.href = link.url;
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      links.appendChild(a);
    });

    const timeline = document.getElementById("timeline");
    timeline.style.setProperty(
      "--count",
      Math.max(data.timeline.length, 1)
    );

    data.timeline.forEach((item) => {
      const article = document.createElement("article");
      article.className = "timeline-item";

      const role = document.createElement("span");
      role.className = "timeline-role";
      role.textContent = item.role;

      const track = document.createElement("div");
      track.className = "timeline-track";

      const dot = document.createElement("span");
      dot.className = "timeline-dot";
      track.appendChild(dot);

      const year = document.createElement("span");
      year.className = "timeline-year";
      year.textContent = item.year;

      const org = document.createElement("span");
      org.className = "timeline-org";
      org.textContent = item.org;

      article.append(role, track, year, org);
      timeline.appendChild(article);
    });
  } catch (error) {
    console.error(error);
    document.getElementById("name").textContent =
      "Portofolio belum dapat dimuat.";
  }
}

loadPortfolio();
