"use client";

import { useEffect, useRef, useState } from "react";
import { useCopy } from "./Language";
import Reveal from "./Reveal";

type Item = { id: string; label: string; color: string; parent?: string; go?: string };
type WorldId = "core" | "boxly" | "unipost";

const WORLDS: Record<"en" | "pl", Record<WorldId, { name: string; nodes: Item[] }>> = {
  en: {
    core: {
      name: "Core",
      nodes: [
        { id: "core", label: "Core", color: "#ff8a00" },
        { id: "services", label: "Services", color: "#5ec8e8", parent: "core" },
        { id: "design", label: "Design", color: "#5ec8e8", parent: "services" },
        { id: "build", label: "Build", color: "#5ec8e8", parent: "services" },
        { id: "security", label: "Security", color: "#5ec8e8", parent: "services" },
        { id: "seo", label: "SEO", color: "#5ec8e8", parent: "services" },
        { id: "care", label: "Care", color: "#5ec8e8", parent: "services" },
        { id: "innovation", label: "Innovation", color: "#b07cf5", parent: "core" },
        { id: "ai", label: "AI", color: "#b07cf5", parent: "innovation" },
        { id: "graphics", label: "Graphics", color: "#b07cf5", parent: "innovation" },
        { id: "three", label: "3D", color: "#b07cf5", parent: "innovation" },
        { id: "training", label: "Training", color: "#b07cf5", parent: "innovation" },
        { id: "products", label: "Products", color: "#ffc04a", parent: "core" },
        { id: "boxly", label: "Boxly", color: "#00A693", parent: "products", go: "boxly" },
        { id: "unipost", label: "UNIPost", color: "#48b8ff", parent: "products", go: "unipost" },
        { id: "process", label: "Process", color: "#6ed4a8", parent: "core" },
        { id: "p1", label: "01", color: "#6ed4a8", parent: "process" },
        { id: "p2", label: "02", color: "#6ed4a8", parent: "process" },
        { id: "p3", label: "03", color: "#6ed4a8", parent: "process" },
        { id: "p4", label: "04", color: "#6ed4a8", parent: "process" },
        { id: "about", label: "About", color: "#ff9500", parent: "core" },
        { id: "contact", label: "Contact", color: "#48b8ff", parent: "core" },
      ],
    },
    boxly: {
      name: "Boxly",
      nodes: [
        { id: "core", label: "Boxly", color: "#00A693", go: "core" },
        { id: "dash", label: "Dashboard", color: "#3ac9a3", parent: "core" },
        { id: "in", label: "Receipts", color: "#38e1c0", parent: "core" },
        { id: "wh", label: "Warehouse", color: "#5ac8a8", parent: "core" },
        { id: "pick", label: "Picking", color: "#4ec9b0", parent: "core" },
        { id: "ship", label: "Shipping", color: "#7fdccb", parent: "core" },
        { id: "rep", label: "Reports", color: "#48b8a8", parent: "core" },
        { id: "prod", label: "Products", color: "#a8ecd8", parent: "core" },
        { id: "cli", label: "Clients", color: "#60d4b8", parent: "core" },
      ],
    },
    unipost: {
      name: "UNIPost",
      nodes: [
        { id: "core", label: "UNIPost", color: "#48b8ff", go: "core" },
        { id: "send", label: "Sender", color: "#5ec8e8", parent: "core" },
        { id: "parcels", label: "Parcels", color: "#7ef9ff", parent: "core" },
        { id: "quote", label: "Quote", color: "#5ec8e8", parent: "core" },
        { id: "track", label: "Tracking", color: "#6688ff", parent: "core" },
        { id: "courier", label: "Courier", color: "#6ed4a8", parent: "core" },
        { id: "routes", label: "Routes", color: "#6ed4a8", parent: "core" },
        { id: "pay", label: "Payouts", color: "#ffc04a", parent: "core" },
        { id: "map", label: "Map", color: "#6688ff", parent: "core" },
        { id: "wallet", label: "Wallet", color: "#ffc04a", parent: "core" },
      ],
    },
  },
  pl: {
    core: {
      name: "Core",
      nodes: [
        { id: "core", label: "CORE", color: "#ff8a00" },
        { id: "services", label: "Usługi", color: "#5ec8e8", parent: "core" },
        { id: "design", label: "Projekt", color: "#5ec8e8", parent: "services" },
        { id: "build", label: "Rozwój", color: "#5ec8e8", parent: "services" },
        { id: "security", label: "Security", color: "#5ec8e8", parent: "services" },
        { id: "seo", label: "SEO", color: "#5ec8e8", parent: "services" },
        { id: "care", label: "Ops", color: "#5ec8e8", parent: "services" },
        { id: "it", label: "IT", color: "#5ec8e8", parent: "services" },
        { id: "innovation", label: "Innowacje", color: "#b07cf5", parent: "core" },
        { id: "ai", label: "AI/LLM", color: "#b07cf5", parent: "innovation" },
        { id: "graphics", label: "GenAI", color: "#b07cf5", parent: "innovation" },
        { id: "three", label: "3D", color: "#b07cf5", parent: "innovation" },
        { id: "training", label: "Edukacja", color: "#b07cf5", parent: "innovation" },
        { id: "products", label: "Produkty", color: "#ffc04a", parent: "core" },
        { id: "boxly", label: "Boxly", color: "#00A693", parent: "products", go: "boxly" },
        { id: "unipost", label: "UNIPost", color: "#48b8ff", parent: "products", go: "unipost" },
        { id: "process", label: "Proces", color: "#6ed4a8", parent: "core" },
        { id: "p1", label: "01", color: "#6ed4a8", parent: "process" },
        { id: "p2", label: "02", color: "#6ed4a8", parent: "process" },
        { id: "p3", label: "03", color: "#6ed4a8", parent: "process" },
        { id: "p4", label: "04", color: "#6ed4a8", parent: "process" },
        { id: "about", label: "O nas", color: "#ff9500", parent: "core" },
        { id: "contact", label: "Kontakt", color: "#48b8ff", parent: "core" },
      ],
    },
    boxly: {
      name: "Boxly",
      nodes: [
        { id: "core", label: "BOXLY", color: "#00A693", go: "core" },
        { id: "dash", label: "Dashboard", color: "#3ac9a3", parent: "core" },
        { id: "in", label: "Przyjęcia", color: "#38e1c0", parent: "core" },
        { id: "wh", label: "Magazyn", color: "#5ac8a8", parent: "core" },
        { id: "pick", label: "Kompletacja", color: "#4ec9b0", parent: "core" },
        { id: "ship", label: "Wysyłka", color: "#7fdccb", parent: "core" },
        { id: "rep", label: "Raporty", color: "#48b8a8", parent: "core" },
        { id: "prod", label: "Produkty", color: "#a8ecd8", parent: "core" },
        { id: "cli", label: "Klienci", color: "#60d4b8", parent: "core" },
      ],
    },
    unipost: {
      name: "UNIPost",
      nodes: [
        { id: "core", label: "UNIPOST", color: "#48b8ff", go: "core" },
        { id: "send", label: "Nadawca", color: "#5ec8e8", parent: "core" },
        { id: "parcels", label: "Paczki", color: "#7ef9ff", parent: "core" },
        { id: "quote", label: "Wycena", color: "#5ec8e8", parent: "core" },
        { id: "track", label: "Tracking", color: "#6688ff", parent: "core" },
        { id: "courier", label: "Kurier", color: "#6ed4a8", parent: "core" },
        { id: "routes", label: "Trasy", color: "#6ed4a8", parent: "core" },
        { id: "pay", label: "Wypłaty", color: "#ffc04a", parent: "core" },
        { id: "map", label: "Mapa", color: "#6688ff", parent: "core" },
        { id: "wallet", label: "Portfel", color: "#ffc04a", parent: "core" },
      ],
    },
  },
};

function build(items: Item[]) {
  const index = new Map(items.map((item, i) => [item.id, i]));
  const kids = new Map<string, string[]>();
  for (const item of items) {
    if (!item.parent) continue;
    const list = kids.get(item.parent) ?? [];
    list.push(item.id);
    kids.set(item.parent, list);
  }
  const pos = items.map(() => ({ x: 0, y: 0, z: 0 }));
  const top = kids.get(items[0].id) ?? [];
  top.forEach((id, i) => {
    const a = (i / top.length) * Math.PI * 2 - Math.PI / 2;
    pos[index.get(id)!] = { x: Math.cos(a) * 1.2, y: Math.sin(a) * 0.86, z: 0.15 };
  });
  for (const id of top) {
    const children = kids.get(id) ?? [];
    const p = pos[index.get(id)!];
    const base = Math.atan2(p.y, p.x);
    children.forEach((kid, i) => {
      const a = base + (i - (children.length - 1) / 2) * 0.42;
      pos[index.get(kid)!] = { x: Math.cos(a) * 2.05, y: Math.sin(a) * 1.48, z: -0.2 };
    });
  }
  const dust = 8;
  const nodes = items.map((item, i) => ({ ...item, ...pos[i], dust: false }));
  for (let i = 0; i < dust; i++) {
    const a = (i / dust) * Math.PI * 2;
    nodes.push({
      id: `d${i}`,
      label: "",
      color: "#7ef9ff",
      x: Math.cos(a) * 2.55,
      y: Math.sin(a) * 1.7,
      z: i % 2 ? 0.4 : -0.35,
      dust: true,
    });
  }
  const links: [number, number][] = [];
  items.forEach((item, i) => {
    if (!item.parent) return;
    const parent = index.get(item.parent);
    if (parent !== undefined) links.push([parent, i]);
  });
  for (let i = 0; i < dust; i++) links.push([0, items.length + i]);
  return { nodes, links };
}

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

export default function NeuralLink() {
  const { t, lang } = useCopy();
  const pack = WORLDS[lang];
  const [world, setWorld] = useState<WorldId>("core");
  const canvas = useRef<HTMLCanvasElement>(null);
  const card = useRef<HTMLParagraphElement>(null);
  const readout = useRef<HTMLSpanElement>(null);
  const go = useRef(setWorld);
  const api = useRef({ zoom: (_dir: number) => {}, reset: () => {} });
  go.current = setWorld;

  useEffect(() => {
    const el = canvas.current;
    if (!el) return;
    const ctx = el.getContext("2d", { alpha: true });
    if (!ctx) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const phone = window.matchMedia("(max-width: 800px)").matches;
    const model = build(pack[world].nodes);
    let width = 1;
    let height = 1;
    let dpr = 1;
    let visible = false;
    let alive = true;
    let raf = 0;
    let angle = 0.2;
    let pitch = 0.12;
    let zoom = 0.9;
    let targetZoom = 1.05;
    let panX = 0;
    let panY = 0;
    let lock = -1;
    let hover = -1;
    let dragging = false;
    let lastX = 0;
    let lastY = 0;
    let originX = 0;
    let originY = 0;
    let shownZoom = -1;
    const pointers = new Map<number, { x: number; y: number }>();
    let pinch = 0;
    const points = model.nodes.map(() => ({ x: 0, y: 0, s: 1 }));

    const resize = () => {
      const rect = el.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, phone ? 1 : 1.2);
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      el.width = Math.round(width * dpr);
      el.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const project = () => {
      const cy = Math.cos(angle);
      const sy = Math.sin(angle);
      const cp = Math.cos(pitch);
      const sp = Math.sin(pitch);
      for (let i = 0; i < model.nodes.length; i++) {
        const n = model.nodes[i];
        const x1 = n.x * cy - n.z * sy;
        const z1 = n.x * sy + n.z * cy;
        const y2 = n.y * cp - z1 * sp;
        const z2 = n.y * sp + z1 * cp;
        const f = (430 * zoom) / (z2 + 3.3);
        points[i].x = width * 0.5 + x1 * f + panX;
        points[i].y = height * 0.48 + y2 * f + panY;
        points[i].s = f / 150;
      }
      if (lock >= 0) {
        panX += (width * 0.5 - (points[lock].x - panX) - panX) * 0.12;
        panY += (height * 0.42 - (points[lock].y - panY) - panY) * 0.12;
      } else {
        panX *= 0.92;
        panY *= 0.92;
      }
    };

    const draw = (time: number) => {
      project();
      ctx.clearRect(0, 0, width, height);
      const core = points[0];
      const glow = ctx.createRadialGradient(core.x, core.y, 0, core.x, core.y, 140 * zoom);
      glow.addColorStop(0, "rgba(255,138,0,0.22)");
      glow.addColorStop(0.45, "rgba(126,249,255,0.06)");
      glow.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(core.x, core.y, 140 * zoom, 0, Math.PI * 2);
      ctx.fill();

      ctx.lineWidth = 1.25;
      for (let i = 0; i < model.links.length; i++) {
        const [a, b] = model.links[i];
        const hot = hover === a || hover === b || lock === a || lock === b;
        const pa = points[a];
        const pb = points[b];
        ctx.strokeStyle = model.nodes[a].color;
        ctx.globalAlpha = hot ? 0.9 : 0.28;
        ctx.beginPath();
        ctx.moveTo(pa.x, pa.y);
        ctx.quadraticCurveTo((pa.x + pb.x) / 2 + (pa.y - pb.y) * 0.12, (pa.y + pb.y) / 2 + (pb.x - pa.x) * 0.12, pb.x, pb.y);
        ctx.stroke();
        if (i % 2 === 0) {
          const phase = (time * 0.00032 + i * 0.17) % 1;
          ctx.globalAlpha = 0.95;
          ctx.fillStyle = hot ? "#fff6df" : "#e8feff";
          ctx.beginPath();
          ctx.arc(pa.x + (pb.x - pa.x) * phase, pa.y + (pb.y - pa.y) * phase, hot ? 2.4 : 1.6, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1;
      ctx.font = "600 12px Outfit, ui-sans-serif, sans-serif";
      ctx.textAlign = "left";
      for (let i = 0; i < model.nodes.length; i++) {
        const n = model.nodes[i];
        const p = points[i];
        const hot = hover === i || lock === i;
        const r = ((n.dust ? 1.7 : i === 0 ? 8 : 4.4) + (hot ? 1.6 : 0)) * p.s;
        ctx.strokeStyle = n.color;
        ctx.globalAlpha = n.dust ? 0.35 : 0.55;
        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(3, r * 1.9), 0, Math.PI * 2);
        ctx.stroke();
        ctx.globalAlpha = 1;
        ctx.fillStyle = n.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(1.2, r), 0, Math.PI * 2);
        ctx.fill();
        if (n.label && !n.dust) {
          ctx.fillStyle = hot ? "#ffffff" : "#e8feff";
          ctx.fillText(n.label, p.x + r + 6, p.y + 4);
        }
      }
      const nextZoom = Math.round(zoom * 10) / 10;
      if (readout.current && nextZoom !== shownZoom) {
        shownZoom = nextZoom;
        readout.current.textContent = `${nextZoom.toFixed(1)}×`;
      }
    };

    const wake = () => {
      if (!alive || reduced || !visible || raf || document.hidden) return;
      raf = requestAnimationFrame(frame);
    };
    const frame = (time: number) => {
      raf = 0;
      if (!alive || !visible || document.hidden) return;
      zoom += (targetZoom - zoom) * 0.14;
      if (!dragging) angle += 0.0032 / Math.max(1, zoom * 0.35);
      draw(time);
      raf = requestAnimationFrame(frame);
    };
    const hit = (x: number, y: number) => {
      let best = -1;
      let bestD = 34 * 34;
      for (let i = 0; i < model.nodes.length; i++) {
        if (model.nodes[i].dust) continue;
        const d = (points[i].x - x) ** 2 + (points[i].y - y) ** 2;
        if (d < bestD) {
          bestD = d;
          best = i;
        }
      }
      return best;
    };
    const local = (event: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      return { x: event.clientX - rect.left, y: event.clientY - rect.top };
    };
    const onDown = (event: PointerEvent) => {
      pointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
      if (pointers.size === 1) {
        dragging = true;
        lastX = originX = event.clientX;
        lastY = originY = event.clientY;
      }
      if (pointers.size === 2) {
        const [a, b] = [...pointers.values()];
        pinch = Math.hypot(a.x - b.x, a.y - b.y);
      }
    };
    const onMove = (event: PointerEvent) => {
      if (pointers.has(event.pointerId)) pointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
      if (pointers.size === 2 && pinch > 0) {
        const [a, b] = [...pointers.values()];
        const dist = Math.hypot(a.x - b.x, a.y - b.y);
        targetZoom = clamp(targetZoom * (dist / pinch), 0.55, 5);
        pinch = dist;
        return;
      }
      const point = local(event);
      const next = hit(point.x, point.y);
      if (next !== hover) {
        hover = next;
        if (card.current) card.current.textContent = next >= 0 ? model.nodes[next].label : pack[world].name;
      }
      if (!dragging) return;
      angle += (event.clientX - lastX) * 0.006;
      pitch = clamp(pitch + (event.clientY - lastY) * 0.004, -0.8, 0.8);
      lastX = event.clientX;
      lastY = event.clientY;
    };
    const onUp = (event: PointerEvent) => {
      const tap = Math.hypot(event.clientX - originX, event.clientY - originY) < 8;
      pointers.delete(event.pointerId);
      if (pointers.size < 2) pinch = 0;
      if (pointers.size === 0) {
        dragging = false;
        if (tap) {
          const point = local(event);
          const picked = hit(point.x, point.y);
          if (picked >= 0) {
            const node = model.nodes[picked];
            if (node.go) {
              targetZoom = 0.55;
              go.current(node.go as WorldId);
              return;
            }
            lock = lock === picked ? -1 : picked;
            targetZoom = lock === -1 ? 1.05 : 2.15;
            if (card.current) card.current.textContent = node.label;
          }
        }
      }
    };
    const onWheel = (event: WheelEvent) => {
      if (!event.ctrlKey && !event.metaKey) return;
      event.preventDefault();
      targetZoom = clamp(targetZoom * (event.deltaY < 0 ? 1.1 : 0.9), 0.55, 5);
    };
    api.current.zoom = (dir) => {
      targetZoom = clamp(targetZoom * (dir > 0 ? 1.22 : 0.82), 0.55, 5);
      wake();
    };
    api.current.reset = () => {
      lock = -1;
      targetZoom = 1.05;
      pitch = 0.12;
      wake();
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(el);
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) wake();
      else {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    }, { threshold: 0.05 });
    io.observe(el);
    el.addEventListener("pointerdown", onDown);
    el.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    el.addEventListener("pointercancel", onUp);
    el.addEventListener("wheel", onWheel, { passive: false });
    const onHide = () => {
      if (document.hidden) {
        cancelAnimationFrame(raf);
        raf = 0;
      } else wake();
    };
    document.addEventListener("visibilitychange", onHide);
    if (card.current) card.current.textContent = pack[world].name;
    if (reduced) {
      zoom = targetZoom = 1;
      draw(0);
    }
    return () => {
      alive = false;
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      el.removeEventListener("pointerdown", onDown);
      el.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      el.removeEventListener("pointercancel", onUp);
      el.removeEventListener("wheel", onWheel);
      document.removeEventListener("visibilitychange", onHide);
    };
  }, [pack, world]);

  return (
    <section id="neural" data-section="neural" className="relative isolate min-h-[100svh] overflow-hidden border-y border-line bg-[#000208]">
      <canvas ref={canvas} className="absolute inset-0 h-full w-full touch-pan-y" aria-label={t.neural.title} />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,rgb(0_2_8/0.72)_100%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-20 z-10 flex flex-col items-end gap-3 px-4">
        <div className="pointer-events-auto flex max-w-full flex-wrap justify-end gap-2">
          {(["core", "boxly", "unipost"] as const).map((id) => (
            <button
              key={id}
              type="button"
              className={world === id ? "btn btn-accent" : "btn btn-ghost"}
              aria-pressed={world === id}
              onClick={() => setWorld(id)}
            >
              {pack[id].name}
            </button>
          ))}
        </div>
        <div className="pointer-events-auto flex max-w-full flex-wrap items-center justify-end gap-2">
          <button type="button" className="btn btn-ghost" onClick={() => api.current.zoom(-1)}>
            {t.neural.zoomOut}
          </button>
          <span ref={readout} className="min-w-12 text-center text-sm font-semibold text-[#7ef9ff]">
            1.0×
          </span>
          <button type="button" className="btn btn-ghost" onClick={() => api.current.zoom(1)}>
            {t.neural.zoomIn}
          </button>
          <button type="button" className="btn btn-ghost" onClick={() => api.current.reset()}>
            {t.neural.reset}
          </button>
        </div>
      </div>
      <div className="pointer-events-none relative mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-end px-5 pt-28 pb-10">
        <Reveal>
          <p ref={card} className="text-sm font-semibold tracking-[0.16em] text-[#7ef9ff] uppercase">
            {pack[world].name}
          </p>
          <h2 className="display mt-3 max-w-3xl overflow-hidden text-5xl text-ink sm:text-7xl">
            <span className="clip-line block">{t.neural.title}</span>
          </h2>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-ink-muted">{t.neural.hint}</p>
        </Reveal>
      </div>
    </section>
  );
}
