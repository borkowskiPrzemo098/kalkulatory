import Link from "next/link";
import { ChevronRight } from "lucide-react";

export interface Crumb {
  href: string;
  label: string;
}

export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: `https://borkowskiprzemo098.github.io/kalkulatory${item.href}`,
    })),
  };

  return (
    <nav aria-label="Okruszki nawigacyjne">
      <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-[0.9375rem] font-medium text-ink-3">
        {items.map((item, index) => (
          <li key={item.href} className="flex items-center gap-1.5">
            {index > 0 && <ChevronRight aria-hidden className="h-4 w-4 text-line-strong" strokeWidth={2.5} />}
            {index === items.length - 1 ? (
              <span className="font-semibold text-ink" aria-current="page">
                {item.label}
              </span>
            ) : (
              <Link href={item.href} className="focus-ring rounded hover:text-green-700 hover:underline">
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </nav>
  );
}
