import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const formatPhoneNumber = (phone: string) => {
  // Remove all non-numeric characters except +
  let formattedPhone = phone.replace(/[^\d+]/g, "");

  // Handle number formats based on conditions
  if (formattedPhone.startsWith("+234")) {
    formattedPhone = formattedPhone.slice(1); // Remove the "+"
  } else if (formattedPhone.startsWith("0")) {
    formattedPhone = "234" + formattedPhone.slice(1); // Replace leading "0" with "234"
  } else if (!formattedPhone.startsWith("234")) {
    formattedPhone = "234" + formattedPhone; // Prepend "234" if not already present
  }

  return formattedPhone;
};