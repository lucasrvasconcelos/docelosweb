export function generateSlug(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD") // remove acentos
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-")
}