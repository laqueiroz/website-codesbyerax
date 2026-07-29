import { DownloadSection } from "@/components/home/DownloadSection";
import { Hero } from "@/components/home/Hero";
import { IntroOverlay } from "@/components/home/IntroOverlay";
import { PrinciplesSection } from "@/components/home/PrinciplesSection";
import { ProductsSection } from "@/components/home/ProductsSection";
import { RoadmapSection } from "@/components/home/RoadmapSection";
import { TechStackStrip } from "@/components/home/TechStackStrip";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { VinculoFeature } from "@/components/home/VinculoFeature";
import { JsonLd } from "@/components/seo/JsonLd";
import { softwareApplicationJsonLd } from "@/lib/seo";

/**
 * Home — direção "Carta celeste".
 * Ordem das seções conforme o handoff; cada uma é um componente próprio.
 */
export default function HomePage() {
  return (
    <>
      <IntroOverlay />
      <Hero />
      <ProductsSection />
      <PrinciplesSection />
      <TechStackStrip />
      <RoadmapSection />
      <VinculoFeature />
      <TestimonialsSection />
      <DownloadSection />
      <JsonLd data={softwareApplicationJsonLd()} />
    </>
  );
}
