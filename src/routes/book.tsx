import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";

import { CtaButton, PageHeader, Section } from "@/components/site/ui";
import { useLang } from "@/lib/i18n";
import { customMachine, machines } from "@/lib/machines";
import { generateBookingId, saveBooking, type Booking } from "@/lib/bookings";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/book")({
  validateSearch: (search: Record<string, unknown>) => ({
    machine: typeof search['machine'] === "string" ? (search['machine'] as string) : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Book Your Machine — Negilu Machinery" },
      {
        name: "description",
        content:
          "Book a Negilu agricultural machine in four steps: choose a machine, share your requirements, add your details and confirm. You receive a booking ID instantly.",
      },
      { property: "og:title", content: "Book Your Machine — Negilu Machinery" },
      {
        property: "og:description",
        content: "A real machinery booking process for farms across India.",
      },
    ],
  }),
  component: BookPage,
});

const STEPS = ["book.step1", "book.step2", "book.step3", "book.step4"];
const FARM_TYPES = ["ft.agri", "ft.seri", "ft.irrigation", "ft.spraying", "ft.transport", "ft.other"];
const FARM_SIZES = ["fs.1", "fs.2", "fs.3", "fs.4"];
const CONTACT_METHODS = ["cm.phone", "cm.whatsapp", "cm.email"];

const fieldClass =
  "h-12 w-full border border-input bg-surface/60 px-4 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary";

function Chip({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "border px-4 py-2.5 font-display text-xs font-bold uppercase tracking-[0.12em] transition-colors",
        active
          ? "border-primary bg-primary text-primary-foreground"
          : "border-border text-muted-foreground hover:border-primary/60 hover:text-foreground",
      )}
    >
      {children}
    </button>
  );
}

function BookPage() {
  const { t } = useLang();
  const navigate = useNavigate();
  const search = Route.useSearch();

  const [step, setStep] = useState(0);
  const [error, setError] = useState("");
  const [confirmed, setConfirmed] = useState<Booking | null>(null);

  const [machineSlug, setMachineSlug] = useState(search.machine ?? "");
  const [purpose, setPurpose] = useState("");
  const [farmType, setFarmType] = useState("");
  const [farmSize, setFarmSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [stateName, setStateName] = useState("");
  const [district, setDistrict] = useState("");
  const [village, setVillage] = useState("");
  const [contactMethod, setContactMethod] = useState("cm.phone");

  const options = [
    ...machines.map((m) => ({ slug: m.slug, nameKey: m.nameKey, catKey: m.categoryKey, image: m.image })),
    { slug: customMachine.slug, nameKey: customMachine.nameKey, catKey: customMachine.categoryKey, image: null },
  ];

  const selected = options.find((o) => o.slug === machineSlug);

  const next = () => {
    setError("");
    if (step === 0 && !machineSlug) return setError(t("book.required"));
    if (step === 1 && (!farmType || !farmSize)) return setError(t("book.required"));
    if (step === 2 && (!name.trim() || phone.replace(/\D/g, "").length < 10))
      return setError(t("book.required"));
    setStep((s) => Math.min(s + 1, 3));
  };

  const submit = () => {
    const booking: Booking = {
      id: generateBookingId(),
      createdAt: new Date().toISOString(),
      machineSlug,
      purpose,
      farmType,
      farmSize,
      quantity,
      notes,
      name,
      phone,
      email,
      state: stateName,
      district,
      village,
      contactMethod,
      stage: 0,
    };
    saveBooking(booking);
    setConfirmed(booking);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (confirmed) {
    return (
      <Section className="min-h-[80svh] pt-40">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-auto max-w-2xl border border-border bg-surface/50 p-8 text-center md:p-14"
        >
          <p className="label-tech text-primary">Confirmation</p>
          <h1 className="display-xl mt-4 text-[clamp(2rem,5vw,3.4rem)]">{t("book.received")}</h1>
          <p className="mt-4 text-muted-foreground">{t("book.thanks")}</p>
          <div className="mt-8 border border-primary/40 bg-background p-6">
            <p className="label-tech">{t("order.bookingId")}</p>
            <p className="mt-2 font-mono text-2xl text-primary">{confirmed.id}</p>
          </div>
          <p className="mt-6 text-sm text-muted-foreground">{t("book.willContact")}</p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              to="/order"
              className="inline-flex h-12 items-center justify-center bg-primary px-6 font-display text-xs font-bold uppercase tracking-[0.14em] text-primary-foreground"
            >
              {t("book.trackBooking")} →
            </Link>
            <Link
              to="/"
              className="inline-flex h-12 items-center justify-center border border-border px-6 font-display text-xs font-bold uppercase tracking-[0.14em]"
            >
              {t("book.backHome")}
            </Link>
          </div>
        </motion.div>
      </Section>
    );
  }

  return (
    <>
      <PageHeader label="Booking" title={t("book.title")} sub={t("quick.sub")} />

      <Section>
        {/* step indicator */}
        <ol className="grid gap-px border border-border bg-border sm:grid-cols-4">
          {STEPS.map((s, i) => (
            <li
              key={s}
              className={cn(
                "flex items-center gap-3 bg-background p-4 transition-colors",
                i === step && "bg-primary/10",
              )}
            >
              <span
                className={cn(
                  "font-mono text-xs",
                  i <= step ? "text-primary" : "text-muted-foreground",
                )}
              >
                0{i + 1}
              </span>
              <span
                className={cn(
                  "font-display text-xs font-bold uppercase tracking-[0.14em]",
                  i === step ? "text-foreground" : "text-muted-foreground",
                )}
              >
                {t(s)}
              </span>
            </li>
          ))}
        </ol>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35 }}
            className="mt-12"
          >
            {step === 0 ? (
              <>
                <h2 className="display-xl text-2xl">{t("book.selectMachine")}</h2>
                <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
                  {options.map((o) => (
                    <button
                      key={o.slug}
                      type="button"
                      onClick={() => setMachineSlug(o.slug)}
                      className={cn(
                        "group flex flex-col overflow-hidden border text-left transition-all",
                        machineSlug === o.slug
                          ? "border-primary shadow-[var(--shadow-glow)]"
                          : "border-border hover:border-primary/50",
                      )}
                    >
                      <div className="aspect-[4/3] overflow-hidden bg-surface">
                        {o.image ? (
                          <img
                            src={o.image}
                            alt={t(o.nameKey)}
                            loading="lazy"
                            width={1408}
                            height={1008}
                            className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                        ) : (
                          <div className="grid-lines flex size-full items-center justify-center text-4xl text-primary">
                            +
                          </div>
                        )}
                      </div>
                      <div className="flex-1 p-5">
                        <p className="label-tech text-primary">{t(o.catKey)}</p>
                        <p className="mt-2 font-display text-sm font-extrabold uppercase leading-tight">
                          {t(o.nameKey)}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </>
            ) : null}

            {step === 1 ? (
              <div className="grid gap-10 lg:grid-cols-2">
                <div className="space-y-8">
                  <div>
                    <label className="label-tech" htmlFor="purpose">
                      {t("book.purpose")}
                    </label>
                    <input
                      id="purpose"
                      value={purpose}
                      onChange={(e) => setPurpose(e.target.value)}
                      className={cn(fieldClass, "mt-3")}
                    />
                  </div>
                  <div>
                    <p className="label-tech">{t("book.farmType")}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {FARM_TYPES.map((f) => (
                        <Chip key={f} active={farmType === f} onClick={() => setFarmType(f)}>
                          {t(f)}
                        </Chip>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="label-tech">{t("book.farmSize")}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {FARM_SIZES.map((f) => (
                        <Chip key={f} active={farmSize === f} onClick={() => setFarmSize(f)}>
                          {t(f)}
                        </Chip>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="label-tech">{t("book.quantity")}</p>
                    <div className="mt-3 flex w-fit items-center border border-border">
                      <button
                        type="button"
                        aria-label="decrease"
                        onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                        className="flex size-12 items-center justify-center text-lg hover:text-primary"
                      >
                        −
                      </button>
                      <span className="w-14 text-center font-mono text-lg">{quantity}</span>
                      <button
                        type="button"
                        aria-label="increase"
                        onClick={() => setQuantity((q) => q + 1)}
                        className="flex size-12 items-center justify-center text-lg hover:text-primary"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
                <div>
                  <label className="label-tech" htmlFor="notes">
                    {t("book.additional")}
                  </label>
                  <textarea
                    id="notes"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={12}
                    className="mt-3 w-full border border-input bg-surface/60 p-4 text-sm outline-none focus:border-primary"
                  />
                </div>
              </div>
            ) : null}

            {step === 2 ? (
              <div className="grid gap-6 md:grid-cols-2">
                {[
                  { id: "name", label: "book.name", value: name, set: setName, type: "text" },
                  { id: "phone", label: "book.phone", value: phone, set: setPhone, type: "tel" },
                  { id: "email", label: "book.email", value: email, set: setEmail, type: "email" },
                  { id: "state", label: "book.state", value: stateName, set: setStateName, type: "text" },
                  { id: "district", label: "book.district", value: district, set: setDistrict, type: "text" },
                  { id: "village", label: "book.village", value: village, set: setVillage, type: "text" },
                ].map((f) => (
                  <div key={f.id}>
                    <label className="label-tech" htmlFor={f.id}>
                      {t(f.label)}
                    </label>
                    <input
                      id={f.id}
                      type={f.type}
                      value={f.value}
                      onChange={(e) => f.set(e.target.value)}
                      className={cn(fieldClass, "mt-3")}
                    />
                  </div>
                ))}
                <div className="md:col-span-2">
                  <p className="label-tech">{t("book.contactMethod")}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {CONTACT_METHODS.map((c) => (
                      <Chip key={c} active={contactMethod === c} onClick={() => setContactMethod(c)}>
                        {t(c)}
                      </Chip>
                    ))}
                  </div>
                </div>
              </div>
            ) : null}

            {step === 3 ? (
              <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr]">
                <div className="metal-panel p-7">
                  <h2 className="display-xl text-2xl">{t("book.summary")}</h2>
                  <dl className="mt-6 divide-y divide-border">
                    {[
                      { k: t("book.step1"), v: selected ? t(selected.nameKey) : "—" },
                      { k: t("book.quantity"), v: String(quantity) },
                      { k: t("book.farmType"), v: farmType ? t(farmType) : "—" },
                      { k: t("book.farmSize"), v: farmSize ? t(farmSize) : "—" },
                      { k: t("book.purpose"), v: purpose || "—" },
                      { k: t("book.additional"), v: notes || "—" },
                      { k: t("book.name"), v: name || "—" },
                      { k: t("book.phone"), v: phone || "—" },
                      { k: t("book.email"), v: email || "—" },
                      {
                        k: t("book.state"),
                        v: [village, district, stateName].filter(Boolean).join(", ") || "—",
                      },
                      { k: t("book.contactMethod"), v: t(contactMethod) },
                    ].map((row) => (
                      <div key={row.k} className="flex justify-between gap-6 py-3 text-sm">
                        <dt className="text-muted-foreground">{row.k}</dt>
                        <dd className="max-w-[60%] text-right">{row.v}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
                <div className="flex flex-col justify-between gap-6 border border-primary/40 bg-primary/5 p-7">
                  <div>
                    <p className="label-tech text-primary">{t("book.price")}</p>
                    <p className="mt-3 font-display text-2xl font-extrabold">{t("book.priceTbd")}</p>
                    <p className="mt-4 text-sm text-muted-foreground">{t("book.willContact")}</p>
                  </div>
                  <CtaButton size="lg" onClick={submit}>
                    {t("book.confirm")}
                  </CtaButton>
                </div>
              </div>
            ) : null}
          </motion.div>
        </AnimatePresence>

        {error ? <p className="mt-6 text-sm text-destructive">{error}</p> : null}

        <div className="mt-12 flex items-center justify-between gap-4 border-t border-border pt-6">
          <CtaButton
            variant="ghost"
            arrow={false}
            disabled={step === 0}
            onClick={() => setStep((s) => Math.max(0, s - 1))}
          >
            ← {t("book.back")}
          </CtaButton>
          {step < 3 ? (
            <CtaButton onClick={next}>{t("book.next")}</CtaButton>
          ) : (
            <CtaButton variant="outline" arrow={false} onClick={() => navigate({ to: "/machines" })}>
              {t("cta.explore")}
            </CtaButton>
          )}
        </div>
      </Section>
    </>
  );
}
