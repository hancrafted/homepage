import { DeckTowerPage } from '@/components/deck-tower-page';
import { DECKS, getDeckBySlug } from '@/content/decks';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

export function generateStaticParams() {
  return DECKS.map((deck) => ({
    slug: deck.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const deck = getDeckBySlug(slug);
  if (!deck) return { title: 'Episode Nicht Gefunden' };

  return {
    title: `${deck.title.de} | Episode`,
    description: deck.subtitle.de,
  };
}

export default async function GermanEpisodePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const deck = getDeckBySlug(slug);

  if (!deck) {
    notFound();
  }

  return <DeckTowerPage deck={deck} locale="de" />;
}
