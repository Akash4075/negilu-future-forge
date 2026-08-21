/**
 * Local booking store.
 *
 * BOOKING = customer wants to purchase/discuss a machine.
 * ORDER   = confirmed purchase created from a booking after quotation.
 *
 * This mirrors the intended database shape so it can be swapped for
 * Lovable Cloud tables (bookings / orders) without changing the UI.
 */

export const ORDER_STAGES = [
  "os.1",
  "os.2",
  "os.3",
  "os.4",
  "os.5",
  "os.6",
  "os.7",
] as const;

export type Booking = {
  id: string;
  createdAt: string;
  machineSlug: string;
  purpose: string;
  farmType: string;
  farmSize: string;
  quantity: number;
  notes: string;
  name: string;
  phone: string;
  email: string;
  state: string;
  district: string;
  village: string;
  contactMethod: string;
  /** index into ORDER_STAGES */
  stage: number;
};

const KEY = "negilu.bookings";

export function generateBookingId() {
  const n = Math.floor(1000 + Math.random() * 9000);
  return `NM-BOOK-${n}`;
}

export function loadBookings(): Booking[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(window.localStorage.getItem(KEY) ?? "[]") as Booking[];
  } catch {
    return [];
  }
}

export function saveBooking(b: Booking) {
  const all = loadBookings();
  all.push(b);
  window.localStorage.setItem(KEY, JSON.stringify(all));
}

export function findBooking(id: string, phone: string) {
  const wanted = id.trim().toUpperCase();
  const digits = phone.replace(/\D/g, "").slice(-10);
  return (
    loadBookings().find(
      (b) => b.id.toUpperCase() === wanted && b.phone.replace(/\D/g, "").slice(-10) === digits,
    ) ?? null
  );
}
