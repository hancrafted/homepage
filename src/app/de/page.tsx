import { AboutSection } from '@/components/sections/about-section';
import { HeroSection } from '@/components/sections/hero-section';
import { NarrativeBridge } from '@/components/sections/narrative-bridge';
import { PortfolioSection } from '@/components/sections/portfolio-section';
import { ServicesSection } from '@/components/sections/services-section';
import { WorkshopsSection } from '@/components/sections/workshops-section';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Han | Startup- & KMU-Berater — KI-Befähigung, Pitching & Vertrieb',
  description:
    'KI hat die Arbeit nicht abgeschafft. Sie hat sie verschoben. Strategische Beratung, Gründer-Coaching, KI-Enablement-Training, Pitch-Decks und Reverse-Funnel-Vertriebsmathematik.',
};

export default function GermanHomePage() {
  return (
    <>
      <HeroSection locale="de" />
      <NarrativeBridge locale="de" />
      <ServicesSection locale="de" />
      <PortfolioSection locale="de" />
      <WorkshopsSection locale="de" />
      <AboutSection locale="de" />
    </>
  );
}
