
export const capitalize = (str) => {
  if (!str) return ""; // <-- ADD THIS LINE (The Safety Guard)
  return str.charAt(0).toUpperCase() + str.slice(1);
};