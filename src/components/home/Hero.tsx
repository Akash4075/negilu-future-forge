import { motion } from "motion/react";

import heroField from "@/assets/hero-field.jpg";
import robotImg from "@/assets/machine-robot.jpg";
import { Machine3D } from "@/components/three/Machine3D";
import { Cta } from "@/components/site/ui";
import { useLang } from "@/lib/i18n";

export function Hero() {
  const { t } = useLang();

  return (
    <section className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden">
      <img
        src={heroField}
        alt="Cinematic agricultural field at dusk"
        width={1920}
        height={1088}
        className="absolute inset-0 size-full object-cover opacity-45"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/40" />
      <div className="grid-lines absolute inset-0 opacity-30" />
      <div
        className="absolute inset-0"
        style={{ background: "var(--gradient-machine)" }}
        aria-hidden
      />

      <div className="absolute inset-y-0 right-0 w-full md:w-[62%]">
        <Machine3D fallbackImage={robotImg} className="relative size-full" />
      </div>

      <div className="relative mx-auto w-full max-w-[1600px] px-5 pb-24 pt-28 md:px-10 md:pb-20">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="label-tech text-primary"
        >
          {t("hero.label")}
        </motion.p>

        <h1 className="display-xl mt-5 text-[clamp(2.6rem,9vw,8.5rem)]">
          {["hero.l1", "hero.l2", "hero.l3"].map((k, i) => (
            <motion.span
              key={k}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.12 * i, ease: [0.16, 1, 0.3, 1] }}
              className="block"
            >
              {t(k)}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mt-6 max-w-md text-base text-muted-foreground md:text-lg"
        >
          {t("hero.sub")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.8 }}
          className="mt-9 flex flex-col gap-3 sm:flex-row"
        >
          <Cta to="/book" size="lg">
            {t("cta.bookMachine")}
          </Cta>
          <Cta to="/machines" variant="outline" size="lg">
            {t("cta.explore")}
          </Cta>
        </motion.div>

        <div className="mt-10 flex items-center gap-3">
          <span className="label-tech">{t("hero.scroll")}</span>
          <motion.span
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.8 }}
            className="text-primary"
          >
            ↓
          </motion.span>
        </div>
      </div>
    </section>
  );
}
