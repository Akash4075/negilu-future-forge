import { createFileRoute } from "@tanstack/react-router";

import { EngineeringDiagram, FarmerFirst, WhyNegilu } from "@/components/home/sections";
import { PageHeader } from "@/components/site/ui";
import { useLang } from "@/lib/i18n";

export const Route = createFileRoute("/technology")({
  head: () => ({
    meta: [
      { title: "Technology — Farm Automation, Robotics & AI | Negilu Machinery" },
      {
        name: "description",
        content:
          "Automation, robotics, IoT, AI, embedded systems and remote control: the engineering stack behind Negilu agricultural machines.",
      },
      { property: "og:title", content: "Inside the Engineering | Negilu Machinery" },
      {
        property: "og:description",
        content: "Sensors, control systems, intelligence, motors — how a Negilu machine works.",
      },
    ],
  }),
  component: TechnologyPage,
});

function TechnologyPage() {
  const { t } = useLang();
  return (
    <>
      <PageHeader label="Technology" title={t("eng.title")} sub={t("farmer.title")} />
      <EngineeringDiagram />
      <WhyNegilu />
      <FarmerFirst />
    </>
  );
}
