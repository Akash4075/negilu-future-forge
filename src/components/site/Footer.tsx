import { Link } from "@tanstack/react-router";

import { useLang } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const cols: { key: string; links: { to: string; key: string }[] }[] = [
  {
    key: "nav.machines",
    links: [
      { to: "/machines", key: "nav.machines" },
      { to: "/technology", key: "nav.technology" },
      { to: "/book", key: "cta.bookAMachine" },
      { to: "/order", key: "nav.order" },
    ],
  },
  {
    key: "brand.name",
    links: [
      { to: "/about", key: "nav.about" },
      { to: "/team", key: "nav.team" },
      { to: "/contact", key: "nav.contact" },
      { to: "/faq", key: "nav.faq" },
    ],
  },
  {
    key: "footer.terms",
    links: [
      { to: "/privacy", key: "footer.privacy" },
      { to: "/terms", key: "footer.terms" },
      { to: "/refund", key: "footer.refund" },
    ],
  },
];

const socials = ["Instagram", "LinkedIn", "YouTube", "Facebook"];

export function Footer() {
  const { t, lang, setLang } = useLang();

  return (
    <footer className="relative border-t border-border bg-background px-5 pb-28 pt-20 md:px-10 md:pb-14">
      <div className="mx-auto w-full max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div>
            <h2 className="display-xl text-3xl">Negilu Machinery</h2>
            <p className="mt-3 max-w-xs text-muted-foreground">{t("brand.tagline")}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {socials.map((s) => (
                <span
                  key={s}
                  className="metal-panel px-3 py-1.5 font-mono text-[0.65rem] uppercase tracking-widest text-muted-foreground"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

          {cols.map((c) => (
            <div key={c.key}>
              <p className="label-tech">{t(c.key)}</p>
              <ul className="mt-4 space-y-2.5">
                {c.links.map((l) => (
                  <li key={l.to + l.key}>
                    <Link
                      to={l.to}
                      className="text-sm text-muted-foreground transition-colors hover:text-primary"
                    >
                      {t(l.key)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-border pt-6 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between">
          <p>{t("footer.rights")}</p>
          <div className="flex items-center gap-3">
            <span className="label-tech">{t("footer.language")}</span>
            <button
              onClick={() => setLang("en")}
              className={cn("transition-colors", lang === "en" ? "text-primary" : "hover:text-foreground")}
            >
              English
            </button>
            <span className="text-border">|</span>
            <button
              lang="kn"
              onClick={() => setLang("kn")}
              className={cn("transition-colors", lang === "kn" ? "text-primary" : "hover:text-foreground")}
            >
              ಕನ್ನಡ
            </button>
          </div>
        </div>
        <p className="mt-4 font-mono text-[0.65rem] text-muted-foreground/70">
          {t("footer.placeholderContact")}
        </p>
      </div>
    </footer>
  );
}

export function MobileTabBar() {
  const { t } = useLang();
  const items = [
    { to: "/", key: "nav.home" },
    { to: "/machines", key: "nav.machines" },
    { to: "/book", key: "nav.book", primary: true },
    { to: "/order", key: "nav.order" },
    { to: "/contact", key: "nav.contact" },
  ];
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/90 backdrop-blur-xl md:hidden">
      <div className="grid grid-cols-5">
        {items.map((i) => (
          <Link
            key={i.to}
            to={i.to}
            activeOptions={{ exact: i.to === "/" }}
            activeProps={{ className: "text-foreground" }}
            className={cn(
              "flex flex-col items-center justify-center gap-1 py-3 text-center font-display text-[0.58rem] font-bold uppercase tracking-[0.12em]",
              i.primary
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground",
            )}
          >
            {t(i.key)}
          </Link>
        ))}
      </div>
    </nav>
  );
}
