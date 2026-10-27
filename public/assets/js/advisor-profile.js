document.addEventListener("DOMContentLoaded", async () => {
  const root = document.getElementById("profile-content");
  if (!root) return;
  const id = new URLSearchParams(window.location.search).get("id");
  if (!id) {
    root.innerHTML = '<p class="py-20 text-center text-slate-600">アドバイザーが指定されていません。<a class="underline" href="/advisors/">一覧へ戻る</a></p>';
    return;
  }

  try {
    const response = await fetch("/assets/data/advisors.json", { cache: "no-store" });
    if (!response.ok) throw new Error("Advisor data could not be loaded");
    const advisors = await response.json();
    const advisor = advisors.find((item) => item.id === id && item.published === true);
    if (!advisor) {
      root.innerHTML = '<p class="py-20 text-center leading-8 text-slate-600">このプロフィールは現在公開されていません。<br><a class="mt-4 inline-block underline" href="/advisors/">アドバイザー一覧へ戻る</a></p>';
      return;
    }

    document.title = `${advisor.name} | Senior Experience Network`;
    const layout = document.createElement("div");
    layout.className = "grid gap-10 lg:grid-cols-[.7fr_1.3fr] lg:gap-16";
    const portrait = document.createElement("img");
    portrait.src = advisor.photo || "";
    portrait.alt = "";
    portrait.className = "aspect-[4/5] w-full object-cover";
    portrait.loading = "lazy";
    const main = document.createElement("div");
    const title = document.createElement("p");
    title.className = "text-sm font-semibold tracking-wide text-gold";
    title.textContent = advisor.title || "";
    const name = document.createElement("h1");
    name.className = "mt-3 font-serif text-3xl font-semibold text-ink sm:text-4xl";
    name.textContent = advisor.name || "";
    const tags = document.createElement("div");
    tags.className = "mt-5 flex flex-wrap gap-2";
    (advisor.specialties || []).forEach((value) => {
      const tag = document.createElement("span");
      tag.className = "bg-cream px-3 py-1.5 text-xs text-ink";
      tag.textContent = value;
      tags.appendChild(tag);
    });
    const summary = document.createElement("p");
    summary.className = "mt-7 text-base leading-8 text-slate-700";
    summary.textContent = advisor.summary || "";
    const bioTitle = document.createElement("h2");
    bioTitle.className = "mt-9 border-b border-slate-200 pb-3 font-serif text-xl font-semibold text-ink";
    bioTitle.textContent = "プロフィール";
    const bio = document.createElement("p");
    bio.className = "mt-4 whitespace-pre-line text-sm leading-8 text-slate-600";
    bio.textContent = advisor.biography || "";
    main.append(title, name, tags, summary, bioTitle, bio);

    const offeringsTitle = document.createElement("h2");
    offeringsTitle.className = "mt-12 border-b border-slate-200 pb-3 font-serif text-xl font-semibold text-ink";
    offeringsTitle.textContent = "相談メニュー";
    main.appendChild(offeringsTitle);
    const offerings = document.createElement("div");
    offerings.className = "mt-5 grid gap-4";
    (advisor.offerings || []).forEach((offering) => {
      const item = document.createElement("article");
      item.className = "border border-slate-200 p-5 sm:p-6";
      const itemTitle = document.createElement("h3");
      itemTitle.className = "font-semibold text-ink";
      itemTitle.textContent = offering.name || "相談メニュー";
      const meta = document.createElement("p");
      meta.className = "mt-2 text-sm text-slate-600";
      meta.textContent = [offering.duration, offering.price].filter(Boolean).join(" · ");
      const desc = document.createElement("p");
      desc.className = "mt-3 text-sm leading-7 text-slate-600";
      desc.textContent = offering.description || "";
      item.append(itemTitle, meta, desc);
      offerings.appendChild(item);
    });
    if (!(advisor.offerings || []).length) {
      const note = document.createElement("p");
      note.className = "mt-4 text-sm leading-7 text-slate-500";
      note.textContent = "相談メニューは準備中です。";
      offerings.appendChild(note);
    }
    main.appendChild(offerings);

    if (advisor.bookingUrl && advisor.bookingUrl !== "#") {
      const booking = document.createElement("a");
      booking.href = advisor.bookingUrl;
      booking.target = "_blank";
      booking.rel = "noopener noreferrer";
      booking.className = "focus-ring mt-8 inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-navy px-7 py-4 font-semibold text-white hover:bg-ink";
      booking.textContent = "予約ページへ進む →";
      main.appendChild(booking);
    }
    layout.append(portrait, main);
    root.replaceChildren(layout);
  } catch (error) {
    root.innerHTML = '<p class="py-20 text-center text-slate-600">プロフィールを読み込めませんでした。<a class="underline" href="/advisors/">一覧へ戻る</a></p>';
  }
});
