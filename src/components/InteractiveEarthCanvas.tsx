import { useEffect, useRef, useState } from 'react';
import type { OrbitalRegimePreset } from '../data/akashVayuData';
import { computeOrbitalPoint, projectLatLonToGlobe } from '../utils/orbitalMath';

interface InteractiveEarthCanvasProps {
  activeRegime: OrbitalRegimePreset;
  isPaused: boolean;
}

// Simplified stylized coastline coordinates for Indian subcontinent, Asia, Africa & Oceania cues
const INDIA_OUTLINE: [number, number][] = [
  [35.5, 74.5],
  [34.2, 77.6],
  [31.1, 77.2],
  [28.5, 81.0],
  [27.4, 88.2],
  [28.1, 95.8],
  [24.5, 93.8],
  [22.2, 91.8],
  [21.6, 87.9],
  [19.1, 84.8],
  [16.2, 81.1],
  [13.0, 80.3],
  [9.2, 79.3],
  [8.1, 77.5],
  [9.9, 76.2],
  [13.0, 74.8],
  [16.0, 73.5],
  [19.1, 72.8],
  [21.0, 72.6],
  [20.8, 70.4],
  [22.8, 69.0],
  [24.0, 68.8],
  [27.0, 70.5],
  [30.5, 74.0],
  [35.5, 74.5],
];

const EURASIA_AFRICA_CUES: [number, number][][] = [
  // Arabian Peninsula & Red Sea arc
  [
    [30.0, 32.5],
    [28.0, 35.0],
    [13.0, 43.3],
    [12.8, 45.0],
    [17.0, 54.0],
    [22.5, 59.8],
    [26.2, 56.2],
    [30.0, 48.0],
  ],
  // East Africa arc
  [
    [30.0, 32.5],
    [15.5, 39.5],
    [11.8, 51.2],
    [-1.2, 41.5],
    [-11.0, 40.5],
    [-26.0, 32.5],
    [-34.0, 20.0],
  ],
  // Southeast Asia / Bay of Bengal eastern rim
  [
    [22.2, 91.8],
    [16.8, 96.2],
    [10.0, 98.5],
    [1.3, 103.8],
    [10.5, 107.0],
    [21.0, 108.0],
    [31.2, 121.5],
  ],
  // Sri Lanka
  [
    [9.8, 80.1],
    [8.2, 81.8],
    [6.0, 80.6],
    [7.5, 79.8],
    [9.8, 80.1],
  ],
];

const REFERENCE_NODES: { label: string; lat: number; lon: number; primary?: boolean }[] = [
  { label: 'India · Central Reference', lat: 21.1, lon: 79.1, primary: true },
  { label: 'Bengaluru Tech Hub', lat: 12.97, lon: 77.59 },
  { label: 'Sriharikota Coastal Corridor', lat: 13.72, lon: 80.23 },
  { label: 'Ahmedabad Space Study Node', lat: 23.02, lon: 72.57 },
];

export function InteractiveEarthCanvas({
  activeRegime,
  isPaused,
}: InteractiveEarthCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [rotationLon, setRotationLon] = useState<number>(activeRegime.focusLon);
  const [tiltLat, setTiltLat] = useState<number>(activeRegime.focusLat);

  const dragRef = useRef<{
    dragging: boolean;
    lastX: number;
    lastY: number;
    lon: number;
    lat: number;
  }>({
    dragging: false,
    lastX: 0,
    lastY: 0,
    lon: activeRegime.focusLon,
    lat: activeRegime.focusLat,
  });

  const isVisibleRef = useRef<boolean>(true);

  // Smoothly re-center globe when preset regime changes
  useEffect(() => {
    dragRef.current.lon = activeRegime.focusLon;
    dragRef.current.lat = activeRegime.focusLat;
    setRotationLon(Math.round(activeRegime.focusLon * 10) / 10);
    setTiltLat(Math.round(activeRegime.focusLat * 10) / 10);
  }, [activeRegime]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const observer = new IntersectionObserver(
      (entries) => {
        isVisibleRef.current = entries[0]?.isIntersecting ?? true;
      },
      { threshold: 0.05 },
    );
    observer.observe(canvas);

    let animId = 0;
    let phase = 0.65;
    let lastTime = performance.now();
    let lastDraw = 0;

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = parent.clientWidth * dpr;
      canvas.height = parent.clientHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener('resize', resize);

    const drawPolyline = (
      coords: [number, number][],
      rotLon: number,
      tLat: number,
      cx: number,
      cy: number,
      r: number,
      stroke: string,
      fill?: string,
      lineWidth = 1.2,
    ) => {
      ctx.beginPath();
      let started = false;
      for (const [lat, lon] of coords) {
        const pt = projectLatLonToGlobe(lat, lon, rotLon, tLat, cx, cy, r);
        if (pt.visible) {
          if (!started) {
            ctx.moveTo(pt.x, pt.y);
            started = true;
          } else {
            ctx.lineTo(pt.x, pt.y);
          }
        } else {
          started = false;
        }
      }
      if (fill) {
        ctx.fillStyle = fill;
        ctx.fill();
      }
      ctx.strokeStyle = stroke;
      ctx.lineWidth = lineWidth;
      ctx.stroke();
    };

    const drawFrame = (now: number, force = false) => {
      const dt = Math.min(0.05, (now - lastTime) / 1000);
      lastTime = now;

      if (!force && (!isVisibleRef.current || now - lastDraw < 33)) {
        if (!prefersReducedMotion && !isPaused) {
          animId = window.requestAnimationFrame((t) => drawFrame(t));
        }
        return;
      }
      lastDraw = now;

      if (!isPaused && !prefersReducedMotion && !force) {
        phase += dt * 0.55;
        if (!dragRef.current.dragging) {
          dragRef.current.lon += dt * 3.2;
        }
      }

      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      if (w === 0 || h === 0) {
        if (!prefersReducedMotion && !isPaused) {
          animId = window.requestAnimationFrame((t) => drawFrame(t));
        }
        return;
      }

      const cx = w / 2;
      const cy = h / 2;
      const radius = Math.max(85, Math.min(w, h) * 0.34);
      const orbitRadius = radius * 1.24;

      const rotLon = dragRef.current.lon;
      const tLat = dragRef.current.lat;

      ctx.clearRect(0, 0, w, h);

      // Subtle atmospheric halo
      const halo = ctx.createRadialGradient(cx, cy, radius * 0.86, cx, cy, radius * 1.28);
      halo.addColorStop(0, 'rgba(6, 182, 212, 0.24)');
      halo.addColorStop(0.55, 'rgba(37, 99, 235, 0.1)');
      halo.addColorStop(1, 'rgba(5, 7, 13, 0)');
      ctx.fillStyle = halo;
      ctx.beginPath();
      ctx.arc(cx, cy, radius * 1.28, 0, Math.PI * 2);
      ctx.fill();

      // Back orbital path (behind sphere)
      const steps = 64;
      ctx.save();
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.22)';
      ctx.lineWidth = 1.2;
      ctx.setLineDash([4, 6]);
      ctx.beginPath();
      let backStarted = false;
      for (let i = 0; i <= steps; i++) {
        const theta = (i / steps) * Math.PI * 2;
        const op = computeOrbitalPoint(
          theta,
          activeRegime.inclinationDeg,
          activeRegime.ascendingNodeDeg,
          rotLon,
          tLat,
          cx,
          cy,
          orbitRadius,
        );
        if (!op.visible) {
          if (!backStarted) {
            ctx.moveTo(op.x, op.y);
            backStarted = true;
          } else {
            ctx.lineTo(op.x, op.y);
          }
        } else {
          backStarted = false;
        }
      }
      ctx.stroke();
      ctx.restore();

      // Sphere body
      const sphereGrad = ctx.createRadialGradient(
        cx - radius * 0.35,
        cy - radius * 0.3,
        radius * 0.15,
        cx,
        cy,
        radius,
      );
      sphereGrad.addColorStop(0, '#13274A');
      sphereGrad.addColorStop(0.65, '#091225');
      sphereGrad.addColorStop(1, '#040812');

      ctx.fillStyle = sphereGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.fill();

      // Clip interior features to sphere
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.clip();

      // Latitude graticules
      for (let lat = -60; lat <= 60; lat += 30) {
        const latRing: [number, number][] = [];
        for (let lon = -180; lon <= 180; lon += 15) {
          latRing.push([lat, lon]);
        }
        drawPolyline(
          latRing,
          rotLon,
          tLat,
          cx,
          cy,
          radius,
          'rgba(148, 163, 184, 0.12)',
          undefined,
          0.8,
        );
      }

      // Longitude graticules
      for (let lon = -180; lon < 180; lon += 30) {
        const lonRing: [number, number][] = [];
        for (let lat = -84; lat <= 84; lat += 12) {
          lonRing.push([lat, lon]);
        }
        drawPolyline(
          lonRing,
          rotLon,
          tLat,
          cx,
          cy,
          radius,
          'rgba(148, 163, 184, 0.12)',
          undefined,
          0.8,
        );
      }

      // Regional landmass cues
      for (const path of EURASIA_AFRICA_CUES) {
        drawPolyline(path, rotLon, tLat, cx, cy, radius, 'rgba(56, 189, 248, 0.32)', undefined, 1.1);
      }

      // Highlighted Indian subcontinent outline
      drawPolyline(
        INDIA_OUTLINE,
        rotLon,
        tLat,
        cx,
        cy,
        radius,
        'rgba(34, 211, 238, 0.9)',
        'rgba(6, 182, 212, 0.18)',
        1.6,
      );

      // Reference nodes on Earth
      for (const node of REFERENCE_NODES) {
        const pt = projectLatLonToGlobe(node.lat, node.lon, rotLon, tLat, cx, cy, radius);
        if (pt.visible) {
          ctx.fillStyle = node.primary ? '#22D3EE' : '#60A5FA';
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, node.primary ? 3.5 : 2.5, 0, Math.PI * 2);
          ctx.fill();

          if (node.primary) {
            ctx.strokeStyle = 'rgba(34, 211, 238, 0.45)';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.arc(pt.x, pt.y, 8, 0, Math.PI * 2);
            ctx.stroke();
          }
        }
      }

      ctx.restore();

      // Sphere atmospheric rim
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.55)';
      ctx.lineWidth = 1.4;
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.stroke();

      // Front orbital path (in front of sphere)
      ctx.save();
      ctx.strokeStyle = 'rgba(34, 211, 238, 0.72)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      let frontStarted = false;
      for (let i = 0; i <= steps; i++) {
        const theta = (i / steps) * Math.PI * 2;
        const op = computeOrbitalPoint(
          theta,
          activeRegime.inclinationDeg,
          activeRegime.ascendingNodeDeg,
          rotLon,
          tLat,
          cx,
          cy,
          orbitRadius,
        );
        if (op.visible) {
          if (!frontStarted) {
            ctx.moveTo(op.x, op.y);
            frontStarted = true;
          } else {
            ctx.lineTo(op.x, op.y);
          }
        } else {
          frontStarted = false;
        }
      }
      ctx.stroke();

      // Conceptual satellite marker on orbit
      const satPos = computeOrbitalPoint(
        phase,
        activeRegime.inclinationDeg,
        activeRegime.ascendingNodeDeg,
        rotLon,
        tLat,
        cx,
        cy,
        orbitRadius,
      );
      ctx.fillStyle = satPos.visible ? '#F8FAFC' : 'rgba(148, 163, 184, 0.45)';
      ctx.beginPath();
      ctx.arc(satPos.x, satPos.y, satPos.visible ? 4.2 : 2.8, 0, Math.PI * 2);
      ctx.fill();

      if (satPos.visible) {
        ctx.strokeStyle = 'rgba(34, 211, 238, 0.8)';
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.arc(satPos.x, satPos.y, 9, 0, Math.PI * 2);
        ctx.stroke();
      }
      ctx.restore();

      if (!prefersReducedMotion && !isPaused) {
        animId = window.requestAnimationFrame((t) => drawFrame(t));
      }
    };

    drawFrame(performance.now(), true);
    if (!prefersReducedMotion && !isPaused) {
      animId = window.requestAnimationFrame((t) => drawFrame(t));
    }

    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, [activeRegime, isPaused]);

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    dragRef.current.dragging = true;
    dragRef.current.lastX = e.clientX;
    dragRef.current.lastY = e.clientY;
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!dragRef.current.dragging) return;
    const dx = e.clientX - dragRef.current.lastX;
    const dy = e.clientY - dragRef.current.lastY;
    dragRef.current.lastX = e.clientX;
    dragRef.current.lastY = e.clientY;
    dragRef.current.lon -= dx * 0.45;
    dragRef.current.lat = Math.max(-55, Math.min(55, dragRef.current.lat + dy * 0.35));
    setRotationLon(Math.round(dragRef.current.lon));
    setTiltLat(Math.round(dragRef.current.lat));
  };

  const handlePointerUp = () => {
    dragRef.current.dragging = false;
  };

  const normalizedLon = Math.round((((rotationLon % 360) + 540) % 360) - 180);
  const roundedLat = Math.round(tiltLat * 10) / 10;

  return (
    <div className="relative h-full min-h-[360px] w-full overflow-hidden rounded-lg border border-white/10 bg-[#05070D]">
      <canvas
        ref={canvasRef}
        data-testid="earth-globe-canvas"
        data-active-regime={activeRegime.id}
        aria-label={`Interactive Earth orbital visualization showing ${activeRegime.name}`}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        className="h-full w-full cursor-grab active:cursor-grabbing touch-none"
      />
      <div className="pointer-events-none absolute bottom-3 left-4 right-4 flex items-center justify-between font-mono-tech text-[11px] text-slate-300">
        <span>Drag globe to inspect orbital geometry</span>
        <span>
          LAT {roundedLat >= 0 ? `${roundedLat}°N` : `${Math.abs(roundedLat)}°S`} · LON{' '}
          {normalizedLon}°
        </span>
      </div>
    </div>
  );
}
