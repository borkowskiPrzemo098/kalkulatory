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
    <nav aria-label="Okruszki nawigacyjne" className="text-sm">
      <ol className="flex flex-wrap items-center gap-1 text-muted">
        {items.map((item, index) => (
          <li key={item.href} className="flex items-center gap-1">
            {index > 0 && (
              <span aria-hidden className="text-muted-2">
                /
              </span>
            )}
            {index === items.length - 1 ? (
              <span className="text-foreground" aria-current="page">
                {item.label}
              </span>
            ) : (
              <Link href={item.href} className="focus-ring hover:text-accent">
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </nav>
  );
}
