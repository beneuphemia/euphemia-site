"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { Play, Pause, Layers, Eye, EyeOff, RotateCcw, ZoomIn, ZoomOut, Info } from "lucide-react";
import { site } from "@/content/site";

type SimulationMode = "delta_g" | "gcmc" | "docking";

interface WaterSite {
  id: number;
  label: string;
  x: number;
  y: number;
  z: number;
  deltaG: number; // kcal/mol
  enthalpy: number;
  entropy: number;
  occupancy: number;
  isDisplaceable: boolean;
  donorAcceptor: string;
}

interface CavityAtom {
  x: number;
  y: number;
  z: number;
  element: "C" | "N" | "O" | "S";
  radius: number;
  color: string;
  residue: string;
  atomName: string;
}

interface LigandAtom {
  x: number;
  y: number;
  z: number;
  element: string;
  color: string;
  size: number;
  name: string;
}

interface GCMCTrial {
  x: number;
  y: number;
  z: number;
  angle: number;
  life: number;
  maxLife: number;
  type: "insertion" | "deletion" | "rotation";
  accepted: boolean;
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
  const [showLabels, setShowLabels] = useState(true);
  const [zoomLevel, setZoomLevel] = useState(1.1);
  const [hoveredEntity, setHoveredEntity] = useState<{
    type: "water" | "atom";
    title: string;
    details: string;
    metrics: string;
  } | null>(null);

  // Mutable interactive state ref for 60fps rendering without React render thrash
  const stateRef = useRef({
    angleX: 0.28,
    angleY: 0.55,
    targetAngleX: 0.28,
    targetAngleY: 0.55,
    isDragging: false,
    startX: 0,
    startY: 0,
    mode: "delta_g" as SimulationMode,
    isPlaying: true,
    showReceptor: true,
    showGrid: true,
    showLabels: true,
    zoom: 1.1,
    mouseX: -9999,
    mouseY: -9999,
    hoveredSiteId: null as number | null,
    dockingProgress: 1.0, // 0 = undocked, 1 = fully docked
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

  useEffect(() => {
    stateRef.current.showLabels = showLabels;
  }, [showLabels]);

  useEffect(() => {
    stateRef.current.zoom = zoomLevel;
  }, [zoomLevel]);

  // Binding pocket cavity residues (Alpha-helix & beta-strand pocket backbone representation)
  const cavityResiduesRef = useRef<CavityAtom[]>([
    // Hydrophobic pocket floor
    { x: -38, y: 24, z: -20, element: "C", radius: 7.2, color: "#2B3248", residue: "Leu85", atomName: "CD1" },
    { x: -24, y: 32, z: -18, element: "C", radius: 7.2, color: "#2B3248", residue: "Leu85", atomName: "CG" },
    { x: -10, y: 34, z: -25, element: "C", radius: 7.2, color: "#2B3248", residue: "Val32", atomName: "CG1" },
    { x: 10, y: 32, z: -22, element: "C", radius: 7.2, color: "#2B3248", residue: "Phe110", atomName: "CD2" },
    { x: 28, y: 26, z: -18, element: "C", radius: 7.2, color: "#2B3248", residue: "Phe110", atomName: "CZ" },
    // Catalytic hinge polar residues (H-bond donors/acceptors)
    { x: -42, y: -10, z: -14, element: "N", radius: 6.5, color: "#3B6EF5", residue: "Glu62", atomName: "N" },
    { x: -34, y: -22, z: -8, element: "O", radius: 6.5, color: "#C03A2B", residue: "Glu62", atomName: "OE1" },
    { x: 32, y: -18, z: -10, element: "N", radius: 6.5, color: "#3B6EF5", residue: "Lys44", atomName: "NZ" },
    { x: 38, y: -8, z: -4, element: "N", radius: 6.5, color: "#3B6EF5", residue: "Lys44", atomName: "CE" },
    // Back pocket gatekeeper & ceiling
    { x: -18, y: -32, z: 10, element: "O", radius: 6.5, color: "#C03A2B", residue: "Asp89", atomName: "OD2" },
    { x: 0, y: -36, z: 8, element: "C", radius: 7.2, color: "#2B3248", residue: "Thr79", atomName: "OG1" },
    { x: 18, y: -32, z: 10, element: "O", radius: 6.5, color: "#C03A2B", residue: "Asp89", atomName: "OD1" },
    // Rim residues
    { x: -48, y: 8, z: 10, element: "C", radius: 6.8, color: "#222738", residue: "Ile50", atomName: "CG2" },
    { x: 44, y: 10, z: 8, element: "C", radius: 6.8, color: "#222738", residue: "Tyr124", atomName: "OH" },
  ]);

  // High-value thermodynamic water hydration sites
  const waterSitesRef = useRef<WaterSite[]>([
    { id: 1, label: "W1", x: -24, y: -12, z: 6, deltaG: 4.2, enthalpy: 1.2, entropy: 3.0, occupancy: 0.68, isDisplaceable: true, donorAcceptor: "Glu62 Backbone" },
    { id: 2, label: "W2", x: -8, y: -6, z: -10, deltaG: 3.7, enthalpy: 0.9, entropy: 2.8, occupancy: 0.61, isDisplaceable: true, donorAcceptor: "Hydrophobic Cleft" },
    { id: 3, label: "W3", x: 15, y: -10, z: 16, deltaG: 2.9, enthalpy: 0.5, entropy: 2.4, occupancy: 0.74, isDisplaceable: true, donorAcceptor: "Lys44 Sidechain" },
    { id: 4, label: "W4", x: -20, y: 16, z: -6, deltaG: -4.8, enthalpy: -6.1, entropy: 1.3, occupancy: 0.98, isDisplaceable: false, donorAcceptor: "Val32 / Leu85" },
    { id: 5, label: "W5", x: 20, y: 12, z: -12, deltaG: -3.9, enthalpy: -5.3, entropy: 1.4, occupancy: 0.95, isDisplaceable: false, donorAcceptor: "Phe110 Gate" },
    { id: 6, label: "W6", x: 3, y: 22, z: 8, deltaG: -5.4, enthalpy: -7.0, entropy: 1.6, occupancy: 0.99, isDisplaceable: false, donorAcceptor: "Catalytic Triad Bridge" },
    { id: 7, label: "W7", x: 30, y: -4, z: 3, deltaG: 1.8, enthalpy: 0.2, entropy: 1.6, occupancy: 0.55, isDisplaceable: true, donorAcceptor: "Solvent Interface" },
  ]);

  // Small molecule inhibitor ligand atoms
  const ligandAtomsRef = useRef<LigandAtom[]>([
    { x: -19, y: -10, z: 4, element: "Cl", color: "#48C774", size: 7.2, name: "Cl1" },
    { x: -10, y: -7, z: 3, element: "C", color: "#C9A84C", size: 5.8, name: "C1" },
    { x: -3, y: -13, z: 0, element: "C", color: "#C9A84C", size: 5.8, name: "C2" },
    { x: 7, y: -10, z: 1, element: "C", color: "#C9A84C", size: 5.8, name: "C3" },
    { x: 14, y: -9, z: 12, element: "N", color: "#3B6EF5", size: 5.8, name: "N4" },
    { x: 21, y: -2, z: 7, element: "C", color: "#E8C96A", size: 5.8, name: "C5" },
    { x: 17, y: 7, z: -1, element: "O", color: "#C03A2B", size: 5.8, name: "O6" },
    { x: 4, y: 6, z: -3, element: "C", color: "#C9A84C", size: 5.8, name: "C7" },
    { x: -5, y: 3, z: -5, element: "C", color: "#C9A84C", size: 5.8, name: "C8" },
  ]);

  const resetView = useCallback(() => {
    stateRef.current.targetAngleX = 0.28;
    stateRef.current.targetAngleY = 0.55;
    stateRef.current.angleX = 0.28;
    stateRef.current.angleY = 0.55;
    stateRef.current.zoom = 1.1;
    setZoomLevel(1.1);
  }, []);

  const handleZoom = (delta: number) => {
    setZoomLevel((prev) => {
      const next = Math.max(0.65, Math.min(2.5, Number((prev + delta).toFixed(2))));
      stateRef.current.zoom = next;
      return next;
    });
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let time = 0;

    // High DPI Canvas Scaling Synchronization
    const updateSize = () => {
      const rect = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const targetW = Math.floor(rect.width * dpr);
      const targetH = Math.floor(rect.height * dpr);
      if (canvas.width !== targetW || canvas.height !== targetH) {
        canvas.width = targetW;
        canvas.height = targetH;
      }
    };

    const resizeObserver = new ResizeObserver(() => {
      updateSize();
    });
    resizeObserver.observe(container);
    updateSize();

    // Solvent shell water molecules surrounding the binding cleft
    // Sized and positioned organically at the pocket mouth & solvent boundary
    const solventWaters = Array.from({ length: 36 }, (_, i) => {
      const angle = (i / 36) * Math.PI * 2;
      const radius = 55 + (i % 5) * 8 + Math.random() * 6;
      const height = ((i % 7) - 3) * 12 + (Math.random() - 0.5) * 6;
      return {
        angle,
        radius,
        height,
        speed: (0.003 + (i % 3) * 0.002) * (i % 2 === 0 ? 1 : -1),
        dipoleAngle: Math.random() * Math.PI * 2,
        dipoleSpeed: (Math.random() - 0.5) * 0.04,
        size: 2.8,
      };
    });

    // Active GCMC trials queue
    const gcmcTrials: GCMCTrial[] = [];

    // Helper: Draw 3D Shaded Sphere with Light Specular Highlight
    const drawSphere = (
      px: number,
      py: number,
      radius: number,
      baseColor: string,
      highlightColor = "#FFFFFF",
      shadowColor = "#000000"
    ) => {
      if (radius <= 0.5) return;
      const lightOffX = -radius * 0.35;
      const lightOffY = -radius * 0.35;
      const grad = ctx.createRadialGradient(
        px + lightOffX,
        py + lightOffY,
        radius * 0.08,
        px,
        py,
        radius
      );
      grad.addColorStop(0, highlightColor);
      grad.addColorStop(0.3, baseColor);
      grad.addColorStop(0.85, baseColor);
      grad.addColorStop(1, shadowColor);

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(px, py, radius, 0, Math.PI * 2);
      ctx.fill();
    };

    // Main 60 FPS Render Loop
    const render = () => {
      const rect = container.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      if (width <= 0 || height <= 0) {
        animId = requestAnimationFrame(render);
        return;
      }

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      if (canvas.width !== Math.floor(width * dpr) || canvas.height !== Math.floor(height * dpr)) {
        canvas.width = Math.floor(width * dpr);
        canvas.height = Math.floor(height * dpr);
      }

      ctx.save();
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);

      // Smooth Auto-Rotation & Inertia
      if (stateRef.current.isPlaying && !stateRef.current.isDragging) {
        stateRef.current.targetAngleY += 0.005;
      }
      stateRef.current.angleY += (stateRef.current.targetAngleY - stateRef.current.angleY) * 0.12;
      stateRef.current.angleX += (stateRef.current.targetAngleX - stateRef.current.angleX) * 0.12;

      time += 0.024;
      const currentMode = stateRef.current.mode;
      const ay = stateRef.current.angleY;
      const ax = stateRef.current.angleX;
      const zoom = stateRef.current.zoom;

      // Base scale calculated responsively to fill the viewer gorgeously
      // On desktop (height 420px): baseScale ~ 3.2x, filling ~70% of canvas!
      const baseScale = (Math.min(width, height) / 125) * zoom;
      const cx = width / 2;
      const cy = height / 2;

      // 3D Perspective Projection Function
      const project = (x: number, y: number, z: number) => {
        // Rotate Y
        const cosY = Math.cos(ay);
        const sinY = Math.sin(ay);
        const x1 = x * cosY - z * sinY;
        const z1 = z * cosY + x * sinY;

        // Rotate X
        const cosX = Math.cos(ax);
        const sinX = Math.sin(ax);
        const y2 = y * cosX - z1 * sinX;
        const z2 = z1 * cosX + y * sinX;

        // Perspective depth ratio
        const cameraDistance = 320;
        const perspective = cameraDistance / (cameraDistance + z2);
        const effectiveScale = baseScale * perspective;

        return {
          px: cx + x1 * effectiveScale,
          py: cy + y2 * effectiveScale,
          scale: effectiveScale,
          perspective,
          depth: z2,
        };
      };

      // 1. Ambient Background Solvation Glow
      const ambientGlow = ctx.createRadialGradient(cx, cy, 10, cx, cy, Math.min(width, height) * 0.58);
      ambientGlow.addColorStop(0, "rgba(27, 79, 216, 0.14)");
      ambientGlow.addColorStop(0.6, "rgba(27, 79, 216, 0.025)");
      ambientGlow.addColorStop(1, "transparent");
      ctx.fillStyle = ambientGlow;
      ctx.fillRect(0, 0, width, height);

      // 2. Binding Pocket Isosurface Potential Field
      if (stateRef.current.showGrid) {
        ctx.save();
        const cavityR = 48;
        [-18, 0, 18].forEach((zLvl, idx) => {
          ctx.beginPath();
          for (let a = 0; a <= Math.PI * 2 + 0.1; a += 0.2) {
            const wobble = Math.sin(a * 3 + time * 1.5 + idx) * 3;
            const rx = (cavityR + wobble) * Math.cos(a);
            const ry = (cavityR * 0.75 + wobble) * Math.sin(a);
            const pt = project(rx, ry, zLvl);
            if (a === 0) ctx.moveTo(pt.px, pt.py);
            else ctx.lineTo(pt.px, pt.py);
          }
          ctx.closePath();
          ctx.strokeStyle = idx === 1
            ? "rgba(59, 110, 245, 0.18)"
            : "rgba(255, 255, 255, 0.06)";
          ctx.lineWidth = 1;
          ctx.stroke();
        });
        ctx.restore();
      }

      // Collect all 3D drawable elements for unified Z-buffer depth sorting
      type Drawable =
        | { type: "backbone" }
        | { type: "atom"; data: CavityAtom; proj: ReturnType<typeof project> }
        | { type: "water"; data: WaterSite; proj: ReturnType<typeof project> }
        | { type: "solvent"; x: number; y: number; z: number; size: number; proj: ReturnType<typeof project>; dipoleAngle: number }
        | { type: "ligandAtom"; data: LigandAtom; proj: ReturnType<typeof project> }
        | { type: "gcmcTrial"; data: GCMCTrial; proj: ReturnType<typeof project> };

      const drawables: Drawable[] = [];

      // Add Backbone
      if (stateRef.current.showReceptor) {
        drawables.push({ type: "backbone" });

        cavityResiduesRef.current.forEach((atom) => {
          drawables.push({
            type: "atom",
            data: atom,
            proj: project(atom.x, atom.y, atom.z),
          });
        });
      }

      // Add Water Sites
      waterSitesRef.current.forEach((water) => {
        let wx = water.x;
        let wy = water.y;
        let wz = water.z;

        // In docking mode, displaceable waters are expelled along trajectory vectors
        if (currentMode === "docking" && water.isDisplaceable) {
          const expelFactor = 1.35;
          wx *= expelFactor;
          wy *= expelFactor;
          wz += 10;
        }

        drawables.push({
          type: "water",
          data: water,
          proj: project(wx, wy, wz),
        });
      });

      // Add Solvent Water Molecules
      solventWaters.forEach((sw) => {
        sw.angle += sw.speed;
        sw.dipoleAngle += sw.dipoleSpeed;
        const x = Math.cos(sw.angle) * sw.radius;
        const z = Math.sin(sw.angle) * sw.radius;
        const y = sw.height + Math.sin(time + sw.angle * 2) * 4;
        drawables.push({
          type: "solvent",
          x,
          y,
          z,
          size: sw.size,
          proj: project(x, y, z),
          dipoleAngle: sw.dipoleAngle,
        });
      });

      // Add Ligand in Docking mode
      if (currentMode === "docking") {
        ligandAtomsRef.current.forEach((latom) => {
          drawables.push({
            type: "ligandAtom",
            data: latom,
            proj: project(latom.x, latom.y, latom.z),
          });
        });
      }

      // Add GCMC Trials
      if (currentMode === "gcmc") {
        // Occasionally spawn new trial
        if (Math.random() < 0.08 && gcmcTrials.length < 8) {
          const trialType = Math.random() < 0.6 ? "insertion" : "deletion";
          gcmcTrials.push({
            x: (Math.random() - 0.5) * 50,
            y: (Math.random() - 0.5) * 40,
            z: (Math.random() - 0.5) * 30,
            angle: Math.random() * Math.PI * 2,
            life: 0,
            maxLife: 45 + Math.random() * 30,
            type: trialType,
            accepted: Math.random() < 0.45,
          });
        }

        for (let i = gcmcTrials.length - 1; i >= 0; i--) {
          const t = gcmcTrials[i];
          t.life++;
          if (t.life >= t.maxLife) {
            gcmcTrials.splice(i, 1);
            continue;
          }
          t.angle += 0.05;
          drawables.push({
            type: "gcmcTrial",
            data: t,
            proj: project(t.x, t.y, t.z),
          });
        }
      }

      // Sort all drawables by depth (back to front rendering)
      drawables.sort((a, b) => {
        const depthA = "proj" in a ? a.proj.depth : -999;
        const depthB = "proj" in b ? b.proj.depth : -999;
        return depthB - depthA;
      });

      // 3. Draw Ligand Bonds (if docking mode)
      if (currentMode === "docking") {
        ctx.save();
        ctx.beginPath();
        LIGAND_BONDS.forEach(([i, j]) => {
          const a1 = ligandAtomsRef.current[i];
          const a2 = ligandAtomsRef.current[j];
          const p1 = project(a1.x, a1.y, a1.z);
          const p2 = project(a2.x, a2.y, a2.z);
          ctx.moveTo(p1.px, p1.py);
          ctx.lineTo(p2.px, p2.py);
        });
        ctx.strokeStyle = "#E8C96A";
        ctx.lineWidth = Math.max(1.5, 3.5 * (baseScale / 3));
        ctx.stroke();

        ctx.strokeStyle = "#FFFFFF";
        ctx.lineWidth = Math.max(0.8, 1.2 * (baseScale / 3));
        ctx.stroke();
        ctx.restore();
      }

      // 4. Draw Hydrogen-Bonding Network Interconnection Lines
      ctx.save();
      const projWaters = waterSitesRef.current.map((w) => ({
        ...w,
        proj: project(w.x, w.y, w.z),
      }));

      ctx.beginPath();
      for (let i = 0; i < projWaters.length; i++) {
        for (let j = i + 1; j < projWaters.length; j++) {
          const dx = projWaters[i].x - projWaters[j].x;
          const dy = projWaters[i].y - projWaters[j].y;
          const dz = projWaters[i].z - projWaters[j].z;
          const dist3D = Math.hypot(dx, dy, dz);
          if (dist3D < 42) {
            ctx.moveTo(projWaters[i].proj.px, projWaters[i].proj.py);
            ctx.lineTo(projWaters[j].proj.px, projWaters[j].proj.py);
          }
        }
      }
      ctx.strokeStyle = "rgba(59, 110, 245, 0.4)";
      ctx.setLineDash([4, 4]);
      ctx.lineWidth = 1.4;
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.restore();

      // Track closest hovered element under cursor
      let foundHover: {
        type: "water" | "atom";
        title: string;
        details: string;
        metrics: string;
      } | null = null;
      let minDistance = 22;

      // 5. Render Sorted Drawables
      drawables.forEach((item) => {
        if (item.type === "backbone") {
          // Draw Protein Backbone Ribbon connecting residue coordinates
          const projectedResidues = cavityResiduesRef.current.map((r) => project(r.x, r.y, r.z));
          ctx.save();
          ctx.beginPath();
          for (let i = 0; i < projectedResidues.length - 1; i++) {
            const r1 = cavityResiduesRef.current[i];
            const r2 = cavityResiduesRef.current[i + 1];
            const dist = Math.hypot(r1.x - r2.x, r1.y - r2.y, r1.z - r2.z);
            if (dist < 32) {
              const p1 = projectedResidues[i];
              const p2 = projectedResidues[i + 1];
              ctx.moveTo(p1.px, p1.py);
              ctx.lineTo(p2.px, p2.py);
            }
          }
          ctx.strokeStyle = "rgba(255, 255, 255, 0.12)";
          ctx.lineWidth = Math.max(1.8, 3.2 * (baseScale / 3));
          ctx.stroke();
          ctx.restore();
          return;
        }

        if (item.type === "solvent") {
          const { px, py, perspective } = item.proj;
          const rO = Math.max(1.5, item.size * perspective * (baseScale / 3));

          // Draw Solvent H2O Dipole (Oxygen + 2 Hydrogens)
          ctx.save();
          ctx.beginPath();
          ctx.arc(px, py, rO, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(112, 160, 255, ${Math.min(0.45, 0.28 * perspective)})`;
          ctx.fill();

          // Hydrogen satellites at 104.5 degrees
          const hDist = rO * 1.6;
          const h1x = px + Math.cos(item.dipoleAngle) * hDist;
          const h1y = py + Math.sin(item.dipoleAngle) * hDist;
          const h2x = px + Math.cos(item.dipoleAngle + 1.82) * hDist;
          const h2y = py + Math.sin(item.dipoleAngle + 1.82) * hDist;

          ctx.fillStyle = `rgba(250, 251, 255, ${Math.min(0.4, 0.22 * perspective)})`;
          ctx.beginPath();
          ctx.arc(h1x, h1y, Math.max(1, rO * 0.45), 0, Math.PI * 2);
          ctx.arc(h2x, h2y, Math.max(1, rO * 0.45), 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
          return;
        }

        if (item.type === "atom") {
          const { px, py, perspective } = item.proj;
          const r = Math.max(2, item.data.radius * 0.7 * perspective * (baseScale / 3));

          // Check mouse hover
          const distM = Math.hypot(px - stateRef.current.mouseX, py - stateRef.current.mouseY);
          if (distM < minDistance) {
            minDistance = distM;
            foundHover = {
              type: "atom",
              title: `${item.data.residue} : ${item.data.atomName}`,
              details: `Element ${item.data.element} | Cavity Anchor Residue`,
              metrics: `Coord (${item.data.x}, ${item.data.y}, ${item.data.z})`,
            };
          }

          drawSphere(px, py, r, item.data.color, "#FFFFFF", "#0A0D16");
          return;
        }

        if (item.type === "ligandAtom") {
          const { px, py, perspective } = item.proj;
          const r = Math.max(2.5, item.data.size * 0.85 * perspective * (baseScale / 3));

          // Outer Gold Glow Halo
          ctx.save();
          ctx.beginPath();
          ctx.arc(px, py, r * 1.8, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(201, 168, 76, 0.25)";
          ctx.fill();
          ctx.restore();

          drawSphere(px, py, r, item.data.color, "#FFF5D0", "#3E2E08");
          return;
        }

        if (item.type === "gcmcTrial") {
          const { px, py, perspective } = item.proj;
          const progress = item.data.life / item.data.maxLife;
          const alpha = (1 - progress) * 0.85;
          const r = 5.5 * perspective * (baseScale / 3);

          ctx.save();
          ctx.beginPath();
          ctx.arc(px, py, r * 1.6, 0, Math.PI * 2);
          ctx.fillStyle = item.data.accepted
            ? `rgba(72, 199, 116, ${alpha * 0.3})`
            : `rgba(192, 58, 43, ${alpha * 0.3})`;
          ctx.fill();

          ctx.beginPath();
          ctx.arc(px, py, r, 0, Math.PI * 2);
          ctx.fillStyle = item.data.accepted
            ? `rgba(72, 199, 116, ${alpha})`
            : `rgba(231, 76, 60, ${alpha})`;
          ctx.fill();
          ctx.restore();
          return;
        }

        if (item.type === "water") {
          const { px, py, perspective } = item.proj;
          const isDisplacedInDocking = currentMode === "docking" && item.data.isDisplaceable;
          const pulse = 1 + Math.sin(time * 3 + item.data.id) * 0.08;
          const r = Math.max(3.5, 7.5 * perspective * (baseScale / 3) * pulse);

          // Check mouse hover
          const distM = Math.hypot(px - stateRef.current.mouseX, py - stateRef.current.mouseY);
          if (distM < minDistance) {
            minDistance = distM;
            foundHover = {
              type: "water",
              title: `Site ${item.data.label} (${item.data.isDisplaceable ? "Displaceable / Hot" : "Conserved / Structural"})`,
              details: `ΔG: ${item.data.deltaG > 0 ? "+" : ""}${item.data.deltaG} kcal/mol | Occ: ${(item.data.occupancy * 100).toFixed(0)}%`,
              metrics: `ΔH: ${item.data.enthalpy} | -TΔS: ${item.data.entropy} | Bound: ${item.data.donorAcceptor}`,
            };
          }

          // 1. Energetic Halos & Aura
          ctx.save();
          ctx.beginPath();
          ctx.arc(px, py, r * 2.4, 0, Math.PI * 2);
          if (isDisplacedInDocking) {
            ctx.fillStyle = "rgba(192, 58, 43, 0.22)";
          } else if (item.data.isDisplaceable) {
            ctx.fillStyle = "rgba(232, 201, 106, 0.28)";
          } else {
            ctx.fillStyle = "rgba(59, 110, 245, 0.32)";
          }
          ctx.fill();
          ctx.restore();

          // 2. Main Water Sphere
          if (isDisplacedInDocking) {
            // Displaced ghost ring
            ctx.save();
            ctx.beginPath();
            ctx.arc(px, py, r, 0, Math.PI * 2);
            ctx.strokeStyle = "#E74C3C";
            ctx.lineWidth = 2;
            ctx.setLineDash([3, 3]);
            ctx.stroke();
            ctx.setLineDash([]);
            ctx.restore();
          } else if (item.data.isDisplaceable) {
            // Hot water sphere (Gold / Crimson)
            const baseC = item.data.deltaG > 3.5 ? "#E74C3C" : "#E8C96A";
            drawSphere(px, py, r, baseC, "#FFFFFF", "#4A3B05");
          } else {
            // Structural water sphere (Physics Blue)
            drawSphere(px, py, r, "#1B4FD8", "#70A0FF", "#07174A");
          }

          // 3. Explicit H2O Dipoles in GCMC Mode
          if (currentMode === "gcmc") {
            const hAngle = time * 2.8 + item.data.id * 1.5;
            const hDist = r * 1.6;
            const h1x = px + Math.cos(hAngle) * hDist;
            const h1y = py + Math.sin(hAngle) * hDist;
            const h2x = px + Math.cos(hAngle + 1.82) * hDist;
            const h2y = py + Math.sin(hAngle + 1.82) * hDist;

            ctx.save();
            ctx.beginPath();
            ctx.moveTo(px, py);
            ctx.lineTo(h1x, h1y);
            ctx.moveTo(px, py);
            ctx.lineTo(h2x, h2y);
            ctx.strokeStyle = "rgba(250, 251, 255, 0.75)";
            ctx.lineWidth = 1.4;
            ctx.stroke();

            ctx.fillStyle = "#FFFFFF";
            ctx.beginPath();
            ctx.arc(h1x, h1y, Math.max(1.5, r * 0.4), 0, Math.PI * 2);
            ctx.arc(h2x, h2y, Math.max(1.5, r * 0.4), 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
          }

          // 4. Thermodynamic Typography Tags
          if (stateRef.current.showLabels && perspective > 0.6) {
            ctx.save();
            const sign = item.data.deltaG > 0 ? "+" : "";
            const tag = currentMode === "delta_g"
              ? `${item.data.label} ${sign}${item.data.deltaG}ΔG`
              : item.data.label;

            const fontSize = Math.max(10, Math.round(11 * perspective));
            ctx.font = `bold ${fontSize}px ui-monospace, monospace`;

            // Text background pill
            const textWidth = ctx.measureText(tag).width;
            const tagX = px + r + 5;
            const tagY = py - 6;

            ctx.fillStyle = "rgba(8, 10, 16, 0.85)";
            ctx.strokeStyle = item.data.isDisplaceable ? "rgba(232, 201, 106, 0.4)" : "rgba(59, 110, 245, 0.4)";
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.roundRect(tagX - 3, tagY - fontSize + 2, textWidth + 6, fontSize + 4, 3);
            ctx.fill();
            ctx.stroke();

            ctx.fillStyle = item.data.isDisplaceable ? "#E8C96A" : "#70A0FF";
            ctx.fillText(tag, tagX, tagY);
            ctx.restore();
          }
        }
      });

      // Update hover state
      setHoveredEntity(foundHover);

      ctx.restore();
      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      resizeObserver.disconnect();
    };
  }, []);

  // Pointer Interaction Handlers for 3D Drag Rotation
  const handlePointerDown = (e: React.PointerEvent) => {
    stateRef.current.isDragging = true;
    stateRef.current.startX = e.clientX;
    stateRef.current.startY = e.clientY;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    const container = containerRef.current;
    if (container) {
      const rect = container.getBoundingClientRect();
      stateRef.current.mouseX = e.clientX - rect.left;
      stateRef.current.mouseY = e.clientY - rect.top;
    }

    if (!stateRef.current.isDragging) return;
    const dx = e.clientX - stateRef.current.startX;
    const dy = e.clientY - stateRef.current.startY;
    stateRef.current.startX = e.clientX;
    stateRef.current.startY = e.clientY;

    stateRef.current.targetAngleY += dx * 0.009;
    stateRef.current.targetAngleX += dy * 0.009;
    stateRef.current.targetAngleX = Math.max(-0.95, Math.min(0.95, stateRef.current.targetAngleX));
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    stateRef.current.isDragging = false;
    try {
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // Ignored if capture was already released
    }
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY < 0 ? 0.08 : -0.08;
    handleZoom(delta);
  };

  return (
    <div className="relative w-full rounded-md bg-[#0C0F1A] border border-white/[0.08] p-3 sm:p-5 shadow-2xl overflow-hidden">
      {/* Simulation Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/[0.06]">
        <div className="flex items-center gap-2.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#1B4FD8] animate-pulse" />
          <span className="text-[0.72rem] font-mono uppercase tracking-[0.16em] text-[#FAFBFF]">
            {site.simulation.title}
          </span>
          <span className="text-[0.65rem] px-2 py-0.5 rounded-full bg-[#1B4FD8]/20 text-[#70A0FF] border border-[#1B4FD8]/30 font-mono">
            {site.simulation.badge}
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
            {site.simulation.modes.deltaG}
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
            {site.simulation.modes.gcmc}
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
            {site.simulation.modes.docking}
          </button>
        </div>
      </div>

      {/* Main Interactive Stage */}
      <div
        ref={containerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={() => {
          stateRef.current.isDragging = false;
          stateRef.current.mouseX = -9999;
          stateRef.current.mouseY = -9999;
          setHoveredEntity(null);
        }}
        onWheel={handleWheel}
        className="relative w-full h-[340px] sm:h-[430px] cursor-grab active:cursor-grabbing touch-none select-none my-2 overflow-hidden rounded bg-[#070912]"
      >
        <canvas ref={canvasRef} className="w-full h-full block" />

        {/* Pocket Layer Controls Overlay (Top Left) */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-[#080A10]/90 backdrop-blur-md px-2.5 py-1.5 rounded-sm border border-white/[0.08] text-[0.68rem] font-mono z-10 shadow-lg">
          <button
            type="button"
            onClick={() => setShowReceptor(!showReceptor)}
            className={`flex items-center gap-1 px-1.5 py-0.5 rounded cursor-pointer transition-colors ${
              showReceptor ? "text-[#70A0FF] bg-[#1B4FD8]/25" : "text-[#8B91B0] hover:text-[#FAFBFF]"
            }`}
            title={site.simulation.controls.tooltipPocket}
          >
            {showReceptor ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
            <span>{site.simulation.controls.pocket}</span>
          </button>
          <span className="text-white/20">|</span>
          <button
            type="button"
            onClick={() => setShowGrid(!showGrid)}
            className={`flex items-center gap-1 px-1.5 py-0.5 rounded cursor-pointer transition-colors ${
              showGrid ? "text-[#E8C96A] bg-[#C9A84C]/25" : "text-[#8B91B0] hover:text-[#FAFBFF]"
            }`}
            title={site.simulation.controls.tooltipField}
          >
            <Layers className="w-3 h-3" />
            <span>{site.simulation.controls.field}</span>
          </button>
          <span className="text-white/20">|</span>
          <button
            type="button"
            onClick={() => setShowLabels(!showLabels)}
            className={`flex items-center gap-1 px-1.5 py-0.5 rounded cursor-pointer transition-colors ${
              showLabels ? "text-[#FAFBFF] bg-white/10" : "text-[#8B91B0] hover:text-[#FAFBFF]"
            }`}
            title={site.simulation.controls.tooltipTags}
          >
            <span>{site.simulation.controls.tags}</span>
          </button>
        </div>

        {/* Zoom Controls Pill (Top Right) */}
        <div className="absolute top-3 right-3 flex items-center gap-1 bg-[#080A10]/90 backdrop-blur-md p-1 rounded-sm border border-white/[0.08] text-xs z-10 shadow-lg font-mono">
          <button
            type="button"
            onClick={() => handleZoom(-0.15)}
            className="w-6 h-6 flex items-center justify-center rounded hover:bg-white/10 text-[#8B91B0] hover:text-[#FAFBFF] transition-colors cursor-pointer"
            title={site.simulation.controls.zoomOut}
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <span className="text-[0.65rem] px-1 text-[#C9A84C] font-semibold min-w-[40px] text-center">
            {Math.round(zoomLevel * 100)}%
          </span>
          <button
            type="button"
            onClick={() => handleZoom(0.15)}
            className="w-6 h-6 flex items-center justify-center rounded hover:bg-white/10 text-[#8B91B0] hover:text-[#FAFBFF] transition-colors cursor-pointer"
            title={site.simulation.controls.zoomIn}
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Interactive Hover HUD Tooltip */}
        {hoveredEntity && (
          <div className="absolute top-14 left-3 bg-[#080A10]/95 backdrop-blur-md border border-[#C9A84C]/40 p-2.5 rounded-sm text-xs z-10 shadow-2xl max-w-xs animate-in fade-in duration-150">
            <div className="flex items-center gap-1.5 text-[0.72rem] font-bold text-[#FAFBFF]">
              <Info className="w-3.5 h-3.5 text-[#C9A84C]" />
              <span>{hoveredEntity.title}</span>
            </div>
            <div className="text-[0.68rem] text-[#D4D8EB] mt-1 font-mono">{hoveredEntity.details}</div>
            <div className="text-[0.62rem] text-[#8B91B0] mt-0.5 font-mono">{hoveredEntity.metrics}</div>
          </div>
        )}

        {/* GCMC Live Telemetry Pill (when in GCMC mode) */}
        {mode === "gcmc" && (
          <div className="absolute top-14 right-3 bg-[#080A10]/90 backdrop-blur-md border border-[#3B6EF5]/30 px-2.5 py-1.5 rounded-sm text-[0.65rem] font-mono text-[#70A0FF] z-10 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#3B6EF5] animate-ping" />
            <span>{site.simulation.telemetry.gcmcSampling}</span>
          </div>
        )}

        {/* Thermodynamic Telemetry Banner (Bottom Left/Center) */}
        <div className="absolute bottom-3 left-3 right-3 sm:right-auto sm:max-w-sm bg-[#080A10]/92 backdrop-blur-md border border-white/[0.08] p-3 rounded-sm text-xs pointer-events-auto shadow-2xl z-10">
          <div className="flex items-center justify-between text-[0.68rem] text-[#8B91B0] pb-1.5 border-b border-white/[0.06]">
            <span className="font-mono text-[#FAFBFF] font-semibold">{site.simulation.controls.telemetryTitle}</span>
            <span className="text-[#C9A84C] font-mono">{site.simulation.controls.telemetryTemp}</span>
          </div>

          <div className="grid grid-cols-3 gap-2 pt-2 text-center font-mono">
            <div className="p-1 rounded bg-white/[0.02] border border-white/[0.04]">
              <div className="text-[0.62rem] uppercase text-[#8B91B0]">{site.simulation.controls.telemetryHot}</div>
              <div className="text-sm font-bold text-[#C03A2B]">{site.simulation.telemetry.hotSites}</div>
              <div className="text-[0.6rem] text-[#E8C96A]">{site.simulation.telemetry.hotEnergy}</div>
            </div>
            <div className="p-1 rounded bg-white/[0.02] border border-white/[0.04]">
              <div className="text-[0.62rem] uppercase text-[#8B91B0]">{site.simulation.controls.telemetryStructural}</div>
              <div className="text-sm font-bold text-[#3B6EF5]">{site.simulation.telemetry.structuralSites}</div>
              <div className="text-[0.6rem] text-[#8B91B0]">{site.simulation.telemetry.structuralEnergy}</div>
            </div>
            <div className="p-1 rounded bg-white/[0.02] border border-white/[0.04]">
              <div className="text-[0.62rem] uppercase text-[#8B91B0]">{site.simulation.controls.telemetryDisplacement}</div>
              <div className="text-sm font-bold text-[#C9A84C]">{site.simulation.telemetry.displacementGain}</div>
              <div className="text-[0.6rem] text-[#FAFBFF]">{site.simulation.telemetry.displacementKd}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Bottom Control Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-white/[0.06] text-[0.72rem] text-[#8B91B0]">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex items-center gap-1.5 hover:text-[#FAFBFF] bg-white/[0.04] hover:bg-white/[0.08] px-2.5 py-1 rounded-sm transition-colors cursor-pointer"
            aria-label={isPlaying ? "Pause rotation" : "Play rotation"}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span>{isPlaying ? site.simulation.controls.pause : site.simulation.controls.rotate}</span>
          </button>

          <button
            type="button"
            onClick={resetView}
            className="flex items-center gap-1.5 hover:text-[#FAFBFF] bg-white/[0.04] hover:bg-white/[0.08] px-2.5 py-1 rounded-sm transition-colors cursor-pointer"
            aria-label="Reset simulation perspective"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{site.simulation.controls.reset}</span>
          </button>
        </div>

        <div className="flex items-center gap-3 font-mono text-[0.65rem]">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#E8C96A] shadow-sm shadow-[#E8C96A]/50" /> {site.simulation.controls.legendDisplaceable}
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#1B4FD8] shadow-sm shadow-[#1B4FD8]/50" /> {site.simulation.controls.legendStructural}
          </span>
          <span className="hidden sm:flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#48C774]" /> {site.simulation.controls.legendLigand}
          </span>
        </div>
      </div>
    </div>
  );
}
