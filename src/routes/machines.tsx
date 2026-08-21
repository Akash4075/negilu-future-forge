import { createFileRoute, Link } from "@tanstack/react-router";

import { PageHeader, Reveal, Section, Cta } from "@/components/site/ui";
import { useLang } from "@/lib/i18n";
import { machines } from "@/lib/machines";

export const Route = createFileRoute("/machines")({
  head: () => ({
    meta: [
      { title: "Machines — Agricultural Robots & Automation | Negilu Machinery" },
      {
        name: "description",
        content:
          "Explore Negilu machines: smart farm robot, silkworm farm automation and smart irrigation. Agricultural machinery engineered for Indian farms.",
      },
      { property: "og:title", content: "Machines Built for the Field | Negilu Machinery" },
      {
        property: "og:description",
        content: "Agricultural robotics, sericulture automation and smart irrigation systems.",
      },
    ],
  }),
  component: MachinesPage,
});

function MachinesPage() {
  const { t } = useLang();
  return (
    <>
      <PageHeader label="Catalogue" title={t("machines.title")} sub={t("machines.sub")} />
      <Section>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {machines.map((m, i) => (
            <Reveal key={m.slug} delay={i * 0.06}>
              <Link
                to="/machines/$slug"
                params={{ slug: m.slug }}
                className="metal-panel group flex h-full flex-col overflow-hidden transition-colors hover:border-primary/60"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={m.image}
                    alt={t(m.nameKey)}
                    loading="lazy"
                    width={1408}
                    height={1008}
                    className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col gap-3 p-6">
                  <p className="label-tech text-primary">{t(m.categoryKey)}</p>
                  <h2 className="font-display text-xl font-extrabold uppercase leading-tight">
                    {t(m.nameKey)}
                  </h2>
                  <p className="flex-1 text-sm text-muted-foreground">{t(m.descriptionKey)}</p>
                  <span className="font-display text-xs font-bold uppercase tracking-[0.14em] text-primary">
                    {t("cta.exploreMachine")} →
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-6 border border-dashed border-border p-8 md:flex-row md:items-center">
          <div>
            <h2 className="display-xl text-2xl">{t("machines.more")}</h2>
            <p className="mt-2 max-w-xl text-muted-foreground">{t("machines.moreSub")}</p>
          </div>
          <Cta to="/book">{t("cta.bookAMachine")}</Cta>
        </div>
      </Section>
    </>
  );
}
