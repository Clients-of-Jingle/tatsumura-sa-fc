document.addEventListener("DOMContentLoaded", async () => {
  const list = document.getElementById("advisor-list");
  const filter = document.getElementById("specialty-filter");
  const count = document.getElementById("advisor-count");
  const empty = document.getElementById("advisor-empty");
  if (!list || !filter || !count || !empty) return;

  let advisors = [];
  let regions = [];
  try {
    const [advisorResponse, regionResponse] = await Promise.all([
      fetch("/assets/data/advisors.json", { cache: "no-store" }),
      fetch("/assets/data/regions.json", { cache: "no-store" })
    ]);
    if (!advisorResponse.ok || !regionResponse.ok) throw new Error("Preview data could not be loaded");
    advisors = (await advisorResponse.json()).filter((advisor) => advisor.published === true || advisor.preview === true);
    const regionData = await regionResponse.json();
    regions = regionData.regions || [];
  } catch (error) {
    list.innerHTML = '<p class="col-span-full py-12 text-center text-sm text-slate-500">情報を読み込めませんでした。時間をおいて再度お試しください。</p>';
    return;
  }

  const render = () => {
    const specialty = filter.value;
    const visible = advisors.filter((advisor) => !specialty || (advisor.specialties || []).includes(specialty));
    count.textContent = `${visible.length}名のアドバイザー`;
    empty.classList.toggle("hidden", visible.length > 0);
    list.innerHTML = "";

    visible.forEach((advisor) => {
      const card = document.createElement("article");
      card.className = "overflow-hidden border border-slate-200 bg-white transition hover:-translate-y-1 hover:shadow-soft";
      const image = document.createElement("img");
      image.src = advisor.photo || "";
      image.alt = "";
      image.loading = "lazy";
      image.className = "aspect-[5/4] w-full object-cover";
      const body = document.createElement("div");
      body.className = "p-6";
      if (advisor.preview === true && advisor.published !== true) {
        const previewLabel = document.createElement("span");
        previewLabel.className = "inline-flex rounded-full border border-amber-300 bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-900";
        previewLabel.textContent = "確認用サンプル";
        body.appendChild(previewLabel);
      }
      const title = document.createElement("p");
      title.className = "mt-3 text-xs font-medium tracking-wide text-gold";
      title.textContent = advisor.title || "";
      const name = document.createElement("h2");
      name.className = "mt-2 font-serif text-xl font-semibold text-ink";
      name.textContent = advisor.name || "";
      const summary = document.createElement("p");
      summary.className = "mt-3 text-sm leading-7 text-slate-600";
      summary.textContent = advisor.summary || "";
      const tags = document.createElement("div");
      tags.className = "mt-4 flex flex-wrap gap-2";
      (advisor.specialties || []).forEach((specialtyName) => {
        const tag = document.createElement("span");
        tag.className = "bg-cream px-3 py-1 text-xs text-ink";
        tag.textContent = specialtyName;
        tags.appendChild(tag);
      });
      const regionNames = (advisor.regionIds || []).map((id) => regions.find((region) => region.id === id)?.name).filter(Boolean);
      if (regionNames.length) {
        const region = document.createElement("p");
        region.className = "mt-4 text-xs text-slate-500";
        region.textContent = `対応地域（仮）：${regionNames.join("・")}`;
        body.append(title, name, summary, tags, region);
      } else {
        body.append(title, name, summary, tags);
      }
      const link = document.createElement("a");
      link.href = `/advisors/profile.html?id=${encodeURIComponent(advisor.id)}`;
      link.className = "focus-ring mt-5 inline-flex items-center gap-3 border-b border-gold pb-2 text-sm font-semibold text-ink hover:text-gold";
      link.textContent = "プロフィール・相談メニューを見る →";
      body.appendChild(link);
      card.append(image, body);
      list.appendChild(card);
    });
  };

  filter.addEventListener("change", render);
  render();
});
