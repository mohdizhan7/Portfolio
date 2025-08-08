export function asset(p: string | URL) {
  return new URL(p as string | URL, import.meta.env.BASE_URL).toString();
}
