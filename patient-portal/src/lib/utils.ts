import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import type { ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export function formatName(firstName: string, middleName: string | null, lastName: string | null) {
  const nameParts = [firstName, middleName, lastName]
    .filter((part) => part && part.trim() !== "")
    .map((part) => part!.trim());
  return nameParts.length > 0 ? nameParts.join(" ") : "--";
}

export function formatAddress(
  line1?: string | null,
  line2?: string | null,
  city?: string | null,
  state?: string | null,
  country?: string | null,
  pincode?: string | null
) {
  const addressParts = [line1, line2, city, state, country, pincode]
    .filter((part) => part && part.trim() !== "")
    .map((part) => part!.trim());

  return addressParts.length > 0 ? addressParts.join(", ") : "--";
}
