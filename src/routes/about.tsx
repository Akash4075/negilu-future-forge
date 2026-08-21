import { createFileRoute } from "@tanstack/react-router";

import heroField from "@/assets/hero-field.jpg";
import robotImg from "@/assets/machine-robot.jpg";
import { Cta, PageHeader, Reveal, Section, SectionLabel } from "@/components/site/ui";
import { useLang } from "@/lib/i18n";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Indian Agricultural Machinery Company | Negilu Machinery" },
      {
        name: "description",
        content:
          "Negilu Machinery builds machines, automation and intelligent systems so farmers can access powerful technology without unnecessary complexity.",
      },
      { property: "og:title", content: "We Don't Just Build Machines | Negilu Machinery" },
      {
        property: "og:description",
        content: "Why we exist, what we build and where we're going.",
      },
    ],
  }),
  component: AboutPage,
});

const JOURNEY = [
  "journey.idea",
  "journey.eng",
  "journey.proto",
  "journey.test",
  "journey.machine",
  "journey.farm",
];

function AboutPage() {
  const { t } = useLang();
  const blocks = [
    { k: "about.why", d: "about.why.d" },
    { k: "about.what", d: "about.what.d" },
    { k: "about.where", d: "about.where.d" },
  ];

  return (
    <>
      <PageHeader label="About" title={t("about.title")} sub={t("about.lead")} />

      <Section>
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div className="relative aspect-[4/3] overflow-hidden border border-border">
            <img
              src={heroField}
              alt="Agricultural field at dusk"
              loading="lazy"
              width={1920}
              height={1088}
              className="size-full object-cover"
            />
            <img
              src={robotImg}
              alt="Negilu field robot"
              loading="lazy"
              width={1408}
              height={1008}
              className="absolute bottom-0 right-0 w-2/3 object-contain drop-shadow-2xl"
            />
          </div>
          <div className="space-y-10">
            {blocks.map((b, i) => (
              <Reveal key={b.k} delay={i * 0.08}>
                <div className="border-l-2 border-primary pl-6">
                  <p className="label-tech text-primary">{t(b.k)}</p>
                  <p className="mt-3 font-display text-xl font-bold leading-snug md:text-2xl">
                    {t(b.d)}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      <Section className="border-t border-border bg-surface/40">
        <SectionLabel>{t("journey.title")}</SectionLabel>
        <div className="mt-12 grid gap-px bg-border md:grid-cols-3 lg:grid-cols-6">
          {JOURNEY.map((j, i) => (
            <Reveal key={j} delay={i * 0.08}>
              <div className="flex h-40 flex-col justify-between bg-background p-6">
                <span className="font-mono text-[0.6rem] text-primary">STEP 0{i + 1}</span>
                <span className="font-display text-lg font-extrabold uppercase leading-tight">
                  {t(j)}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="mt-12 flex flex-wrap gap-3">
          <Cta to="/machines" variant="outline">
            {t("cta.explore")}
          </Cta>
          <Cta to="/book">{t("cta.bookMachine")}</Cta>
        </div>
      </Section>
    </>
  );
}
