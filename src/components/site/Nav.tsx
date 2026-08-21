import { Link, useRouterState } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

import { useLang } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { Cta } from "./ui";

const links = [
  { to: "/", key: "nav.home" },
  { to: "/machines", key: "nav.machines" },
  { to: "/technology", key: "nav.technology" },
  { to: "/about", key: "nav.about" },
  { to: "/team", key: "nav.team" },
  { to: "/contact", key: "nav.contact" },
] as const;

function LanguageSwitch({ className }: { className?: string }) {
  const { lang, setLang } = useLang();
  return (
    <div className={cn("flex items-center gap-1 font-mono text-xs", className)}>
      <button
        onClick={() => setLang("en")}
        aria-pressed={lang === "en"}
        className={cn(
          "px-2 py-1 tracking-widest transition-colors",
          lang === "en" ? "text-primary" : "text-muted-foreground hover:text-foreground",
        )}
      >
        EN
      </button>
      <span className="text-border">|</span>
      <button
        onClick={() => setLang("kn")}
        aria-pressed={lang === "kn"}
        lang="kn"
        className={cn(
          "px-2 py-1 transition-colors",
          lang === "kn" ? "text-primary" : "text-muted-foreground hover:text-foreground",
        )}
      >
        ಕನ್ನಡ
      </button>
    </div>
  );
}

export function Nav() {
  const { t } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          scrolled
            ? "border-b border-border bg-background/80 backdrop-blur-xl"
            : "border-b border-transparent bg-gradient-to-b from-background/70 to-transparent",
        )}
      >
        <div className="mx-auto flex h-16 w-full max-w-[1600px] items-center justify-between gap-6 px-5 md:h-20 md:px-10">
          <Link to="/" className="flex items-center gap-3">
            <span className="flex size-8 items-center justify-center border border-primary/60 font-display text-sm font-extrabold text-primary">
              N
            </span>
            <span className="font-display text-sm font-extrabold uppercase tracking-[0.18em] md:text-base">
              Negilu <span className="text-primary">Machinery</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="font-display text-[0.7rem] font-bold uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground"
                activeProps={{ className: "text-foreground" }}
                activeOptions={{ exact: l.to === "/" }}
              >
                {t(l.key)}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2 md:gap-4">
            <LanguageSwitch className="hidden sm:flex" />
            <Cta to="/book" size="sm" className="hidden sm:inline-flex">
              {t("nav.bookNow")}
            </Cta>
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? t("nav.close") : t("nav.menu")}
              className="flex size-10 flex-col items-center justify-center gap-1.5 border border-border lg:hidden"
            >
              <span
                className={cn(
                  "h-px w-5 bg-foreground transition-transform",
                  open && "translate-y-[3.5px] rotate-45",
                )}
              />
              <span
                className={cn(
                  "h-px w-5 bg-foreground transition-transform",
                  open && "-translate-y-[3.5px] -rotate-45",
                )}
              />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
            exit={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 flex flex-col justify-center bg-background px-6 pt-20 lg:hidden"
          >
            <div className="grid-lines pointer-events-none absolute inset-0 opacity-40" />
            <nav className="relative flex flex-col gap-1">
              {links.map((l, i) => (
                <motion.div
                  key={l.to}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.06 * i + 0.1 }}
                >
                  <Link
                    to={l.to}
                    className="block border-b border-border py-4 font-display text-3xl font-extrabold uppercase tracking-tight"
                  >
                    {t(l.key)}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <div className="relative mt-8 flex items-center justify-between">
              <LanguageSwitch />
              <Cta to="/book">{t("nav.bookNow")}</Cta>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
