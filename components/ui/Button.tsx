import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "gold" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

const base =
  "relative inline-flex items-center justify-center gap-2 font-semibold " +
  "transition-[transform,box-shadow,background-color,color] duration-200 " +
  "ease-[cubic-bezier(0.22,1,0.36,1)] select-none " +
  "hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] " +
  "disabled:pointer-events-none disabled:opacity-55 disabled:translate-y-0";

const variants: Record<Variant, string> = {
  primary:
    "bg-wine-800 text-bone-50 shadow-[var(--shadow-soft)] hover:bg-wine-700 hover:shadow-[var(--shadow-lift)]",
  gold: "bg-gold-500 text-wine-950 shadow-[var(--shadow-soft)] hover:bg-gold-400 hover:shadow-[var(--shadow-lift)]",
  outline:
    "border border-wine-800/25 text-wine-800 bg-transparent hover:bg-wine-800 hover:text-bone-50 hover:border-wine-800",
  ghost: "text-wine-800 hover:bg-wine-800/8",
};

const sizes: Record<Size, string> = {
  sm: "h-10 px-4 text-sm rounded-[var(--radius-sm)]",
  md: "h-12 px-6 text-[15px] rounded-[var(--radius-md)]",
  lg: "h-14 px-8 text-base rounded-[var(--radius-md)]",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...rest
}: CommonProps & ComponentProps<"button">) {
  return (
    <button
      className={cn(base, variants[variant], sizes[size], className)}
      {...rest}
    >
      {children}
    </button>
  );
}

export function ButtonLink({
  variant = "primary",
  size = "md",
  className,
  children,
  href,
  ...rest
}: CommonProps & ComponentProps<typeof Link>) {
  return (
    <Link
      href={href}
      className={cn(base, variants[variant], sizes[size], className)}
      {...rest}
    >
      {children}
    </Link>
  );
}
