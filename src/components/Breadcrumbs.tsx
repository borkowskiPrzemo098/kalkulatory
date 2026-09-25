import Link from "next/link";

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
      <ol className="caps flex flex-wrap items-center gap-x-2 gap-y-1 text-[0.7rem] text-ink-3">
        {items.map((item, index) => (
          <li key={item.href} className="flex items-center gap-2">
            {index > 0 && (
              <span aria-hidden className="h-px w-3 bg-hair-strong" />
            )}
            {index === items.length - 1 ? (
              <span className="text-ink" aria-current="page">
                {item.label}
              </span>
            ) : (
              <Link href={item.href} className="focus-ring hover:text-green">
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
