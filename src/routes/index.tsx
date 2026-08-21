import { createFileRoute } from "@tanstack/react-router";

import { Hero } from "@/components/home/Hero";
import {
  EngineeringDiagram,
  FarmerFirst,
  MachineShowcase,
  MachineViewer,
  QuickBooking,
  ScrollStory,
  TalkStrip,
  WhyNegilu,
} from "@/components/home/sections";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Negilu Machinery — Engineering the Future of Agriculture" },
      {
        name: "description",
        content:
          "Negilu Machinery designs agricultural machines, farm automation and agricultural robotics in India. Book a machine, explore our technology and talk to our engineering team.",
      },
      { property: "og:title", content: "Negilu Machinery — Engineering the Future of Agriculture" },
      {
        property: "og:description",
        content:
          "Smart machines. Practical engineering. Better farming. Agricultural machinery and robotics from India.",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Negilu Machinery",
          description:
            "Indian agricultural machinery and technology company developing modern machines, automation and intelligent agricultural solutions.",
          areaServed: "IN",
        }),
      },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <>
      <Hero />
      <QuickBooking />
      <MachineShowcase />
      <MachineViewer />
      <ScrollStory />
      <WhyNegilu />
      <EngineeringDiagram />
      <FarmerFirst />
      <TalkStrip />
    </>
  );
}
