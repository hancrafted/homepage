import { AboutSection } from '@/components/sections/about-section';
import { HeroSection } from '@/components/sections/hero-section';
import { PortfolioSection } from '@/components/sections/portfolio-section';
import { ServicesSection } from '@/components/sections/services-section';
import { WorkshopsSection } from '@/components/sections/workshops-section';

export default function HomePage() {
  return (
    <>
      <HeroSection locale="en" />
      <ServicesSection locale="en" />
      <WorkshopsSection locale="en" />
      <PortfolioSection locale="en" />
      <AboutSection locale="en" />
    </>
  );
}
