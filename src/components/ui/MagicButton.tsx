"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface MagicButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  icon?: React.ReactNode;
  position?: "left" | "right";
  className?: string;
}

export const MagicButton = ({
  children,
  icon,
  position = "right",
  className,
  ...props
}: MagicButtonProps) => {
  return (
    <button
      className={cn(
        "relative inline-flex h-14 w-full md:w-auto overflow-hidden rounded-none p-[1px] focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
        className
      )}
      {...props}
    >
      <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,var(--color-background)_0%,var(--color-primary)_50%,var(--color-background)_100%)]" />
      <span className="inline-flex h-full w-full cursor-pointer items-center justify-center bg-background px-8 py-3 text-xs uppercase tracking-widest font-semibold text-foreground backdrop-blur-3xl transition-colors hover:bg-background/90 gap-3">
        {position === "left" && icon}
        {children}
        {position === "right" && icon}
      </span>
    </button>
  );
};
