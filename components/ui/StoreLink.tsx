export function StoreLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      aria-label={label}
      className="inline-flex items-center gap-1 text-accent underline underline-offset-4 hover:opacity-80"
    >
      {label} ↗
    </a>
  );
}
