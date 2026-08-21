import robotImg from "@/assets/machine-robot.jpg";
import silkImg from "@/assets/machine-silk.jpg";
import irrigationImg from "@/assets/machine-irrigation.jpg";

export type MachineConfig = {
  slug: string;
  nameKey: string;
  categoryKey: string;
  descriptionKey: string;
  /** Optional GLB path. When absent (or on load failure) the image is used. */
  modelUrl?: string;
  image: string;
  features: string[];
  specifications: { label: string; value: string }[];
  bookingEnabled: boolean;
  ctaKey: string;
};

/**
 * Machine catalogue. Specification values are editable placeholders —
 * no invented performance claims or prices.
 */
export const machines: MachineConfig[] = [
  {
    slug: "smart-farm-robot",
    nameKey: "m.robot.name",
    categoryKey: "m.robot.cat",
    descriptionKey: "m.robot.desc",
    image: robotImg,
    features: ["Machine vision", "Independent wheel drive", "Swappable battery", "Remote operation"],
    specifications: [
      { label: "Platform", value: "4-wheel electric" },
      { label: "Control", value: "Embedded + remote" },
      { label: "Payload", value: "To be confirmed" },
      { label: "Runtime", value: "To be confirmed" },
    ],
    bookingEnabled: true,
    ctaKey: "cta.bookThis",
  },
  {
    slug: "silkworm-automation",
    nameKey: "m.silk.name",
    categoryKey: "m.silk.cat",
    descriptionKey: "m.silk.desc",
    image: silkImg,
    features: ["Climate control", "Feeding automation", "Rack monitoring", "Alerts"],
    specifications: [
      { label: "Deployment", value: "Rearing house" },
      { label: "Control", value: "Panel + mobile" },
      { label: "Capacity", value: "Configurable" },
      { label: "Sensors", value: "Temp / humidity" },
    ],
    bookingEnabled: true,
    ctaKey: "cta.bookThis",
  },
  {
    slug: "smart-irrigation",
    nameKey: "m.irrigation.name",
    categoryKey: "m.irrigation.cat",
    descriptionKey: "m.irrigation.desc",
    image: irrigationImg,
    features: ["Soil sensing", "Zone scheduling", "Remote valves", "Usage logs"],
    specifications: [
      { label: "Zones", value: "Configurable" },
      { label: "Enclosure", value: "Weatherproof" },
      { label: "Connectivity", value: "IoT / GSM" },
      { label: "Power", value: "Mains / solar" },
    ],
    bookingEnabled: true,
    ctaKey: "cta.bookAMachine",
  },
];

export const customMachine = {
  slug: "custom",
  nameKey: "m.custom.name",
  categoryKey: "m.custom.cat",
  descriptionKey: "m.custom.desc",
};

export function getMachine(slug: string) {
  return machines.find((m) => m.slug === slug);
}
