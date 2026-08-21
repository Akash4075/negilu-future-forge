import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

import { CtaButton, PageHeader, Reveal, Section } from "@/components/site/ui";
import { useLang } from "@/lib/i18n";

export const Route = createFileRoute("/team")({
  head: () => ({
    meta: [
      { title: "Team — People Behind the Machines | Negilu Machinery" },
      {
        name: "description",
        content:
          "Meet the Negilu Machinery engineering team. Book a secure ₹25 call session with a team member — private numbers are never shown publicly.",
      },
      { property: "og:title", content: "People Behind the Machines | Negilu Machinery" },
      { property: "og:description", content: "Talk to the Negilu engineering team." },
    ],
  }),
  component: TeamPage,
});

/**
 * Editable placeholder profiles. Private phone numbers are NEVER stored or
 * rendered client-side — only the last four digits, supplied as a masked
 * display string, are shown.
 */
const team = [
  {
    id: "tm-1",
    name: "Team Member",
    role: "Engineering",
    department: "Machine Development",
    bio: "Placeholder profile. Replace with the official team member details.",
    maskedPhone: "+91 XXXXXXXX 4521",
    initials: "NM",
  },
  {
    id: "tm-2",
    name: "Team Member",
    role: "Automation",
    department: "Control Systems",
    bio: "Placeholder profile. Replace with the official team member details.",
    maskedPhone: "+91 XXXXXXXX 0000",
    initials: "NM",
  },
  {
    id: "tm-3",
    name: "Team Member",
    role: "Field Support",
    department: "Customer Operations",
    bio: "Placeholder profile. Replace with the official team member details.",
    maskedPhone: "+91 XXXXXXXX 0000",
    initials: "NM",
  },
];

function TeamPage() {
  const { t } = useLang();
  const [payFor, setPayFor] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  return (
    <>
      <PageHeader label="Team" title={t("team.title")} sub={t("team.sub")} />

      <Section>
        <p className="max-w-2xl text-sm text-muted-foreground">{t("team.placeholder")}</p>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {team.map((m, i) => (
            <Reveal key={m.id} delay={i * 0.06}>
              <article className="metal-panel flex h-full flex-col p-7">
                <div className="grid-lines flex aspect-square w-full items-center justify-center border border-border bg-background">
                  <span className="font-display text-4xl font-extrabold text-primary">
                    {m.initials}
                  </span>
                </div>
                <h2 className="mt-6 font-display text-xl font-extrabold uppercase">{m.name}</h2>
                <p className="label-tech mt-1 text-primary">{m.role}</p>
                <p className="mt-1 text-xs text-muted-foreground">{m.department}</p>
                <p className="mt-4 flex-1 text-sm text-muted-foreground">{m.bio}</p>
                <p className="mt-4 font-mono text-sm">{m.maskedPhone}</p>
                <p className="label-tech mt-1">{t("team.charge")}</p>
                <div className="mt-5 flex flex-col gap-2">
                  <CtaButton size="sm" onClick={() => setPayFor(m.id)}>
                    {t("team.callFor25")}
                  </CtaButton>
                  <div className="flex gap-2">
                    <CtaButton
                      size="sm"
                      variant="outline"
                      arrow={false}
                      className="flex-1"
                      onClick={() => setPayFor(m.id)}
                    >
                      WhatsApp
                    </CtaButton>
                    <CtaButton
                      size="sm"
                      variant="outline"
                      arrow={false}
                      className="flex-1"
                      onClick={() => setPayFor(m.id)}
                    >
                      Email
                    </CtaButton>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <p className="mt-10 max-w-3xl border-l-2 border-primary pl-5 text-sm text-muted-foreground">
          {t("team.privacyNote")}
        </p>
      </Section>

      <AnimatePresence>
        {payFor ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-background/80 p-5 backdrop-blur"
            onClick={() => {
              setPayFor(null);
              setPending(false);
            }}
          >
            <motion.div
              initial={{ scale: 0.96, y: 12 }}
              animate={{ scale: 1, y: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="metal-panel w-full max-w-md p-8"
            >
              <p className="label-tech text-primary">₹25</p>
              <h2 className="mt-3 font-display text-2xl font-extrabold uppercase">
                {t("team.payTitle")}
              </h2>
              <p className="mt-4 text-sm text-muted-foreground">{t("team.payBody")}</p>
              {pending ? (
                <p className="mt-5 border border-primary/40 bg-primary/5 p-4 text-sm">
                  {t("team.payPending")}
                </p>
              ) : null}
              <div className="mt-7 flex gap-3">
                <CtaButton className="flex-1" onClick={() => setPending(true)}>
                  {t("team.payProceed")}
                </CtaButton>
                <CtaButton
                  variant="ghost"
                  arrow={false}
                  onClick={() => {
                    setPayFor(null);
                    setPending(false);
                  }}
                >
                  {t("cancel")}
                </CtaButton>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
