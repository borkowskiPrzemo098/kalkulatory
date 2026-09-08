import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { calculators, getCalculatorBySlug } from "@/calculators/registry";
import CalculatorLayout from "@/components/CalculatorLayout";

export function generateStaticParams() {
  return calculators.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const config = getCalculatorBySlug(slug);
  if (!config) return {};

  return {
    title: config.name,
    description: config.metaDescription,
    alternates: { canonical: `/kalkulatory/${config.slug}` },
    openGraph: {
      title: config.name,
      description: config.metaDescription,
      url: `/kalkulatory/${config.slug}`,
    },
  };
}

export default async function CalculatorPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const config = getCalculatorBySlug(slug);
  if (!config) notFound();

  return <CalculatorLayout config={config} />;
}
