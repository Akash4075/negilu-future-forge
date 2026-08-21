import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useState } from "react";

import { CtaButton, PageHeader, Section } from "@/components/site/ui";
import { findBooking, ORDER_STAGES, type Booking } from "@/lib/bookings";
import { useLang } from "@/lib/i18n";
import { getMachine } from "@/lib/machines";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/order")({
  head: () => ({
    meta: [
      { title: "Track Your Order — Negilu Machinery" },
      {
        name: "description",
        content:
          "Track a Negilu Machinery booking or order. Enter your booking ID and phone number to see the current status of your machine.",
      },
      { property: "og:title", content: "Your Order — Negilu Machinery" },
      { property: "og:description", content: "Check the status of your machine booking or order." },
    ],
  }),
  component: OrderPage,
});

const fieldClass =
  "h-12 w-full border border-input bg-surface/60 px-4 text-sm outline-none focus:border-primary";

function OrderPage() {
  const { t } = useLang();
  const [id, setId] = useState("");
  const [phone, setPhone] = useState("");
  const [result, setResult] = useState<Booking | null>(null);
  const [notFound, setNotFound] = useState(false);

  const check = () => {
    const b = findBooking(id, phone);
    setResult(b);
    setNotFound(!b);
  };

  const machine = result ? getMachine(result.machineSlug) : undefined;

  return (
    <>
      <PageHeader label="Order" title={t("order.title")} sub={t("order.sub")} />

      <Section>
        <div className="grid gap-10 lg:grid-cols-[380px_1fr]">
          <div className="metal-panel h-fit p-7">
            <label className="label-tech" htmlFor="bid">
              {t("order.bookingId")}
            </label>
            <input
              id="bid"
              value={id}
              onChange={(e) => setId(e.target.value)}
              placeholder="NM-BOOK-1234"
              className={cn(fieldClass, "mt-3")}
            />
            <label className="label-tech mt-6 block" htmlFor="ophone">
              {t("book.phone")}
            </label>
            <input
              id="ophone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className={cn(fieldClass, "mt-3")}
            />
            <CtaButton className="mt-6 w-full" onClick={check}>
              {t("order.check")}
            </CtaButton>
            {notFound ? (
              <p className="mt-4 text-sm text-destructive">{t("order.notFound")}</p>
            ) : null}
          </div>

          <div>
            {result ? (
              <>
                <div className="flex flex-wrap items-end justify-between gap-4 border-b border-border pb-6">
                  <div>
                    <p className="label-tech">{t("order.status")}</p>
                    <p className="mt-2 font-mono text-xl text-primary">{result.id}</p>
                  </div>
                  <p className="font-display text-sm font-bold uppercase tracking-[0.14em]">
                    {machine ? t(machine.nameKey) : t("m.custom.name")} × {result.quantity}
                  </p>
                </div>

                <ol className="mt-10 space-y-0">
                  {ORDER_STAGES.map((s, i) => {
                    const done = i <= result.stage;
                    return (
                      <motion.li
                        key={s}
                        initial={{ opacity: 0, x: -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.07 }}
                        className="relative flex gap-6 pb-10 last:pb-0"
                      >
                        <div className="flex flex-col items-center">
                          <span
                            className={cn(
                              "flex size-5 items-center justify-center rounded-full border",
                              done ? "border-primary bg-primary" : "border-border",
                            )}
                          />
                          {i < ORDER_STAGES.length - 1 ? (
                            <span
                              className={cn(
                                "w-px flex-1",
                                done ? "bg-primary" : "bg-border",
                              )}
                            />
                          ) : null}
                        </div>
                        <div className="-mt-1 pb-2">
                          <p
                            className={cn(
                              "font-display text-sm font-bold uppercase tracking-[0.14em]",
                              done ? "text-foreground" : "text-muted-foreground",
                            )}
                          >
                            {t(s)}
                          </p>
                          <p className="mt-1 font-mono text-[0.65rem] text-muted-foreground">
                            STAGE 0{i + 1}
                          </p>
                        </div>
                      </motion.li>
                    );
                  })}
                </ol>
              </>
            ) : (
              <div className="grid-lines flex min-h-[320px] items-center justify-center border border-dashed border-border p-10 text-center">
                <p className="max-w-sm text-muted-foreground">{t("order.sub")}</p>
              </div>
            )}
          </div>
        </div>
      </Section>
    </>
  );
}
