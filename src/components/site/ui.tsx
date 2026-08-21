import { Link } from "@tanstack/react-router";
import { cva, type VariantProps } from "class-variance-authority";
import { motion, useInView } from "motion/react";
import { useRef, type ComponentProps, type ReactNode } from "react";

import { cn } from "@/lib/utils";

export const ctaVariants = cva(
  "group relative inline-flex items-center justify-center gap-3 font-display font-bold uppercase tracking-[0.14em] transition-all duration-300 disabled:opacity-40 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-primary-foreground hover:shadow-[var(--shadow-glow)] hover:-translate-y-0.5",
        outline:
          "border border-border bg-transparent text-foreground hover:border-primary hover:text-primary",
        ghost: "text-muted-foreground hover:text-foreground",
        steel: "metal-panel text-foreground hover:border-primary/60",
      },
      size: {
        sm: "h-9 px-4 text-[0.66rem]",
        md: "h-12 px-6 text-xs",
        lg: "h-14 px-8 text-sm",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

type CtaProps = VariantProps<typeof ctaVariants> & { className?: string; children: ReactNode };

export function Cta({
  to,
  variant,
  size,
  className,
  children,
  ...rest
}: CtaProps & { to: string } & Omit<ComponentProps<typeof Link>, "to" | "children">) {
  return (
    <Link to={to} className={cn(ctaVariants({ variant, size }), className)} {...rest}>
      <span>{children}</span>
      <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
    </Link>
  );
}

export function CtaButton({
  variant,
  size,
  className,
  children,
  arrow = true,
  ...rest
}: CtaProps & { arrow?: boolean } & ComponentProps<"button">) {
  return (
    <button className={cn(ctaVariants({ variant, size }), className)} {...rest}>
      <span>{children}</span>
      {arrow ? (
        <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
      ) : null}
    </button>
  );
}

export function Reveal({
  children,
  delay = 0,
  className,
  y = 28,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  y?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center gap-3">
      <span className="h-px w-10 bg-primary" />
      <span className="label-tech text-primary">{children}</span>
    </div>
  );
}

export function Section({
  children,
  className,
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={cn("relative px-5 py-24 md:px-10 md:py-32", className)}>
      <div className="mx-auto w-full max-w-7xl">{children}</div>
    </section>
  );
}

export function PageHeader({
  label,
  title,
  sub,
}: {
  label: string;
  title: string;
  sub?: string;
}) {
  return (
    <div className="border-b border-border bg-surface/40 px-5 pb-16 pt-36 md:px-10 md:pb-24 md:pt-44">
      <div className="mx-auto w-full max-w-7xl">
        <SectionLabel>{label}</SectionLabel>
        <h1 className="display-xl mt-6 text-[clamp(2.4rem,7vw,5.5rem)]">{title}</h1>
        {sub ? <p className="mt-5 max-w-2xl text-lg text-muted-foreground">{sub}</p> : null}
      </div>
    </div>
  );
}
