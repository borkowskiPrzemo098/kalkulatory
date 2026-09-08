import type { LucideIcon } from "lucide-react";
import Link from "next/link";

interface ThemedBannerProps {
  eyebrow: string;
  title: string;
  text: string;
  icon: LucideIcon;
  href?: string;
  className?: string;
}

/**
 * Decorative, on-brand illustrated banner — used where a plain ad placeholder
 * or empty space would otherwise leave the page feeling bare. Not a real ad;
 * swap for an <AdPlaceholder /> or real ad unit whenever one is available.
 */
export default function ThemedBanner({ eyebrow, title, text, icon: Icon, href, className = "" }: ThemedBannerProps) {
  const content = (
    <>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(color-mix(in srgb, var(--accent) 30%, transparent) 1px, transparent 1px)",
          backgroundSize: "18px 18px",
          maskImage: "radial-gradient(ellipse 70% 100% at 85% 50%, black 20%, transparent 80%)",
          WebkitMaskImage: "radial-gradient(ellipse 70% 100% at 85% 50%, black 20%, transparent 80%)",
        }}
      />
      <Icon
        aria-hidden
        strokeWidth={1}
        className="pointer-events-none absolute -right-6 -top-6 h-40 w-40 text-accent opacity-[0.14] sm:h-48 sm:w-48"
      />
      <div className="relative flex items-center gap-5 px-6 py-7 sm:px-8">
        <span className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-surface text-accent shadow-sm sm:flex">
          <Icon className="h-6 w-6" strokeWidth={1.75} aria-hidden />
        </span>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">{eyebrow}</p>
          <p className="mt-1 font-display text-lg font-semibold text-foreground sm:text-xl">{title}</p>
          <p className="mt-1 max-w-xl text-sm leading-relaxed text-muted">{text}</p>
        </div>
      </div>
    </>
  );

  const sharedClassName = `focus-ring relative block overflow-hidden rounded-2xl border border-border bg-accent-soft ${href ? "hover:border-accent" : ""} ${className}`;

  if (href) {
    return (
      <Link href={href} className={sharedClassName}>
        {content}
      </Link>
    );
  }

  return <div className={sharedClassName}>{content}</div>;
}
