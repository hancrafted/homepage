import { AboutSection } from '@/components/sections/about-section';
import { HeroSection } from '@/components/sections/hero-section';
import { NarrativeBridge } from '@/components/sections/narrative-bridge';
import { PortfolioSection } from '@/components/sections/portfolio-section';
import { ServicesSection } from '@/components/sections/services-section';
import { WorkshopsSection } from '@/components/sections/workshops-section';

export default function HomePage() {
  return (
    <>
      <HeroSection locale="en" />
      <NarrativeBridge locale="en" />
      <ServicesSection locale="en" />
      <PortfolioSection locale="en" />
      <WorkshopsSection locale="en" />
      <AboutSection locale="en" />
    </>
  );
}
