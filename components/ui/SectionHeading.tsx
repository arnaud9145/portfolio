import type { ReactNode } from "react";

export function SectionHeading({
  id,
  children,
}: {
  id: string;
  children: ReactNode;
}) {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-3">
        <span className="heading-rule" aria-hidden />
      </div>
      <h2
        id={id}
        className="mt-3 scroll-mt-24 font-display text-3xl font-semibold tracking-tight text-fg sm:text-4xl"
      >
        {children}
      </h2>
    </div>
  );
}
