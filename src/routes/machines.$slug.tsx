import { createFileRoute, Link, notFound } from "@tanstack/react-router";

import { Machine3D } from "@/components/three/Machine3D";
import { Section, SectionLabel } from "@/components/site/ui";
import { dict, useLang } from "@/lib/i18n";
import { getMachine } from "@/lib/machines";

export const Route = createFileRoute("/machines/$slug")({
  loader: ({ params }) => {
    const machine = getMachine(params.slug);
    if (!machine) throw notFound();
    return { slug: machine.slug, nameKey: machine.nameKey, descKey: machine.descriptionKey };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Machine unavailable — Negilu Machinery" }, { name: "robots", content: "noindex" }] };
    }
    const name = dict[loaderData.nameKey]?.[0] ?? "Machine";
    const desc = dict[loaderData.descKey]?.[0] ?? "";
    return {
      meta: [
        { title: `${name} — Negilu Machinery` },
        { name: "description", content: desc },
        { property: "og:title", content: `${name} — Negilu Machinery` },
        { property: "og:description", content: desc },
      ],
    };
  },
  component: MachineDetail,
});

function MachineDetail() {
  const { slug } = Route.useLoaderData();
  const { t } = useLang();
  const machine = getMachine(slug)!;

  return (
    <>
      <div className="relative border-b border-border pt-20">
        <div className="mx-auto grid w-full max-w-[1600px] gap-8 px-5 py-14 md:px-10 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <div>
            <SectionLabel>{t(machine.categoryKey)}</SectionLabel>
            <h1 className="display-xl mt-5 text-[clamp(2.2rem,6vw,4.8rem)]">{t(machine.nameKey)}</h1>
            <p className="mt-5 max-w-xl text-lg text-muted-foreground">{t(machine.descriptionKey)}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/book"
                search={{ machine: machine.slug }}
                className="group inline-flex h-14 items-center justify-center gap-3 bg-primary px-8 font-display text-sm font-bold uppercase tracking-[0.14em] text-primary-foreground"
              >
                {t("cta.bookThis")}
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </Link>
              <Link
                to="/contact"
                className="inline-flex h-14 items-center justify-center gap-3 border border-border px-8 font-display text-sm font-bold uppercase tracking-[0.14em] hover:border-primary hover:text-primary"
              >
                {t("cta.talk")} →
              </Link>
            </div>
          </div>
          <div className="relative aspect-[4/3] border border-border bg-surface/40">
            <Machine3D
              fallbackImage={machine.image}
              interactive
              className="absolute inset-0"
            />
          </div>
        </div>
      </div>

      <Section>
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="display-xl text-2xl">{t("machines.features")}</h2>
            <ul className="mt-6 space-y-3">
              {machine.features.map((f, i) => (
                <li key={f} className="flex items-center gap-4 border-b border-border py-3">
                  <span className="font-mono text-[0.65rem] text-primary">0{i + 1}</span>
                  <span className="font-display text-sm font-bold uppercase tracking-[0.1em]">
                    {f}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="display-xl text-2xl">{t("machines.specs")}</h2>
            <dl className="mt-6 grid grid-cols-2 gap-px bg-border">
              {machine.specifications.map((s) => (
                <div key={s.label} className="bg-background p-5">
                  <dt className="label-tech">{s.label}</dt>
                  <dd className="mt-2 font-display text-lg font-bold">{s.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
        <div className="mt-12">
          <img
            src={machine.image}
            alt={t(machine.nameKey)}
            loading="lazy"
            width={1408}
            height={1008}
            className="w-full border border-border object-cover"
          />
        </div>
      </Section>
    </>
  );
}
