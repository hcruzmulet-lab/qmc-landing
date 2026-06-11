"use client";
import { useState } from "react";
import Link from "next/link";

export type AccordionItem = {
  id: string;
  title: string;
  imageUrl: string;
  href: string;
};

function fallback(title: string): string {
  return `https://placehold.co/600x760/103158/ffffff?text=${encodeURIComponent(title)}`;
}

export function ImageAccordion({
  items,
  initialActive = 0,
}: {
  items: AccordionItem[];
  initialActive?: number;
}) {
  const [active, setActive] = useState(initialActive);

  return (
    <div className="flex w-full flex-row items-stretch justify-center gap-3 overflow-x-auto p-1">
      {items.map((item, i) => {
        const isActive = i === active;
        return (
          <Link
            key={item.id}
            href={item.href}
            aria-label={item.title}
            onMouseEnter={() => setActive(i)}
            onFocus={() => setActive(i)}
            className={`group relative h-[420px] shrink-0 overflow-hidden rounded-2xl transition-[width] duration-500 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-secondary)] ${
              isActive ? "w-[300px] sm:w-[340px]" : "w-[60px] sm:w-[68px]"
            }`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={item.imageUrl}
              alt={item.title}
              className="absolute inset-0 h-full w-full object-cover"
              onError={(e) => {
                const img = e.currentTarget;
                img.onerror = null;
                img.src = fallback(item.title);
              }}
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-[var(--color-primary)]/85 via-[var(--color-primary)]/25 to-transparent"
            />
            <span
              className={`absolute font-[var(--font-heading)] font-semibold text-white drop-shadow-md transition-all duration-300 ${
                isActive
                  ? "bottom-5 left-5 text-lg"
                  : "bottom-6 left-1/2 -translate-x-1/2 rotate-90 whitespace-nowrap text-sm"
              }`}
            >
              {item.title}
            </span>
          </Link>
        );
      })}
    </div>
  );
}
