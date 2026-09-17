"use client";

import { useEffect, useRef } from "react";

interface WaterParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseVx: number;
  baseVy: number;
  angle: number;
  spinSpeed: number;
  size: number;
  opacity: number;
  phase: number;
  isHotSpot: boolean;
}

export default function SolvationFieldAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = 0;
    let height = 0;
    let time = 0;
    let mouseX = -9999;
    let mouseY = -9999;
    let isVisible = true;

    // Responsive Canvas Sizing
    const resize = () => {
      const rect = container.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const resizeObserver = new ResizeObserver(() => {
      resize();
    });
    resizeObserver.observe(container);
    resize();

    // Intersection Observer to pause when scrolled out of view
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
    });
    intersectionObserver.observe(container);

    // Solvent particles (Explicit H2O Dipoles)
    const particleCount = typeof window !== "undefined" && window.innerWidth < 768 ? 32 : 54;
    const particles: WaterParticle[] = Array.from({ length: particleCount }, (_, i) => {
      const vx = (Math.random() - 0.5) * 0.45;
      const vy = (Math.random() - 0.5) * 0.45;
      return {
        x: Math.random() * (width || 1200),
        y: Math.random() * (height || 800),
        vx,
        vy,
        baseVx: vx,
        baseVy: vy,
        angle: Math.random() * Math.PI * 2,
        spinSpeed: (Math.random() - 0.5) * 0.015,
        size: 2.2 + Math.random() * 2.2,
        opacity: 0.18 + Math.random() * 0.35,
        phase: Math.random() * Math.PI * 2,
        isHotSpot: i % 7 === 0, // Rare high-energy thermodynamic water
      };
    });

    // Pointer Tracking for Fluid Wake
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouseX = -9999;
      mouseY = -9999;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseleave", handleMouseLeave, { passive: true });

    // Main 60 FPS Render Loop
    const render = () => {
      if (!isVisible) {
        animId = requestAnimationFrame(render);
        return;
      }

      time += 0.012;
      ctx.clearRect(0, 0, width, height);

      // 1. Soft Dynamic Solvation Potential Gradients (Density Waves)
      const grad1X = width * 0.3 + Math.sin(time * 0.4) * 120;
      const grad1Y = height * 0.4 + Math.cos(time * 0.5) * 80;
      const radial1 = ctx.createRadialGradient(grad1X, grad1Y, 20, grad1X, grad1Y, Math.min(width, height) * 0.55);
      radial1.addColorStop(0, "rgba(27, 79, 216, 0.09)");
      radial1.addColorStop(0.5, "rgba(27, 79, 216, 0.025)");
      radial1.addColorStop(1, "transparent");
      ctx.fillStyle = radial1;
      ctx.fillRect(0, 0, width, height);

      const grad2X = width * 0.75 + Math.cos(time * 0.3) * 100;
      const grad2Y = height * 0.35 + Math.sin(time * 0.45) * 70;
      const radial2 = ctx.createRadialGradient(grad2X, grad2Y, 20, grad2X, grad2Y, Math.min(width, height) * 0.45);
      radial2.addColorStop(0, "rgba(201, 168, 76, 0.055)");
      radial2.addColorStop(0.6, "rgba(201, 168, 76, 0.015)");
      radial2.addColorStop(1, "transparent");
      ctx.fillStyle = radial2;
      ctx.fillRect(0, 0, width, height);

      // 2. Dynamic Hydrogen-Bonding Network Lines
      const maxDistance = width < 768 ? 90 : 125;
      ctx.beginPath();
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.hypot(dx, dy);

          if (dist < maxDistance) {
            const alpha = (1 - dist / maxDistance) * 0.18;
            ctx.strokeStyle = particles[i].isHotSpot || particles[j].isHotSpot
              ? `rgba(232, 201, 106, ${alpha * 1.4})`
              : `rgba(59, 110, 245, ${alpha})`;
            ctx.lineWidth = dist < 65 ? 1 : 0.6;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // 3. Update & Draw Explicit H2O Water Dipoles
      particles.forEach((p) => {
        // Subtle Mouse Interaction (Liquid Displacement Wake)
        const dmx = p.x - mouseX;
        const dmy = p.y - mouseY;
        const distMouse = Math.hypot(dmx, dmy);
        if (distMouse < 140 && distMouse > 0) {
          const force = (1 - distMouse / 140) * 0.8;
          p.vx += (dmx / distMouse) * force;
          p.vy += (dmy / distMouse) * force;
        }

        // Return smoothly toward base drift velocity
        p.vx += (p.baseVx - p.vx) * 0.04;
        p.vy += (p.baseVy - p.vy) * 0.04;

        // Position update
        p.x += p.vx;
        p.y += p.vy;
        p.angle += p.spinSpeed;

        // Screen wrap-around with padding
        if (p.x < -30) p.x = width + 30;
        if (p.x > width + 30) p.x = -30;
        if (p.y < -30) p.y = height + 30;
        if (p.y > height + 30) p.y = -30;

        // Pulse intensity based on phase & thermodynamics
        const pulse = 1 + Math.sin(time * 2 + p.phase) * 0.22;
        const rOxygen = p.size * pulse;

        // Outer Glow Halo
        ctx.beginPath();
        ctx.arc(p.x, p.y, rOxygen * 2.6, 0, Math.PI * 2);
        ctx.fillStyle = p.isHotSpot
          ? `rgba(201, 168, 76, ${p.opacity * 0.3})`
          : `rgba(27, 79, 216, ${p.opacity * 0.35})`;
        ctx.fill();

        // Oxygen Core Sphere
        ctx.beginPath();
        ctx.arc(p.x, p.y, rOxygen, 0, Math.PI * 2);
        ctx.fillStyle = p.isHotSpot
          ? `rgba(232, 201, 106, ${p.opacity * 0.85})`
          : `rgba(112, 160, 255, ${p.opacity * 0.9})`;
        ctx.fill();

        // Paired Hydrogen Atoms (104.5 degree water geometry)
        const bondLength = rOxygen * 1.7;
        const hAngle1 = p.angle - 0.91; // ~52 degrees
        const hAngle2 = p.angle + 0.91;
        const h1x = p.x + Math.cos(hAngle1) * bondLength;
        const h1y = p.y + Math.sin(hAngle1) * bondLength;
        const h2x = p.x + Math.cos(hAngle2) * bondLength;
        const h2y = p.y + Math.sin(hAngle2) * bondLength;

        // Covalent O-H bonds
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(h1x, h1y);
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(h2x, h2y);
        ctx.strokeStyle = `rgba(250, 251, 255, ${p.opacity * 0.4})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();

        // Hydrogen Spheres
        const rH = Math.max(1, rOxygen * 0.45);
        ctx.fillStyle = `rgba(250, 251, 255, ${p.opacity * 0.85})`;
        ctx.beginPath();
        ctx.arc(h1x, h1y, rH, 0, Math.PI * 2);
        ctx.arc(h2x, h2y, rH, 0, Math.PI * 2);
        ctx.fill();
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="fixed inset-0 overflow-hidden pointer-events-none z-0"
    >
      <canvas ref={canvasRef} className="w-full h-full block opacity-85" />
    </div>
  );
}
