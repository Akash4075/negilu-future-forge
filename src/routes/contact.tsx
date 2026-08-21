import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { CtaButton, PageHeader, Section } from "@/components/site/ui";
import { useLang } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Let's Talk Machines | Negilu Machinery" },
      {
        name: "description",
        content:
          "Contact Negilu Machinery for machine requirements, quotations, partnerships or technical support for agricultural automation in India.",
      },
      { property: "og:title", content: "Let's Talk Machines | Negilu Machinery" },
      { property: "og:description", content: "Machine requirements, quotations and support." },
    ],
  }),
  component: ContactPage,
});

const fieldClass =
  "h-12 w-full border border-input bg-surface/60 px-4 text-sm outline-none focus:border-primary";

function ContactPage() {
  const { t } = useLang();
  const [sent, setSent] = useState(false);

  return (
    <>
      <PageHeader label="Contact" title={t("contact.title")} />

      <Section>
        <div className="grid gap-14 lg:grid-cols-2">
          <div>
            <ul className="space-y-1">
              {["contact.p1", "contact.p2", "contact.p3", "contact.p4"].map((k, i) => (
                <li
                  key={k}
                  className="flex items-baseline gap-4 border-b border-border py-5 font-display text-[clamp(1.2rem,3vw,2rem)] font-extrabold uppercase tracking-tight"
                >
                  <span className="font-mono text-xs text-primary">0{i + 1}</span>
                  {t(k)}
                </li>
              ))}
            </ul>
            <div className="mt-10 flex flex-wrap gap-3">
              {[t("contact.call"), "WhatsApp", t("cm.email")].map((c) => (
                <span
                  key={c}
                  className="metal-panel px-5 py-3 font-display text-xs font-bold uppercase tracking-[0.14em]"
                >
                  {c}
                </span>
              ))}
            </div>
            <p className="mt-6 font-mono text-[0.65rem] text-muted-foreground">
              {t("footer.placeholderContact")}
            </p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
            className="metal-panel space-y-5 p-7 md:p-10"
          >
            {[
              { id: "cname", label: "book.name", type: "text" },
              { id: "cphone", label: "book.phone", type: "tel" },
              { id: "cemail", label: "book.email", type: "email" },
              { id: "csubject", label: "contact.subject", type: "text" },
            ].map((f) => (
              <div key={f.id}>
                <label className="label-tech" htmlFor={f.id}>
                  {t(f.label)}
                </label>
                <input id={f.id} type={f.type} required className={cn(fieldClass, "mt-2")} />
              </div>
            ))}
            <div>
              <label className="label-tech" htmlFor="cmsg">
                {t("contact.message")}
              </label>
              <textarea
                id="cmsg"
                rows={5}
                required
                className="mt-2 w-full border border-input bg-surface/60 p-4 text-sm outline-none focus:border-primary"
              />
            </div>
            <CtaButton className="w-full" size="lg">
              {t("contact.send")}
            </CtaButton>
            {sent ? <p className="text-sm text-primary">{t("contact.sent")}</p> : null}
          </form>
        </div>
      </Section>
    </>
  );
}
