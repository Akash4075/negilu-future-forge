import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { PageHeader, Section } from "@/components/site/ui";
import { useLang } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — Booking, Orders & Pricing | Negilu Machinery" },
      {
        name: "description",
        content:
          "Answers about booking a Negilu agricultural machine, the difference between bookings and orders, pricing and the ₹25 team contact charge.",
      },
      { property: "og:title", content: "Questions, Answered | Negilu Machinery" },
      { property: "og:description", content: "Bookings, orders, pricing and contacting our team." },
    ],
  }),
  component: FaqPage,
});

const items = [
  { q: "faq.q1", a: "faq.a1" },
  { q: "faq.q2", a: "faq.a2" },
  { q: "faq.q3", a: "faq.a3" },
  { q: "faq.q4", a: "faq.a4" },
];

function FaqPage() {
  const { t } = useLang();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <>
      <PageHeader label="FAQ" title={t("faq.title")} />
      <Section>
        <div className="mx-auto max-w-3xl">
          {items.map((it, i) => (
            <div key={it.q} className="border-b border-border">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="flex w-full items-center justify-between gap-6 py-6 text-left"
              >
                <span className="font-display text-lg font-bold uppercase tracking-tight">
                  {t(it.q)}
                </span>
                <span className={cn("text-primary transition-transform", open === i && "rotate-45")}>
                  +
                </span>
              </button>
              {open === i ? (
                <p className="pb-6 text-muted-foreground">{t(it.a)}</p>
              ) : null}
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
