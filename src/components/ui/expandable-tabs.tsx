"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOnClickOutside } from "usehooks-ts";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface Tab {
  title: string;
  icon: LucideIcon;
  type?: never;
}

interface Separator {
  type: "separator";
  title?: never;
  icon?: never;
}

type TabItem = Tab | Separator;

interface ExpandableTabsProps {
  tabs: TabItem[];
  className?: string;
  onChange?: (index: number | null) => void;
  size?: "sm" | "md" | "lg";
  selected?: number | null;
}

const buttonVariants = {
  initial: {
    gap: 0,
    paddingLeft: ".5rem",
    paddingRight: ".5rem",
  },
  animate: (isSelected: boolean) => ({
    gap: isSelected ? ".5rem" : 0,
    paddingLeft: isSelected ? "1rem" : ".5rem",
    paddingRight: isSelected ? "1rem" : ".5rem",
  }),
};

const spanVariants = {
  initial: { width: 0, opacity: 0 },
  animate: { width: "auto", opacity: 1 },
  exit: { width: 0, opacity: 0 },
};

const transition = { delay: 0.1, type: "spring" as const, bounce: 0, duration: 0.6 };

export function ExpandableTabs({
  tabs,
  className,
  onChange,
  size = "md",
  selected: controlledSelected,
}: ExpandableTabsProps) {
  const [internalSelected, setInternalSelected] = React.useState<number | null>(null);
  const [hovered, setHovered] = React.useState<number | null>(null);
  const outsideClickRef = React.useRef<HTMLDivElement>(null);

  const selected = controlledSelected !== undefined ? controlledSelected : internalSelected;

  useOnClickOutside(outsideClickRef as React.RefObject<HTMLElement>, () => {
    if (controlledSelected === undefined) {
      setInternalSelected(null);
    }
    onChange?.(null);
  });

  const handleSelect = (index: number) => {
    if (controlledSelected === undefined) {
      setInternalSelected(index);
    }
    onChange?.(index);
  };

  const sizeMap = {
    sm: { btn: "px-2 py-1 text-[10px]", icon: 12, gap: "gap-1" },
    md: { btn: "px-2.5 py-1.5 text-xs", icon: 14, gap: "gap-1.5" },
    lg: { btn: "px-3 py-2 text-sm", icon: 16, gap: "gap-2" },
  };

  const s = sizeMap[size];

  const SeparatorLine = () => (
    <div className={`mx-1 h-[20px] w-[1px] bg-white/[0.08] ${size === "lg" ? "h-6" : ""}`} aria-hidden="true" />
  );

  const isActive = (index: number) => selected === index || hovered === index;

  return (
    <div
      ref={outsideClickRef}
      className={cn(
        `inline-flex items-center ${s.gap} border border-white/[0.06] bg-card/80 backdrop-blur-md`,
        className
      )}
    >
      {tabs.map((tab, index) => {
        if (tab.type === "separator") {
          return <SeparatorLine key={`separator-${index}`} />;
        }

        const Icon = tab.icon;
        const active = isActive(index);

        return (
          <motion.button
            key={tab.title}
            variants={buttonVariants}
            initial={false}
            animate="animate"
            custom={active}
            onClick={() => handleSelect(index)}
            onMouseEnter={() => setHovered(index)}
            onMouseLeave={() => setHovered(null)}
            transition={transition}
            className={cn(
              `relative flex items-center rounded-none ${s.btn} font-mono tracking-wider uppercase transition-colors duration-200`,
              active
                ? "text-foreground bg-white/[0.06]"
                : "text-white/40 hover:text-white/70 hover:bg-white/[0.03]"
            )}
          >
            <Icon size={s.icon} strokeWidth={1.5} />
            <AnimatePresence initial={false}>
              {active && (
                <motion.span
                  variants={spanVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={transition}
                  className="overflow-hidden"
                >
                  {tab.title}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        );
      })}
    </div>
  );
}
