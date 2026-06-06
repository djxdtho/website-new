"use client";

import React, { useRef, useEffect } from "react";

const MONOCHROME_FILL = (opacity: number) => `rgba(255, 255, 255, ${Math.max(0, Math.min(1, opacity))})`;

type AnimateFunction = (timestamp: number) => void;
type SetupFunction = (ctx: CanvasRenderingContext2D, width: number, height: number) => AnimateFunction;

const animationLogic = {
    pulseWave: ((ctx, CANVAS_WIDTH, CANVAS_HEIGHT) => {
        const centerX = CANVAS_WIDTH / 2, centerY = CANVAS_HEIGHT / 2;
        let time = 0, lastTime = 0;
        const dotRings = [{ radius: 15, count: 6 }, { radius: 30, count: 12 }, { radius: 45, count: 18 }, { radius: 60, count: 24 }, { radius: 75, count: 30 }];
        return (timestamp) => {
            if (!lastTime) lastTime = timestamp;
            const dT = timestamp - lastTime; lastTime = timestamp; time += dT * 0.001;
            ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
            ctx.beginPath(); ctx.arc(centerX, centerY, 2, 0, Math.PI * 2); ctx.fillStyle = MONOCHROME_FILL(0.9); ctx.fill();
            dotRings.forEach((ring, rIdx) => {
                for (let i = 0; i < ring.count; i++) {
                    const angle = (i / ring.count) * Math.PI * 2, p = Math.sin(time * 2 - rIdx * 0.4) * 3;
                    const x = centerX + Math.cos(angle) * (ring.radius + p), y = centerY + Math.sin(angle) * (ring.radius + p);
                    const o = 0.4 + ((Math.sin(time * 2 - rIdx * 0.4 + i * 0.2) + 1) / 2) * 0.6;
                    ctx.beginPath(); ctx.arc(x, y, 2, 0, Math.PI * 2); ctx.fillStyle = MONOCHROME_FILL(o); ctx.fill();
                }
            });
        };
    }) as SetupFunction,
    pulseWaveBreathingGrid: ((ctx, CANVAS_WIDTH, CANVAS_HEIGHT) => {
        const centerX = CANVAS_WIDTH / 2, centerY = CANVAS_HEIGHT / 2;
        let time = 0, lastTime = 0;
        const gridSize = 9, spacing = 18, dots: {x:number, y:number}[] = [];
        const gridOffsetX = centerX - ((gridSize - 1) * spacing) / 2, gridOffsetY = centerY - ((gridSize - 1) * spacing) / 2;
        for (let r = 0; r < gridSize; r++) for (let c = 0; c < gridSize; c++) dots.push({ x: gridOffsetX + c * spacing, y: gridOffsetY + r * spacing });
        const waveSpeed = 60, waveThickness = 40, maxDist = Math.hypot(centerX, centerY) + waveThickness;
        return (timestamp) => {
            if (!lastTime) lastTime = timestamp;
            const dT = timestamp - lastTime; lastTime = timestamp; time += dT * 0.001;
            ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
            const waveCenterDist = (time * waveSpeed) % maxDist;
            dots.forEach(dot => {
                const distCenter = Math.hypot(dot.x - centerX, dot.y - centerY), distWave = Math.abs(distCenter - waveCenterDist);
                let pF = 0; if (distWave < waveThickness / 2) pF = Math.sin(((1 - distWave / (waveThickness / 2)) * Math.PI) / 2);
                const s = 1.5 + pF * 2.5, o = 0.2 + pF * 0.8;
                ctx.beginPath(); ctx.arc(dot.x, dot.y, s, 0, Math.PI * 2); ctx.fillStyle = MONOCHROME_FILL(o); ctx.fill();
            });
        };
    }) as SetupFunction,
};

export function BreathingGridCanvas({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0, lastTime = 0;

    const size = 180;
    canvas.width = size;
    canvas.height = size;

    const centerX = size / 2, centerY = size / 2;
    const gridSize = 9, spacing = 18;
    const dots: {x:number, y:number}[] = [];
    const gridOffsetX = centerX - ((gridSize - 1) * spacing) / 2;
    const gridOffsetY = centerY - ((gridSize - 1) * spacing) / 2;
    for (let r = 0; r < gridSize; r++)
      for (let c = 0; c < gridSize; c++)
        dots.push({ x: gridOffsetX + c * spacing, y: gridOffsetY + r * spacing });

    const waveSpeed = 60, waveThickness = 40;
    const maxDist = Math.hypot(centerX, centerY) + waveThickness;

    const render = (timestamp: number) => {
      if (!lastTime) lastTime = timestamp;
      const dT = timestamp - lastTime;
      lastTime = timestamp;
      time += dT * 0.001;
      ctx!.clearRect(0, 0, size, size);
      const waveCenterDist = (time * waveSpeed) % maxDist;
      dots.forEach(dot => {
        const distCenter = Math.hypot(dot.x - centerX, dot.y - centerY);
        const distWave = Math.abs(distCenter - waveCenterDist);
        let pF = 0;
        if (distWave < waveThickness / 2)
          pF = Math.sin(((1 - distWave / (waveThickness / 2)) * Math.PI) / 2);
        const s = 1.5 + pF * 2.5;
        const o = 0.2 + pF * 0.8;
        ctx!.beginPath();
        ctx!.arc(dot.x, dot.y, s, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(255, 255, 255, ${Math.max(0, Math.min(1, o))})`;
        ctx!.fill();
      });
      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ opacity: 0.04 }}
    />
  );
}
