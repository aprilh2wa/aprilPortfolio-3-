"use strict";
/* ===== EDIT YOUR INFO HERE ===== */
const PROJECTS = [
  { name: "BloxCrow", role: "Head Staff", image: "" },
  { name: "BetPet", role: "Head Staff", image: "" },
  { name: "Pantry", role: "Co-Owner", image: "" },
  { name: "5Stars Stocks and Deals", role: "Staff", image: "" },
  { name: "Trouble's Stocks and Deals", role: "Staff", image: "" },
  { name: "1AM Stocks and Deals", role: "Staff", image: "" },
  { name: "Kraken.gg", role: "Site Developer & Server Manager", image: "" },
  { name: "Waves Stocks", role: "Founder", image: "" }
  // Add a picture: put the file in /images and set image: "images/bloxcrow.png"
];
const CONTACTS = [
  { label: "Discord: YOUR_USERNAME", href: "https://discord.com/users/YOUR_DISCORD_ID" },
  { label: "Email me", href: "mailto:you@example.com" }
];
/* ================================= */

const grid = document.getElementById("grid");
PROJECTS.forEach(p => {
  const card = document.createElement("article");
  card.className = "card";
  const pic = document.createElement("div");
  pic.className = "pic";
  const showEmpty = () => { pic.textContent = "No pictures found"; };
  if (p.image) {
    const img = new Image();
    img.alt = p.name + " picture";
    img.loading = "lazy";
    img.onerror = showEmpty;
    img.src = p.image;
    pic.appendChild(img);
  } else showEmpty();
  const body = document.createElement("div");
  body.className = "body";
  const h = document.createElement("h3"); h.textContent = p.name;
  const r = document.createElement("span"); r.className = "role"; r.textContent = p.role;
  body.append(h, r);
  card.append(pic, body);
  grid.appendChild(card);
});

const contacts = document.getElementById("contacts");
CONTACTS.forEach(c => {
  const a = document.createElement("a");
  a.className = "btn"; a.textContent = c.label; a.href = c.href;
  a.target = "_blank"; a.rel = "noopener noreferrer";
  contacts.appendChild(a);
});

/* Tabs */
const btns = document.querySelectorAll(".nav-btn"), tabs = document.querySelectorAll(".tab");
btns.forEach(b => b.addEventListener("click", () => {
  btns.forEach(x => x.classList.toggle("active", x === b));
  tabs.forEach(t => t.classList.toggle("active", t.id === b.dataset.tab));
}));

/* Stardust cursor trail */
const calm = matchMedia("(prefers-reduced-motion: reduce)").matches;
const touch = matchMedia("(hover: none)").matches;
const dot = document.createElement("div"); dot.className = "cursor-dot"; document.body.appendChild(dot);
if (!touch) {
  const cv = document.createElement("canvas"); cv.className = "stardust"; document.body.appendChild(cv);
  const ctx = cv.getContext("2d");
  let W = 0, H = 0, dpr = 1, parts = [], running = false, lx = null, ly = null;
  const COLORS = ["#f2bf00", "#ffd84d", "#ffb347", "#e6a800", "#fff0a0", "#ffffff"];
  const resize = () => { dpr = Math.min(devicePixelRatio || 1, 2); W = innerWidth; H = innerHeight;
    cv.width = W * dpr; cv.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0); };
  resize(); addEventListener("resize", resize);
  const star = (s) => { ctx.beginPath(); ctx.moveTo(0, -s); ctx.quadraticCurveTo(0, 0, s, 0);
    ctx.quadraticCurveTo(0, 0, 0, s); ctx.quadraticCurveTo(0, 0, -s, 0); ctx.quadraticCurveTo(0, 0, 0, -s); ctx.fill(); };
  const spawn = (x, y, n) => { for (let i = 0; i < n && parts.length < 260; i++) {
    parts.push({ x: x + (Math.random() - .5) * 10, y: y + (Math.random() - .5) * 10,
      vx: (Math.random() - .5) * 1.2, vy: Math.random() * .8 + .2, life: 1,
      decay: .012 + Math.random() * .014, size: 2 + Math.random() * 6,
      rot: Math.random() * 6.28, vr: (Math.random() - .5) * .12,
      color: COLORS[(Math.random() * COLORS.length) | 0], round: Math.random() < .35 }); } };
  const tick = () => {
    ctx.clearRect(0, 0, W, H);
    parts = parts.filter(p => p.life > 0);
    for (const p of parts) {
      p.x += p.vx; p.y += p.vy; p.vy += .025; p.rot += p.vr; p.life -= p.decay;
      ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rot);
      ctx.globalAlpha = Math.max(p.life, 0); ctx.fillStyle = p.color;
      ctx.shadowColor = "rgba(255,200,0,.9)"; ctx.shadowBlur = 8;
      const s = p.size * (.4 + p.life * .6);
      if (p.round) { ctx.beginPath(); ctx.arc(0, 0, s * .35, 0, 6.28); ctx.fill(); } else star(s);
      ctx.restore();
    }
    if (parts.length) requestAnimationFrame(tick); else running = false;
  };
  addEventListener("mousemove", e => {
    dot.classList.add("on");
    dot.style.left = e.clientX + "px"; dot.style.top = e.clientY + "px";
    dot.classList.toggle("hover", !!e.target.closest("button,a,.card"));
    if (calm) return;
    if (lx !== null) { const d = Math.hypot(e.clientX - lx, e.clientY - ly); spawn(e.clientX, e.clientY, Math.min(4, 1 + (d / 14) | 0)); }
    lx = e.clientX; ly = e.clientY;
    if (!running) { running = true; requestAnimationFrame(tick); }
  });
  document.addEventListener("mouseleave", () => { lx = null; dot.classList.remove("on"); });
}

/* Loader: gates open, then reveal (shorter on repeat visits) */
const loader = document.getElementById("loader");
let seen = false;
try { seen = sessionStorage.getItem("seen") === "1"; sessionStorage.setItem("seen", "1"); } catch (e) {}
if (seen) loader.remove();
else setTimeout(() => { loader.classList.add("done"); setTimeout(() => loader.remove(), 700); }, 4300);
