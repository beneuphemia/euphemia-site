"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { Play, Pause, Layers, Eye, EyeOff, RotateCcw } from "lucide-react";

type SimulationMode = "delta_g" | "gcmc" | "docking";

interface WaterSite {
  x: number;
  y: number;
  z: number;
  deltaG: number; // kcal/mol
  isDisplaceable: boolean;
  occupancy: number; // 0.0 to 1.0
  id: number;
  label: string;
}

interface CavityAtom {
  x: number;
  y: number;
  z: number;
  element: "C" | "N" | "O" | "S";
  radius: number;
  color: string;
  residue: string;
}

interface LigandAtom {
  x: number;
  y: number;
  z: number;
  element: string;
  color: string;
  size: number;
}

const LIGAND_BONDS: [number, number][] = [
  [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 8], [8, 1]
];

export default function HeroSimulation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mode, setMode] = useState<SimulationMode>("delta_g");
  const [isPlaying, setIsPlaying] = useState(true);
  const [showReceptor, setShowReceptor] = useState(true);
  const [showGrid, setShowGrid] = useState(true);

  // Mutable interactive state ref for high-performance 60fps loop
  const stateRef = useRef({
    angleX: 0.22,
    angleY: 0.45,
    isDragging: false,
    startX: 0,
    startY: 0,
    mode: "delta_g" as SimulationMode,
    isPlaying: true,
    showReceptor: true,
    showGrid: true,
    zoom: 1.0,
  });

  useEffect(() => {
    stateRef.current.mode = mode;
  }, [mode]);

  useEffect(() => {
    stateRef.current.isPlaying = isPlaying;
  }, [isPlaying]);

  useEffect(() => {
    stateRef.current.showReceptor = showReceptor;
  }, [showReceptor]);

  useEffect(() => {
    stateRef.current.showGrid = showGrid;
  }, [showGrid]);

  // Binding pocket cavity residues (Alpha-helix & beta-strand pocket backbone representation)
  const cavityResiduesRef = useRef<CavityAtom[]>([
    // Hydrophobic pocket floor
    { x: -55, y: 35, z: -30, element: "C", radius: 7.5, color: "#2E344E", residue: "Leu85" },
    { x: -35, y: 45, z: -25, element: "C", radius: 7.5, color: "#2E344E", residue: "Leu85" },
    { x: -15, y: 48, z: -35, element: "C", radius: 7.5, color: "#2E344E", residue: "Val32" },
    { x: 15, y: 45, z: -30, element: "C", radius: 7.5, color: "#2E344E", residue: "Phe110" },
    { x: 40, y: 38, z: -25, element: "C", radius: 7.5, color: "#2E344E", residue: "Phe110" },
    // Catalytic hinge polar residues (H-bond donors/acceptors)
    { x: -60, y: -15, z: -20, element: "N", radius: 6.5, color: "#3B6EF5", residue: "Glu62" },
    { x: -48, y: -30, z: -10, element: "O", radius: 6.5, color: "#C03A2B", residue: "Glu62" },
    { x: 45, y: -25, z: -15, element: "N", radius: 6.5, color: "#3B6EF5", residue: "Lys44" },
    { x: 55, y: -10, z: -5, element: "N", radius: 6.5, color: "#3B6EF5", residue: "Lys44" },
    // Back pocket gatekeeper & ceiling
    { x: -25, y: -45, z: 15, element: "O", radius: 6.5, color: "#C03A2B", residue: "Asp89" },
    { x: 0, y: -50, z: 10, element: "C", radius: 7.5, color: "#2E344E", residue: "Thr79" },
    { x: 25, y: -45, z: 15, element: "O", radius: 6.5, color: "#C03A2B", residue: "Asp89" },
    // Rim residues
    { x: -70, y: 10, z: 15, element: "C", radius: 7.0, color: "#262B40", residue: "Ile50" },
    { x: 65, y: 15, z: 10, element: "C", radius: 7.0, color: "#262B40", residue: "Tyr124" },
  ]);

  // High-value thermodynamic water hydration sites
  const waterSitesRef = useRef<WaterSite[]>([
    { id: 1, label: "W1", x: -35, y: -18, z: 8, deltaG: 4.2, isDisplaceable: true, occupancy: 0.68 },
    { id: 2, label: "W2", x: -12, y: -8, z: -14, deltaG: 3.7, isDisplaceable: true, occupancy: 0.61 },
    { id: 3, label: "W3", x: 22, y: -15, z: 22, deltaG: 2.9, isDisplaceable: true, occupancy: 0.74 },
    { id: 4, label: "W4", x: -28, y: 24, z: -8, deltaG: -4.8, isDisplaceable: false, occupancy: 0.98 },
    { id: 5, label: "W5", x: 28, y: 18, z: -18, deltaG: -3.9, isDisplaceable: false, occupancy: 0.95 },
    { id: 6, label: "W6", x: 5, y: 32, z: 12, deltaG: -5.4, isDisplaceable: false, occupancy: 0.99 },
    { id: 7, label: "W7", x: 44, y: -6, z: 4, deltaG: 1.8, isDisplaceable: true, occupancy: 0.55 },
  ]);

  // Small molecule inhibitor ligand atoms & bonds
  const ligandAtomsRef = useRef<LigandAtom[]>([
    { x: -28, y: -15, z: 6, element: "Cl", color: "#48C774", size: 6.8 },
    { x: -15, y: -10, z: 4, element: "C", color: "#C9A84C", size: 5.5 },
    { x: -4, y: -18, z: 0, element: "C", color: "#C9A84C", size: 5.5 },
    { x: 10, y: -14, z: 2, element: "C", color: "#C9A84C", size: 5.5 },
    { x: 20, y: -12, z: 18, element: "N", color: "#3B6EF5", size: 5.5 },
    { x: 30, y: -2, z: 10, element: "C", color: "#E8C96A", size: 5.5 },
    { x: 24, y: 10, z: -2, element: "O", color: "#C03A2B", size: 5.5 },
    { x: 5, y: 8, z: -4, element: "C", color: "#C9A84C", size: 5.5 },
    { x: -8, y: 4, z: -8, element: "C", color: "#C9A84C", size: 5.5 },
  ]);

  const resetView = useCallback(() => {
    stateRef.current.angleX = 0.22;
    stateRef.current.angleY = 0.45;
    stateRef.current.zoom = 1.0;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let time = 0;

    // High DPI Canvas Scaling
    const updateSize = () => {
      const rect = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(rect.width * dpr);
      canvas.height = Math.floor(rect.height * dpr);
      ctx.setTransform(1, 0, 0, 1, 0, 0); // reset transform
      ctx.scale(dpr, dpr);
    };

    const resizeObserver = new ResizeObserver(() => {
      updateSize();
    });
    resizeObserver.observe(container);
    updateSize();

    // Ambient bulk solvent water box particles
    const ambientWaters = Array.from({ length: 42 }, (_, i) => ({
      angle: (i / 42) * Math.PI * 2,
      radius: 95 + Math.random() * 80,
      height: (Math.random() - 0.5) * 110,
      speed: (0.002 + Math.random() * 0.003) * (i % 2 === 0 ? 1 : -1),
      size: 1.4 + Math.random() * 1.4,
    }));

    // Main 60 FPS Render Loop
    const render = () => {
      const rect = container.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      if (width <= 0 || height <= 0) {
        animId = requestAnimationFrame(render);
        return;
      }

      const cx = width / 2;
      const cy = height / 2;

      ctx.clearRect(0, 0, width, height);

      // Auto rotation when playing and not user-dragging
      if (stateRef.current.isPlaying && !stateRef.current.isDragging) {
        stateRef.current.angleY += 0.006;
      }

      time += 0.025;
      const currentMode = stateRef.current.mode;
      const ay = stateRef.current.angleY;
      const ax = stateRef.current.angleX;
      const zoom = stateRef.current.zoom;

      // 3D Perspective Projection Matrix
      const project = (x: number, y: number, z: number) => {
        // Rotate around Y
        const cosY = Math.cos(ay);
        const sinY = Math.sin(ay);
        const x1 = x * cosY - z * sinY;
        const z1 = z * cosY + x * sinY;

        // Rotate around X
        const cosX = Math.cos(ax);
        const sinX = Math.sin(ax);
        const y2 = y * cosX - z1 * sinX;
        const z2 = z1 * cosX + y * sinX;

        // Field of View & Depth Scaling
        const fov = 380;
        const scale = (fov / (fov + z2)) * zoom;
        return {
          px: cx + x1 * scale,
          py: cy + y2 * scale,
          scale,
          depth: z2,
        };
      };

      // 1. Thermodynamic Cavity Isosurface Potential Field
      if (stateRef.current.showGrid) {
        ctx.save();
        const cavityRadius = 100 * zoom;
        const cavityGlow = ctx.createRadialGradient(cx, cy, 15, cx, cy, cavityRadius * 1.5);
        cavityGlow.addColorStop(0, "rgba(27, 79, 216, 0.12)");
        cavityGlow.addColorStop(0.5, "rgba(27, 79, 216, 0.04)");
        cavityGlow.addColorStop(1, "transparent");
        ctx.fillStyle = cavityGlow;
        ctx.beginPath();
        ctx.arc(cx, cy, cavityRadius * 1.4, 0, Math.PI * 2);
        ctx.fill();

        // 3D Grid rings representing binding pocket depth
        [-35, 0, 35].forEach((zLevel, idx) => {
          ctx.beginPath();
          for (let a = 0; a <= Math.PI * 2; a += 0.25) {
            const rx = (cavityRadius * 0.7 + Math.sin(a * 3 + time + idx) * 4) * Math.cos(a);
            const ry = (cavityRadius * 0.55 + Math.cos(a * 2 + time) * 4) * Math.sin(a);
            const pt = project(rx, ry, zLevel);
            if (a === 0) ctx.moveTo(pt.px, pt.py);
            else ctx.lineTo(pt.px, pt.py);
          }
          ctx.closePath();
          ctx.strokeStyle = idx === 1 ? "rgba(59, 110, 245, 0.14)" : "rgba(255, 255, 255, 0.05)";
          ctx.lineWidth = 1;
          ctx.stroke();
        });
        ctx.restore();
      }

      // 2. Ambient Bulk Water Molecules (Background Solvent Box)
      ambientWaters.forEach((w) => {
        w.angle += w.speed;
        const x = Math.cos(w.angle) * w.radius;
        const z = Math.sin(w.angle) * w.radius;
        const y = w.height + Math.sin(time * 0.8 + w.angle) * 6;
        const p = project(x, y, z);

        if (p.scale > 0.3) {
          ctx.beginPath();
          ctx.arc(p.px, p.py, Math.max(1, w.size * p.scale), 0, Math.PI * 2);
          ctx.fillStyle = `rgba(139, 145, 176, ${Math.min(0.35, 0.2 * p.scale)})`;
          ctx.fill();
        }
      });

      // 3. Receptor Protein Pocket Atoms (Backbone & Key Contact Residues)
      if (stateRef.current.showReceptor) {
        const projectedResidues = cavityResiduesRef.current
          .map((res) => ({ ...res, proj: project(res.x, res.y, res.z) }))
          .sort((a, b) => b.proj.depth - a.proj.depth); // back-to-front sorting

        // Protein backbone pseudo-bonds
        ctx.beginPath();
        for (let i = 0; i < projectedResidues.length - 1; i++) {
          const r1 = projectedResidues[i];
          const r2 = projectedResidues[i + 1];
          const dist = Math.hypot(r1.x - r2.x, r1.y - r2.y, r1.z - r2.z);
          if (dist < 42) {
            ctx.moveTo(r1.proj.px, r1.proj.py);
            ctx.lineTo(r2.proj.px, r2.proj.py);
          }
        }
        ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
        ctx.lineWidth = 2;
        ctx.stroke();

        // Protein cavity heavy atoms
        projectedResidues.forEach((res) => {
          const { px, py, scale } = res.proj;
          const r = res.radius * scale;

          ctx.beginPath();
          ctx.arc(px, py, r, 0, Math.PI * 2);
          ctx.fillStyle = res.color;
          ctx.fill();
          ctx.strokeStyle = "rgba(255, 255, 255, 0.15)";
          ctx.lineWidth = 1;
          ctx.stroke();
        });
      }

      // 4. Mode: Ligand Docking Pose representation
      if (currentMode === "docking") {
        const projectedLigandAtoms = ligandAtomsRef.current.map((atom) => ({
          ...atom,
          proj: project(atom.x, atom.y, atom.z),
        }));

        // Draw Ligand Bonds
        ctx.beginPath();
        LIGAND_BONDS.forEach(([i, j]) => {
          const p1 = projectedLigandAtoms[i].proj;
          const p2 = projectedLigandAtoms[j].proj;
          ctx.moveTo(p1.px, p1.py);
          ctx.lineTo(p2.px, p2.py);
        });
        ctx.strokeStyle = "#C9A84C";
        ctx.lineWidth = 3;
        ctx.stroke();

        // Draw Ligand Atoms
        projectedLigandAtoms.forEach((atom) => {
          const { px, py, scale } = atom.proj;
          const radius = atom.size * scale;

          ctx.beginPath();
          ctx.arc(px, py, radius * 1.5, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(201, 168, 76, 0.25)";
          ctx.fill();

          ctx.beginPath();
          ctx.arc(px, py, radius, 0, Math.PI * 2);
          ctx.fillStyle = atom.color;
          ctx.fill();
          ctx.strokeStyle = "#FAFBFF";
          ctx.lineWidth = 1.2;
          ctx.stroke();
        });
      }

      // 5. Binding Pocket Water Network (Explicit GCMC / Hydration Sites)
      const projectedSites = waterSitesRef.current
        .map((site) => ({
          ...site,
          proj: project(site.x, site.y, site.z),
        }))
        .sort((a, b) => b.proj.depth - a.proj.depth); // back-to-front rendering

      // Hydrogen-Bonding Network Interconnection Lines
      ctx.beginPath();
      for (let i = 0; i < projectedSites.length; i++) {
        for (let j = i + 1; j < projectedSites.length; j++) {
          const dx = projectedSites[i].x - projectedSites[j].x;
          const dy = projectedSites[i].y - projectedSites[j].y;
          const dz = projectedSites[i].z - projectedSites[j].z;
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
          if (dist < 55) {
            ctx.moveTo(projectedSites[i].proj.px, projectedSites[i].proj.py);
            ctx.lineTo(projectedSites[j].proj.px, projectedSites[j].proj.py);
          }
        }
      }
      ctx.strokeStyle = "rgba(59, 110, 245, 0.3)";
      ctx.setLineDash([3, 3]);
      ctx.lineWidth = 1.2;
      ctx.stroke();
      ctx.setLineDash([]);

      // Draw Individual Water Sites
      projectedSites.forEach((site) => {
        const { px, py, scale } = site.proj;
        const radius = 7.5 * scale;
        const isDisplacedInDocking = currentMode === "docking" && site.isDisplaceable;

        // Outer Glow
        ctx.beginPath();
        ctx.arc(px, py, radius * 2.2, 0, Math.PI * 2);
        if (isDisplacedInDocking) {
          ctx.fillStyle = "rgba(192, 58, 43, 0.18)";
        } else if (site.isDisplaceable) {
          ctx.fillStyle = "rgba(201, 168, 76, 0.22)";
        } else {
          ctx.fillStyle = "rgba(27, 79, 216, 0.28)";
        }
        ctx.fill();

        // Oxygen Core Sphere
        ctx.beginPath();
        ctx.arc(px, py, radius, 0, Math.PI * 2);

        if (isDisplacedInDocking) {
          // Displaced by ligand: ghost dashed ring
          ctx.strokeStyle = "#C03A2B";
          ctx.lineWidth = 1.8;
          ctx.setLineDash([2, 2]);
          ctx.stroke();
          ctx.setLineDash([]);
        } else if (site.isDisplaceable) {
          // Unstable / Hot water = Gold / Red
          ctx.fillStyle = site.deltaG > 3.5 ? "#C03A2B" : "#C9A84C";
          ctx.fill();
          ctx.strokeStyle = "rgba(255, 255, 255, 0.85)";
          ctx.lineWidth = 1;
          ctx.stroke();
        } else {
          // Structural / Conserved = Pure Physics Blue
          ctx.fillStyle = "#1B4FD8";
          ctx.fill();
          ctx.strokeStyle = "#3B6EF5";
          ctx.lineWidth = 1.2;
          ctx.stroke();
        }

        // Mode: Explicit Hydrogen Dipole Rotational Arms (GCMC Mode)
        if (currentMode === "gcmc") {
          const hAngle1 = time * 2.5 + site.id;
          const hDist = radius * 1.5;
          const h1x = px + Math.cos(hAngle1) * hDist;
          const h1y = py + Math.sin(hAngle1) * hDist;
          const h2x = px + Math.cos(hAngle1 + 1.8) * hDist;
          const h2y = py + Math.sin(hAngle1 + 1.8) * hDist;

          // H-O covalent covalent bonds
          ctx.beginPath();
          ctx.moveTo(px, py);
          ctx.lineTo(h1x, h1y);
          ctx.moveTo(px, py);
          ctx.lineTo(h2x, h2y);
          ctx.strokeStyle = "rgba(250, 251, 255, 0.55)";
          ctx.lineWidth = 1.2;
          ctx.stroke();

          // Hydrogen atoms (small white spheres)
          [[h1x, h1y], [h2x, h2y]].forEach(([hx, hy]) => {
            ctx.beginPath();
            ctx.arc(hx, hy, 2.2 * scale, 0, Math.PI * 2);
            ctx.fillStyle = "#FAFBFF";
            ctx.fill();
          });
        }

        // Thermodynamic Label & Energy Overlay
        if (scale > 0.75) {
          const sign = site.deltaG > 0 ? "+" : "";
          const energyText = currentMode === "delta_g"
            ? `${sign}${site.deltaG.toFixed(1)} ΔG`
            : `${site.label}`;

          ctx.font = `bold ${Math.round(10 * scale)}px ui-monospace, monospace`;
          ctx.fillStyle = site.isDisplaceable ? "#E8C96A" : "#70A0FF";
          ctx.fillText(energyText, px + radius + 4, py + 3);
        }
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      resizeObserver.disconnect();
    };
  }, []);

  // Pointer Interaction Handlers (Mouse & Touch)
  const handlePointerDown = (e: React.PointerEvent) => {
    stateRef.current.isDragging = true;
    stateRef.current.startX = e.clientX;
    stateRef.current.startY = e.clientY;
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!stateRef.current.isDragging) return;
    const dx = e.clientX - stateRef.current.startX;
    const dy = e.clientY - stateRef.current.startY;
    stateRef.current.startX = e.clientX;
    stateRef.current.startY = e.clientY;

    stateRef.current.angleY += dx * 0.008;
    stateRef.current.angleX += dy * 0.008;
    // Bound X rotation so model doesn't flip upside down
    stateRef.current.angleX = Math.max(-0.95, Math.min(0.95, stateRef.current.angleX));
  };

  const handlePointerUp = () => {
    stateRef.current.isDragging = false;
  };

  return (
    <div className="relative w-full rounded-md bg-[#0C0F1A] border border-white/[0.08] p-3 sm:p-5 shadow-2xl overflow-hidden">
      {/* Simulation Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/[0.06]">
        <div className="flex items-center gap-2.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#1B4FD8] animate-pulse" />
          <span className="text-[0.72rem] font-mono uppercase tracking-[0.16em] text-[#FAFBFF]">
            GCMC Binding Pocket Engine
          </span>
          <span className="text-[0.65rem] px-2 py-0.5 rounded-full bg-[#1B4FD8]/20 text-[#70A0FF] border border-[#1B4FD8]/30 font-mono">
            Explicit H₂O
          </span>
        </div>

        {/* Mode Selector */}
        <div className="flex items-center gap-1.5 bg-[#080A10] p-1 rounded-sm border border-white/[0.06]">
          <button
            type="button"
            onClick={() => setMode("delta_g")}
            className={`px-2.5 py-1 text-[0.68rem] tracking-wider uppercase font-medium rounded-sm transition-all cursor-pointer ${
              mode === "delta_g"
                ? "bg-[#1B4FD8] text-[#FAFBFF] shadow-sm font-semibold"
                : "text-[#8B91B0] hover:text-[#FAFBFF]"
            }`}
          >
            ΔG Map
          </button>
          <button
            type="button"
            onClick={() => setMode("gcmc")}
            className={`px-2.5 py-1 text-[0.68rem] tracking-wider uppercase font-medium rounded-sm transition-all cursor-pointer ${
              mode === "gcmc"
                ? "bg-[#1B4FD8] text-[#FAFBFF] shadow-sm font-semibold"
                : "text-[#8B91B0] hover:text-[#FAFBFF]"
            }`}
          >
            H₂O Dipoles
          </button>
          <button
            type="button"
            onClick={() => setMode("docking")}
            className={`px-2.5 py-1 text-[0.68rem] tracking-wider uppercase font-medium rounded-sm transition-all cursor-pointer ${
              mode === "docking"
                ? "bg-[#C9A84C] text-[#080A10] font-bold shadow-sm"
                : "text-[#8B91B0] hover:text-[#FAFBFF]"
            }`}
          >
            Ligand Pose
          </button>
        </div>
      </div>

      {/* Main Interactive Stage */}
      <div
        ref={containerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        className="relative w-full h-[320px] sm:h-[420px] cursor-grab active:cursor-grabbing touch-none select-none my-2 overflow-hidden"
      >
        <canvas ref={canvasRef} className="w-full h-full block" />

        {/* Pocket Layer Controls Overlay (Top Left) */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-[#080A10]/85 backdrop-blur-md px-2.5 py-1.5 rounded-sm border border-white/[0.08] text-[0.68rem] font-mono">
          <button
            type="button"
            onClick={() => setShowReceptor(!showReceptor)}
            className={`flex items-center gap-1 px-1.5 py-0.5 rounded cursor-pointer transition-colors ${
              showReceptor ? "text-[#70A0FF] bg-[#1B4FD8]/20" : "text-[#8B91B0] hover:text-[#FAFBFF]"
            }`}
            title="Toggle protein cavity atoms"
          >
            {showReceptor ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
            <span>Pocket</span>
          </button>
          <span className="text-white/20">|</span>
          <button
            type="button"
            onClick={() => setShowGrid(!showGrid)}
            className={`flex items-center gap-1 px-1.5 py-0.5 rounded cursor-pointer transition-colors ${
              showGrid ? "text-[#E8C96A] bg-[#C9A84C]/20" : "text-[#8B91B0] hover:text-[#FAFBFF]"
            }`}
            title="Toggle energy field mesh"
          >
            <Layers className="w-3 h-3" />
            <span>Field</span>
          </button>
        </div>

        {/* Drag Hint (Top Right) */}
        <div className="absolute top-3 right-3 hidden sm:flex items-center gap-1.5 text-[0.65rem] text-[#8B91B0] bg-[#080A10]/85 backdrop-blur-md px-2.5 py-1 rounded-sm border border-white/[0.06]">
          <span>Drag cavity to rotate 3D</span>
        </div>

        {/* Thermodynamic Telemetry Banner (Bottom Left/Center) */}
        <div className="absolute bottom-3 left-3 right-3 sm:right-auto sm:max-w-sm bg-[#080A10]/92 backdrop-blur-md border border-white/[0.08] p-3 rounded-sm text-xs pointer-events-auto shadow-xl">
          <div className="flex items-center justify-between text-[0.68rem] text-[#8B91B0] pb-1.5 border-b border-white/[0.06]">
            <span className="font-mono text-[#FAFBFF] font-semibold">Cavity Hydration Energetics</span>
            <span className="text-[#C9A84C] font-mono">T = 300 K (1 atm)</span>
          </div>

          <div className="grid grid-cols-3 gap-2 pt-2 text-center font-mono">
            <div className="p-1 rounded bg-white/[0.02]">
              <div className="text-[0.62rem] uppercase text-[#8B91B0]">Hot Waters</div>
              <div className="text-sm font-bold text-[#C03A2B]">3 sites</div>
              <div className="text-[0.6rem] text-[#E8C96A]">+4.2 kcal</div>
            </div>
            <div className="p-1 rounded bg-white/[0.02]">
              <div className="text-[0.62rem] uppercase text-[#8B91B0]">Structural</div>
              <div className="text-sm font-bold text-[#3B6EF5]">3 sites</div>
              <div className="text-[0.6rem] text-[#8B91B0]">-5.4 kcal</div>
            </div>
            <div className="p-1 rounded bg-white/[0.02]">
              <div className="text-[0.62rem] uppercase text-[#8B91B0]">Displacement</div>
              <div className="text-sm font-bold text-[#C9A84C]">-2.8 kcal</div>
              <div className="text-[0.6rem] text-[#FAFBFF]">&gt;100x Kd</div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Bottom Control Toolbar */}
      <div className="flex items-center justify-between pt-3 border-t border-white/[0.06] text-[0.72rem] text-[#8B91B0]">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex items-center gap-1.5 hover:text-[#FAFBFF] bg-white/[0.04] hover:bg-white/[0.08] px-2.5 py-1 rounded-sm transition-colors cursor-pointer"
            aria-label={isPlaying ? "Pause rotation" : "Play rotation"}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span>{isPlaying ? "Pause" : "Rotate"}</span>
          </button>

          <button
            type="button"
            onClick={resetView}
            className="flex items-center gap-1.5 hover:text-[#FAFBFF] bg-white/[0.04] hover:bg-white/[0.08] px-2.5 py-1 rounded-sm transition-colors cursor-pointer"
            aria-label="Reset simulation perspective"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset View</span>
          </button>
        </div>

        <div className="flex items-center gap-3 font-mono text-[0.65rem]">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#C03A2B]" /> Displaceable (+ΔG)
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#1B4FD8]" /> Structural (-ΔG)
          </span>
        </div>
      </div>
    </div>
  );
}
