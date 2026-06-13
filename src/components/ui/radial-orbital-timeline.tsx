"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { ArrowRight, Link, X, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";

interface TimelineItem {
  id: number;
  title: string;
  date: string;
  content: string;
  category: string;
  icon: React.ComponentType<{ size?: number; strokeWidth?: number; className?: string }>;
  relatedIds: number[];
  status: "completed" | "in-progress" | "pending";
  energy: number;
}

interface RadialOrbitalTimelineProps {
  timelineData: TimelineItem[];
}

export default function RadialOrbitalTimeline({
  timelineData,
}: RadialOrbitalTimelineProps) {
  const [mounted, setMounted] = useState(false);
  const [rotationAngle, setRotationAngle] = useState<number>(0);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [pulseEffect, setPulseEffect] = useState<Record<number, boolean>>({});
  const [activeNodeId, setActiveNodeId] = useState<number | null>(null);
  const [radius, setRadius] = useState(160);
  const containerRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Record<number, HTMLDivElement | null>>({});

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w < 640) setRadius(110);
      else if (w < 1024) setRadius(150);
      else setRadius(180);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const dismiss = useCallback(() => {
    setActiveNodeId(null);
    setPulseEffect({});
    setAutoRotate(true);
  }, []);

  const toggleItem = useCallback((id: number) => {
    setActiveNodeId((prev) => {
      if (prev === id) {
        setAutoRotate(true);
        setPulseEffect({});
        return null;
      }
      setAutoRotate(false);
      const relatedItems = getRelatedItems(id);
      const newPulseEffect: Record<number, boolean> = {};
      relatedItems.forEach((relId) => {
        newPulseEffect[relId] = true;
      });
      setPulseEffect(newPulseEffect);
      centerViewOnNode(id);
      return id;
    });
  }, [timelineData]);

  useEffect(() => {
    let rotationTimer: ReturnType<typeof setInterval>;

    if (autoRotate) {
      rotationTimer = setInterval(() => {
        setRotationAngle((prev) => {
          const newAngle = (prev + 0.3) % 360;
          return Number(newAngle.toFixed(3));
        });
      }, 50);
    }

    return () => {
      if (rotationTimer) {
        clearInterval(rotationTimer);
      }
    };
  }, [autoRotate]);

  const centerViewOnNode = (nodeId: number) => {
    if (!nodeRefs.current[nodeId]) return;

    const nodeIndex = timelineData.findIndex((item) => item.id === nodeId);
    const totalNodes = timelineData.length;
    const targetAngle = (nodeIndex / totalNodes) * 360;

    setRotationAngle(270 - targetAngle);
  };

  const calculateNodePosition = (index: number, total: number) => {
    const angle = ((index / total) * 360 + rotationAngle) % 360;
    const radian = (angle * Math.PI) / 180;

    const x = radius * Math.cos(radian);
    const y = radius * Math.sin(radian);

    const zIndex = Math.round(100 + 50 * Math.cos(radian));
    const opacity = Math.max(
      0.35,
      Math.min(1, 0.35 + 0.65 * ((1 + Math.sin(radian)) / 2))
    );

    return { x, y, angle, zIndex, opacity };
  };

  const getRelatedItems = (itemId: number): number[] => {
    const currentItem = timelineData.find((item) => item.id === itemId);
    return currentItem ? currentItem.relatedIds : [];
  };

  const isRelatedToActive = (itemId: number): boolean => {
    if (!activeNodeId) return false;
    const relatedItems = getRelatedItems(activeNodeId);
    return relatedItems.includes(itemId);
  };

  if (!mounted) return null;

  return (
    <section id="journey" className="relative z-10 py-24 md:py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-4">
          <span className="text-[10px] font-mono text-white/40 tracking-[1px] uppercase">
            [ 04 ]  Journey
          </span>
        </div>
        <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-medium text-foreground tracking-tight mb-4 leading-[1.05]">
          Orbital Timeline
        </h2>
        <p className="text-white/50 text-base md:text-lg leading-relaxed max-w-2xl mb-16">
          My path through time &mdash; tap a node to explore.
        </p>

        <div
          ref={containerRef}
          onClick={() => { if (activeNodeId) dismiss(); }}
          className="relative w-full min-h-[400px] sm:min-h-[480px] md:min-h-[560px] flex items-center justify-center border border-white/[0.06] bg-card overflow-visible"
        >
          <AnimatePresence>
            {activeNodeId !== null && (
              <motion.div
                key="backdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="absolute inset-0 z-30 bg-black/40"
                onClick={dismiss}
              />
            )}
          </AnimatePresence>

          <div
            className="absolute flex items-center justify-center pointer-events-none"
            ref={orbitRef}
          >
            <div className="z-20 flex items-center justify-center">
              <div className="w-10 h-10 md:w-12 md:h-12 border border-white/20 flex items-center justify-center bg-black">
                <div className="w-5 h-5 md:w-6 md:h-6 bg-white/10" />
              </div>
              <div className="absolute w-14 h-14 md:w-16 md:h-16 border border-white/[0.06] opacity-50" />
              <div
                className="absolute w-16 h-16 md:w-[72px] md:h-[72px] border border-white/[0.04] opacity-30"
                style={{ animationDelay: "0.5s" }}
              />
            </div>

            <div
              className="absolute border border-white/[0.06]"
              style={{ width: radius * 2, height: radius * 2, borderRadius: "50%" }}
            />
          </div>

          {/* Nodes */}
          {timelineData.map((item, index) => {
            const position = calculateNodePosition(index, timelineData.length);
            const isRelated = isRelatedToActive(item.id);
            const isActive = activeNodeId === item.id;
            const isPulsing = pulseEffect[item.id];
            const Icon = item.icon;

            return (
              <div
                key={item.id}
                ref={(el) => { nodeRefs.current[item.id] = el; }}
                className="absolute"
                style={{
                  transform: `translate(${position.x}px, ${position.y}px)`,
                  zIndex: isActive ? 40 : position.zIndex,
                  opacity: activeNodeId !== null && !isActive && !isRelated ? 0.15 : (isActive ? 1 : position.opacity),
                  transition: "transform 0.8s cubic-bezier(0.25, 0.1, 0.25, 1), opacity 0.7s ease-out",
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleItem(item.id);
                }}
              >
                <div
                  style={{
                    width: `${item.energy * 0.4 + 40}px`,
                    height: `${item.energy * 0.4 + 40}px`,
                    left: `-${(item.energy * 0.4 + 40 - 36) / 2}px`,
                    top: `-${(item.energy * 0.4 + 40 - 36) / 2}px`,
                    pointerEvents: "none",
                    border: isPulsing ? "1px solid rgba(255,255,255,0.15)" : "1px solid transparent",
                    opacity: isPulsing ? 1 : 0,
                    transition: "opacity 0.5s ease, border-color 0.5s ease",
                  }}
                  className="absolute"
                />

                <div
                  className={`w-9 h-9 flex items-center justify-center border transition-all duration-300 cursor-pointer ${
                    isActive
                      ? "bg-white text-black border-white scale-110"
                      : isRelated
                      ? "bg-white/15 text-white border-white/60"
                      : "bg-black text-white/70 border-white/20 hover:border-white/40"
                  }`}
                >
                  <Icon size={14} strokeWidth={1.5} />
                </div>

                <span
                  className={`absolute top-10 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-mono tracking-wider uppercase transition-all duration-300 pointer-events-none ${
                    isActive ? "text-white" : isRelated ? "text-white/70" : "text-white/50"
                  }`}
                >
                  {item.title}
                </span>
              </div>
            );
          })}

          {/* ─── CENTERED DETAIL CARD ─── */}
          <AnimatePresence>
            {activeNodeId !== null && (() => {
              const item = timelineData.find((i) => i.id === activeNodeId);
              if (!item) return null;
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.85, y: 24 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.85, y: 24 }}
                  transition={{ type: "spring", damping: 22, stiffness: 300, mass: 0.8 }}
                  className="absolute z-50 inset-0 flex items-center justify-center p-4"
                >
                  <Card
                    className="w-64 bg-black/95 border-white/[0.06]"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <CardContent className="p-5">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <Badge
                            variant={item.status === "completed" ? "default" : item.status === "in-progress" ? "outline" : "secondary"}
                          >
                            {item.status === "completed" ? "Done" : item.status === "in-progress" ? "Live" : "Next"}
                          </Badge>
                          <span className="text-[10px] font-mono text-white/30 ml-2">{item.date}</span>
                        </div>
                        <button
                          onClick={dismiss}
                          className="w-6 h-6 flex items-center justify-center border border-white/[0.06] hover:border-white/20 text-white/40 hover:text-white transition-colors"
                        >
                          <X size={12} strokeWidth={1.5} />
                        </button>
                      </div>

                      <h4 className="font-display text-base font-medium text-white mb-1.5">{item.title}</h4>
                      <p className="text-xs text-white/55 leading-relaxed mb-3">{item.content}</p>

                      <div className="mb-3 pt-2.5 border-t border-white/[0.06]">
                        <div className="flex justify-between items-center mb-1">
                          <span className="flex items-center gap-1 text-[10px] font-mono text-white/30">
                            <Zap size={10} /> Energy
                          </span>
                          <span className="text-[10px] font-mono text-white/50">{item.energy}%</span>
                        </div>
                        <div className="w-full h-px bg-white/[0.06] relative">
                          <div
                            className="absolute top-0 left-0 h-px bg-white/40 transition-all duration-700"
                            style={{ width: `${item.energy}%` }}
                          />
                        </div>
                      </div>

                      {item.relatedIds.length > 0 && (
                        <div className="pt-2.5 border-t border-white/[0.06]">
                          <div className="flex items-center gap-1 mb-2">
                            <Link size={10} className="text-white/30" />
                            <span className="text-[10px] font-mono text-white/30 uppercase tracking-wider">Connected</span>
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            {item.relatedIds.map((relatedId) => {
                              const relatedItem = timelineData.find((i) => i.id === relatedId);
                              return (
                                <button
                                  key={relatedId}
                                  onClick={(e) => { e.stopPropagation(); toggleItem(relatedId); }}
                                  className="inline-flex items-center gap-1 h-6 px-2 text-[10px] font-mono border border-white/[0.06] hover:border-white/20 text-white/50 hover:text-white transition-colors bg-transparent"
                                >
                                  {relatedItem?.title}
                                  <ArrowRight size={8} className="text-white/30" />
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })()}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
