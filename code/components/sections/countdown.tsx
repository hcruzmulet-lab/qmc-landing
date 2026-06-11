"use client";
import { useEffect, useState } from "react";

type Parts = { d: number; h: number; m: number; s: number };

function diff(target: number): Parts {
  const ms = Math.max(0, target - Date.now());
  return {
    d: Math.floor(ms / 86_400_000),
    h: Math.floor((ms % 86_400_000) / 3_600_000),
    m: Math.floor((ms % 3_600_000) / 60_000),
    s: Math.floor((ms % 60_000) / 1000),
  };
}

// Live countdown to an ISO deadline. Renders nothing until mounted to avoid
// SSR/client hydration mismatch. Returns null once the deadline passes.
export function Countdown({ targetISO, className = "" }: { targetISO: string; className?: string }) {
  const target = new Date(targetISO).getTime();
  const [parts, setParts] = useState<Parts | null>(null);

  useEffect(() => {
    setParts(diff(target));
    const id = setInterval(() => setParts(diff(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  if (!parts) return null;
  if (parts.d + parts.h + parts.m + parts.s === 0) return null;

  const units: [number, string][] = [
    [parts.d, "días"],
    [parts.h, "hrs"],
    [parts.m, "min"],
    [parts.s, "seg"],
  ];

  return (
    <div className={`flex items-center gap-2 ${className}`} aria-label="Tiempo restante de la promoción">
      {units.map(([value, label], i) => (
        <div key={label} className="flex items-center gap-2">
          <div className="flex min-w-12 flex-col items-center rounded-lg bg-[var(--color-primary)] px-2 py-1 text-white">
            <span className="tabular-nums text-lg font-bold leading-none">{String(value).padStart(2, "0")}</span>
            <span className="mt-0.5 text-[10px] uppercase tracking-wide text-white/80">{label}</span>
          </div>
          {i < units.length - 1 && <span className="font-bold text-[var(--color-primary)]">:</span>}
        </div>
      ))}
    </div>
  );
}
