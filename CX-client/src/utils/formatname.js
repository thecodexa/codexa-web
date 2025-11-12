export const formatName = (first, last) => {
  if (!first && !last) return "";
  const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
  return `${cap(first)} ${cap(last)}`;
};
