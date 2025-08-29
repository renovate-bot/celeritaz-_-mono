import { customAlphabet } from "nanoid";

const defaultOptions = {
  prefix: "",
  size: 14,
};
export const generateUniqueId = (
  options: {
    prefix: string;
    size?: number;
  } = defaultOptions,
): string => {
  const { prefix, size } = { ...defaultOptions, ...options };
  let result = "";
  if (prefix) {
    result += `${prefix}_`;
  }

  if (size && size > 0) {
    result += customAlphabet(
      "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
      size,
    )();
  }
  return result;
};

export const generateIntegerUniqueId = (
  options: {
    prefix: string;
    size?: number;
  } = defaultOptions,
): string => {
  const { prefix, size } = { ...defaultOptions, ...options };
  let result = "";
  if (prefix) {
    result += `${prefix}_`;
  }

  if (size && size > 0) {
    result += customAlphabet("0123456789", size)();
  }
  return result;
};

export function generateEmployeeID(roleName: string): string {
  // Extract the last two digits of the year
  const yearSuffix = new Date().getFullYear();

  // Extract the first three alphabets from the role name and convert to uppercase
  const rolePrefix = roleName
    .replace(/[^a-zA-Z]/g, "")
    .slice(0, 3)
    .toUpperCase();

  // Ensure rolePrefix is at least three characters (padding with "X" if needed)
  const paddedRolePrefix = rolePrefix.padEnd(3, "X");

  // Generate a random 4-digit number
  const randomNumber = Math.floor(1000 + Math.random() * 9000); // Ensures a 4-digit number

  // Combine year, rolePrefix, and randomNumber to create the ID
  const id = `${yearSuffix}${paddedRolePrefix}${randomNumber}`;

  return id;
}
