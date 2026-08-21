import { Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef, useState } from "react";

import robotImg from "@/assets/machine-robot.jpg";
import { Cta, CtaButton, Reveal, Section, SectionLabel } from "@/components/site/ui";
import { Machine3D } from "@/components/three/Machine3D";
import { useLang } from "@/lib/i18n";
import { machines } from "@/lib/machines";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */

export function QuickBooking() {
  const { t } = useLang();
  return (
    <Section className="border-y border-border bg-surface/60">
      <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-end">
        <div>
          <SectionLabel>01 — Booking</SectionLabel>
          <h2 className="display-xl mt-5 text-[clamp(2.2rem,6vw,4.5rem)]">{t("quick.title")}</h2>
          <p className="mt-4 max-w-lg text-lg text-muted-foreground">{t("quick.sub")}</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
          <Cta to="/book" size="lg">
            {t("cta.bookAMachine")}
          </Cta>
          <Cta to="/team" variant="outline" size="lg">
            {t("cta.talk")}
          </Cta>
        </div>
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ */

export function MachineShowcase() {
  const { t } = useLang();
  return (
    <Section id="machines">
      <SectionLabel>02 — Machines</SectionLabel>
      <h2 className="display-xl mt-5 max-w-4xl text-[clamp(2.2rem,6vw,4.6rem)]">
        {t("machines.title")}
      </h2>
      <p className="mt-4 text-lg text-muted-foreground">{t("machines.sub")}</p>

      <div className="mt-16 space-y-10">
        {machines.map((m, i) => (
          <Reveal key={m.slug} delay={i * 0.05}>
            <article className="metal-panel group grid overflow-hidden lg:grid-cols-[1.1fr_1fr]">
              <div className="relative aspect-[16/10] overflow-hidden bg-background">
                <img
                  src={m.image}
                  alt={t(m.nameKey)}
                  loading="lazy"
                  width={1408}
                  height={1008}
                  className="size-full object-cover transition-transform duration-[1.2s] group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-background/40" />
                <span className="absolute left-5 top-5 font-mono text-xs text-primary">
                  0{i + 1}
                </span>
              </div>
              <div className="flex flex-col justify-center gap-5 p-7 md:p-12">
                <p className="label-tech text-primary">{t(m.categoryKey)}</p>
                <h3 className="display-xl text-[clamp(1.6rem,3.4vw,2.6rem)]">{t(m.nameKey)}</h3>
                <p className="text-muted-foreground">{t(m.descriptionKey)}</p>
                <ul className="flex flex-wrap gap-2">
                  {m.features.map((f) => (
                    <li
                      key={f}
                      className="border border-border px-3 py-1 font-mono text-[0.65rem] uppercase tracking-widest text-muted-foreground"
                    >
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="mt-2 flex flex-col gap-3 sm:flex-row">
                  <Link
                    to="/machines/$slug"
                    params={{ slug: m.slug }}
                    className="group/btn inline-flex h-12 items-center justify-center gap-3 border border-border px-6 font-display text-xs font-bold uppercase tracking-[0.14em] transition-colors hover:border-primary hover:text-primary"
                  >
                    {t("cta.exploreMachine")}
                    <span className="transition-transform group-hover/btn:translate-x-1">→</span>
                  </Link>
                  <Link
                    to="/book"
                    search={{ machine: m.slug }}
                    className="group/btn inline-flex h-12 items-center justify-center gap-3 bg-primary px-6 font-display text-xs font-bold uppercase tracking-[0.14em] text-primary-foreground transition-shadow hover:shadow-[var(--shadow-glow)]"
                  >
                    {t(m.ctaKey)}
                    <span className="transition-transform group-hover/btn:translate-x-1">→</span>
                  </Link>
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-16">
        <div className="flex flex-col items-start justify-between gap-6 border border-dashed border-border p-8 md:flex-row md:items-center md:p-12">
          <div>
            <h3 className="display-xl text-[clamp(1.4rem,3vw,2.2rem)]">{t("machines.more")}</h3>
            <p className="mt-3 max-w-xl text-muted-foreground">{t("machines.moreSub")}</p>
          </div>
          <Cta to="/about" variant="outline">
            {t("cta.follow")}
          </Cta>
        </div>
      </Reveal>
    </Section>
  );
}

/* ------------------------------------------------------------------ */

const HOTSPOTS = [
  { id: "camera", key: "hs.camera", desc: "hs.camera.d" },
  { id: "motor", key: "hs.motor", desc: "hs.motor.d" },
  { id: "battery", key: "hs.battery", desc: "hs.battery.d" },
  { id: "sprayer", key: "hs.sprayer", desc: "hs.sprayer.d" },
  { id: "sensors", key: "hs.sensors", desc: "hs.sensors.d" },
];

export function MachineViewer() {
  const { t } = useLang();
  const [active, setActive] = useState<string | null>("camera");
  const [zoom, setZoom] = useState(0);
  const [autoRotate, setAutoRotate] = useState(true);
  const wrapRef = useRef<HTMLDivElement>(null);

  const activeHs = HOTSPOTS.find((h) => h.id === active);

  const fullscreen = () => {
    const el = wrapRef.current;
    if (!el) return;
    if (document.fullscreenElement) void document.exitFullscreen();
    else void el.requestFullscreen?.();
  };

  return (
    <Section className="border-y border-border bg-surface/40">
      <SectionLabel>03 — 3D Experience</SectionLabel>
      <h2 className="display-xl mt-5 max-w-3xl text-[clamp(2.2rem,6vw,4.6rem)]">
        {t("viewer.title")}
      </h2>
      <p className="mt-4 text-lg text-muted-foreground">{t("viewer.sub")}</p>

      <div ref={wrapRef} className="relative mt-12 grid gap-6 bg-background lg:grid-cols-[1.6fr_1fr]">
        <div className="relative aspect-[4/3] border border-border lg:aspect-auto lg:min-h-[560px]">
          <Machine3D
            fallbackImage={robotImg}
            interactive
            autoRotate={autoRotate}
            zoomSignal={zoom}
            activeHotspot={active}
            onHotspot={(id) => setActive(id)}
            className="absolute inset-0"
          />
          <div className="absolute bottom-4 left-4 flex gap-2">
            {[
              { label: "↻", title: t("viewer.rotate"), fn: () => setAutoRotate((v) => !v) },
              { label: "＋", title: t("viewer.zoomIn"), fn: () => setZoom((z) => z + 1) },
              { label: "−", title: t("viewer.zoomOut"), fn: () => setZoom((z) => z - 1) },
              { label: "⛶", title: t("viewer.fullscreen"), fn: fullscreen },
            ].map((b) => (
              <button
                key={b.title}
                onClick={b.fn}
                title={b.title}
                aria-label={b.title}
                className="metal-panel flex size-10 items-center justify-center text-sm transition-colors hover:border-primary hover:text-primary"
              >
                {b.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3 border border-border p-6">
          <p className="label-tech">Systems</p>
          {HOTSPOTS.map((h) => (
            <button
              key={h.id}
              onClick={() => setActive(h.id)}
              className={cn(
                "flex items-center justify-between border-b border-border py-3 text-left font-display text-sm font-bold uppercase tracking-[0.12em] transition-colors",
                active === h.id ? "text-primary" : "text-muted-foreground hover:text-foreground",
              )}
            >
              {t(h.key)}
              <span className="font-mono text-[0.6rem]">
                {active === h.id ? "ACTIVE" : "○"}
              </span>
            </button>
          ))}
          {activeHs ? (
            <motion.div
              key={activeHs.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 border-l-2 border-primary bg-surface/60 p-4"
            >
              <p className="font-display text-sm font-bold uppercase tracking-widest text-primary">
                {t(activeHs.key)}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">{t(activeHs.desc)}</p>
            </motion.div>
          ) : null}
        </div>
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ */

const SCENES = ["story.01", "story.02", "story.03", "story.04", "story.05", "story.06"];

export function ScrollStory() {
  const { t } = useLang();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1.05, 0.95]);

  return (
    <div ref={ref} className="relative" style={{ height: `${SCENES.length * 90}vh` }}>
      <div className="sticky top-0 flex h-[100svh] items-center overflow-hidden">
        <motion.div
          style={{ rotate, scale }}
          className="absolute inset-y-0 right-[-10%] w-[80%] opacity-70 md:right-0 md:w-1/2"
        >
          <img
            src={robotImg}
            alt="Negilu smart farm robot"
            loading="lazy"
            width={1408}
            height={1008}
            className="size-full object-contain"
          />
        </motion.div>
        <div className="grid-lines pointer-events-none absolute inset-0 opacity-20" />
        <div className="relative mx-auto w-full max-w-7xl px-5 md:px-10">
          {SCENES.map((s, i) => {
            const start = i / SCENES.length;
            const end = (i + 1) / SCENES.length;
            return (
              <SceneText
                key={s}
                index={i}
                text={t(s)}
                progress={scrollYProgress}
                range={[start, end]}
                last={i === SCENES.length - 1}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

function SceneText({
  index,
  text,
  progress,
  range,
  last,
}: {
  index: number;
  text: string;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  range: [number, number];
  last: boolean;
}) {
  const { t } = useLang();
  const [a, b] = range;
  const opacity = useTransform(progress, [a, a + 0.04, b - 0.04, b], [0, 1, 1, 0]);
  const y = useTransform(progress, [a, b], [40, -40]);

  return (
    <motion.div style={{ opacity, y }} className="absolute inset-x-5 md:inset-x-10">
      <p className="label-tech text-primary">SCENE 0{index + 1}</p>
      <h2 className="display-xl mt-4 max-w-2xl text-[clamp(2rem,6.5vw,5rem)]">{text}</h2>
      {last ? (
        <div className="mt-8">
          <Cta to="/book" size="lg">
            {t("cta.bookMachine")}
          </Cta>
        </div>
      ) : null}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */

export function WhyNegilu() {
  const { t } = useLang();
  const words = ["why.1", "why.2", "why.3", "why.4", "why.5"];
  const techs = [
    "tech.automation",
    "tech.robotics",
    "tech.iot",
    "tech.ai",
    "tech.embedded",
    "tech.remote",
  ];
  return (
    <Section className="border-t border-border">
      <SectionLabel>04 — Why Negilu</SectionLabel>
      <h2 className="display-xl mt-5 text-[clamp(2.2rem,6vw,4.6rem)]">{t("why.title")}</h2>
      <div className="mt-12 space-y-1">
        {words.map((w, i) => (
          <Reveal key={w} delay={i * 0.08} y={40}>
            <p className="display-xl border-b border-border py-4 text-[clamp(1.8rem,7vw,5.5rem)] text-muted-foreground transition-colors hover:text-primary">
              {t(w)}
            </p>
          </Reveal>
        ))}
      </div>
      <div className="mt-14 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
        {techs.map((tc, i) => (
          <Reveal key={tc} delay={i * 0.05}>
            <div className="metal-panel flex h-28 flex-col justify-between p-4 transition-colors hover:border-primary/60">
              <span className="font-mono text-[0.6rem] text-primary">0{i + 1}</span>
              <span className="font-display text-xs font-bold uppercase tracking-[0.14em]">
                {t(tc)}
              </span>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ */

const FLOW = ["eng.sensors", "eng.control", "eng.intel", "eng.motors", "eng.machine", "eng.farmer"];

export function EngineeringDiagram() {
  const { t } = useLang();
  return (
    <Section className="border-t border-border bg-surface/40">
      <SectionLabel>05 — Engineering</SectionLabel>
      <h2 className="display-xl mt-5 text-[clamp(2.2rem,6vw,4.6rem)]">{t("eng.title")}</h2>

      <div className="mt-14 grid gap-0 lg:grid-cols-6">
        {FLOW.map((f, i) => (
          <Reveal key={f} delay={i * 0.1}>
            <div className="relative flex h-full flex-col justify-between border border-border bg-background p-6">
              <span className="font-mono text-[0.6rem] text-primary">{`0${i + 1}`}</span>
              <span className="mt-8 font-display text-sm font-bold uppercase leading-tight tracking-[0.1em]">
                {t(f)}
              </span>
              <motion.span
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="mt-6 block h-px origin-left bg-primary"
              />
              {i < FLOW.length - 1 ? (
                <span className="absolute -bottom-3 left-1/2 z-10 -translate-x-1/2 text-primary lg:-right-3 lg:bottom-auto lg:left-auto lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-0">
                  <span className="lg:hidden">↓</span>
                  <span className="hidden lg:inline">→</span>
                </span>
              ) : null}
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ */

export function FarmerFirst() {
  const { t } = useLang();
  return (
    <Section className="border-t border-border">
      <div className="grid gap-12 lg:grid-cols-[1fr_auto] lg:items-end">
        <div>
          <SectionLabel>06 — Farmer First</SectionLabel>
          <h2 className="display-xl mt-5 max-w-4xl text-[clamp(2.2rem,6.5vw,5rem)]">
            {t("farmer.title")}
          </h2>
          <div className="mt-10 space-y-2">
            {["farmer.1", "farmer.2", "farmer.3"].map((k, i) => (
              <Reveal key={k} delay={i * 0.1}>
                <p className="font-display text-[clamp(1.2rem,3vw,2rem)] font-extrabold uppercase tracking-tight text-muted-foreground">
                  <span className="mr-4 font-mono text-xs text-primary">0{i + 1}</span>
                  {t(k)}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
        <Cta to="/technology" variant="outline" size="lg">
          {t("cta.exploreTech")}
        </Cta>
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ */

export function TalkStrip() {
  const { t } = useLang();
  return (
    <Section className="border-t border-border bg-primary/10">
      <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
        <div>
          <h2 className="display-xl text-[clamp(1.8rem,4.5vw,3.2rem)]">{t("cta.talk")}</h2>
          <p className="mt-3 text-muted-foreground">{t("team.sub")}</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Cta to="/team">{t("team.contactFor25")}</Cta>
          <Cta to="/contact" variant="outline">
            {t("contact.send")}
          </Cta>
        </div>
      </div>
    </Section>
  );
}

export { CtaButton };
