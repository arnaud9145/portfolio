type Entry = { count: number; reset: number };
const store = new Map<string, Entry>();

// Limiteur en mémoire. Note : sur Vercel serverless, l'état est par-instance
// et se réinitialise au cold start — protection best-effort, pas absolue.
export function rateLimit(
  key: string,
  opts: { limit?: number; windowMs?: number } = {}
): { allowed: boolean } {
  const limit = opts.limit ?? 5;
  const windowMs = opts.windowMs ?? 60_000;
  const now = Date.now();
  const entry = store.get(key);

  if (!entry || now > entry.reset) {
    store.set(key, { count: 1, reset: now + windowMs });
    return { allowed: true };
  }
  entry.count += 1;
  return { allowed: entry.count <= limit };
}
