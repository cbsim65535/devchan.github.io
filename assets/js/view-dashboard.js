(() => {
  const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR4d3BuY3hmYXV6c3BucXd3YnhqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQwNDE2MjQsImV4cCI6MjA1OTYxNzYyNH0.1Pdrk8G9UjzTBdE5w__5led6LjeXIdN_8g5mDLIQnIg";
  const API_URL = "https://dxwpncxfauzspnqwwbxj.supabase.co/rest/v1/views";
  const MAX_ITEMS = 10;
  const DAYS = 30;

  const chartCanvas = document.getElementById("views-chart");
  const container = document.getElementById("popular-posts");

  const normalizeSlug = (slug) => slug.replace(/^\/en(?=\/)/, "");
  const trimLabel = (text, max = 50) =>
    text.length > max ? text.slice(0, max) + "…" : text;
  const inferTitle = (slug) =>
    slug.split("/").pop().replace(/[-_]/g, " ").replace(/\.html$/, "");

  const getColors = (count) => {
    const base = [
      "rgba(255, 99, 132, 0.6)",
      "rgba(54, 162, 235, 0.6)",
      "rgba(255, 206, 86, 0.6)",
      "rgba(75, 192, 192, 0.6)",
      "rgba(153, 102, 255, 0.6)",
      "rgba(255, 159, 64, 0.6)",
    ];
    return Array.from({ length: count }, (_, i) => base[i % base.length]);
  };

  const fetchPostIndex = async () => {
    const isEnglish = location.pathname.startsWith("/en/");
    const path = isEnglish ? "/en/posts.json" : "/posts.json";
  
    const posts = await fetch(path).then((res) => res.json());
    const slugToTitle = {};
  
    posts.forEach((post) => {
      const slug = isEnglish ? `/en${post.url}` : post.url;
      slugToTitle[slug] = post.title;
    });
  
    return slugToTitle;
  };  

  const fetchViewCounts = async () => {
    const from = new Date();
    from.setDate(from.getDate() - DAYS);
    const fromStr = from.toISOString().slice(0, 10);

    const res = await fetch(
      `${API_URL}?select=slug,count&viewed_at=gte.${fromStr}&order=count.desc&limit=${MAX_ITEMS}`,
      {
        headers: { apikey: API_KEY },
      }
    );
    return res.json();
  };

  const render = async () => {
    container.innerHTML = `<p class="loading">Loading...</p>`;

    try {
      const [slugToTitle, views] = await Promise.all([
        fetchPostIndex(),
        fetchViewCounts(),
      ]);

      if (!views.length) {
        container.innerHTML = "<p class='error'>No view records found.</p>";
        return;
      }

      const labels = [];
      const counts = [];
      const listItems = views.map((item) => {
        const url = item.slug;
        const title = slugToTitle[url] ?? inferTitle(url);
        const label = trimLabel(title);
        labels.push(label);
        counts.push(item.count);

        return `
          <li>
            <a href="${url}" title="${title}">${label}</a>
            <span class="count">${item.count} views</span>
          </li>`;
      });

      container.innerHTML = `<ul>${listItems.join("")}</ul>`;

      const backgroundColor = getColors(counts.length);
      const borderColor = backgroundColor.map((c) => c.replace("0.6", "1"));

      new Chart(chartCanvas, {
        type: "bar",
        data: {
          labels,
          datasets: [
            {
              label: `Page Views (Last ${DAYS} Days)`,
              data: counts,
              backgroundColor,
              borderColor,
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          indexAxis: "y",
          scales: {
            x: {
              beginAtZero: true,
              ticks: { stepSize: 1 },
            },
            y: {
              ticks: {
                autoSkip: false,
                font: { size: 12 },
              },
            },
          },
          plugins: {
            legend: { display: false },
          },
        },
      });
    } catch (err) {
      container.innerHTML = "<p class='error'>Failed to load data.</p>";
      console.error("Dashboard error:", err);
    }
  };

  render();
})();
