import { type SlideData } from '@/content/decks/types';
import { type LocaleCode } from '@/lib/preferences';
import {
  AttentionSpanVisual,
  BugFixStepsVisual,
  CompoundingCurveVisual,
  LeadManyVisual,
  LostMiddleVisual,
} from './deck-visuals/context-visuals';
import {
  DefaultContrastVisual,
  FreelancerContrastVisual,
  InvoiceContrastVisual,
  VerificationInversionVisual,
} from './deck-visuals/contrast-visuals';
import {
  DefaultFlowVisual,
  FourErasFlowVisual,
  TieredStackFlowVisual,
  VerificationTiersFlowVisual,
} from './deck-visuals/flow-visuals';
import {
  DeterministicCoreVisual,
  DriftCurveVisual,
  LiveDemoTerminalVisual,
  OkfSchemaVisual,
  RoadmapVisual,
  VerificationBoundariesVisual,
} from './deck-visuals/harness-visuals';
import {
  BootTaxHierarchyVisual,
  ContextTypesHierarchyVisual,
  DefaultHierarchyVisual,
} from './deck-visuals/hierarchy-visuals';
import {
  CostSpreadMetricVisual,
  DefaultMetricVisual,
  OutcomePerEuroVisual,
  SmartZoneMetricVisual,
} from './deck-visuals/metric-visuals';
import {
  CloserVisual,
  ContextCapacityVisual,
  ObscurityVisual,
  OperationalPlaybookVisual,
} from './deck-visuals/playbook-visuals';

function resolveAiTokenPart1(num: number, locale: LocaleCode) {
  switch (num) {
    case 2:
      return <FreelancerContrastVisual locale={locale} />;
    case 3:
      return <LeadManyVisual locale={locale} />;
    case 4:
      return <FourErasFlowVisual />;
    case 5:
      return <InvoiceContrastVisual locale={locale} />;
    case 6:
      return <OutcomePerEuroVisual locale={locale} />;
    case 7:
      return <CostSpreadMetricVisual locale={locale} />;
    case 8:
      return <BootTaxHierarchyVisual locale={locale} />;
    case 9:
      return <ObscurityVisual locale={locale} />;
    case 10:
      return <AttentionSpanVisual locale={locale} />;
    default:
      return null;
  }
}

function resolveAiTokenPart2(num: number, locale: LocaleCode) {
  switch (num) {
    case 11:
      return <LostMiddleVisual locale={locale} />;
    case 12:
      return <SmartZoneMetricVisual locale={locale} />;
    case 13:
      return <BugFixStepsVisual locale={locale} />;
    case 14:
      return <CompoundingCurveVisual locale={locale} />;
    case 15:
      return <TieredStackFlowVisual />;
    case 16:
      return <OperationalPlaybookVisual locale={locale} />;
    case 17:
      return <ContextCapacityVisual locale={locale} />;
    case 18:
      return <CloserVisual locale={locale} />;
    default:
      return null;
  }
}

function resolveMaintainMarkdownPart1(num: number, locale: LocaleCode) {
  switch (num) {
    case 2:
      return <ContextTypesHierarchyVisual locale={locale} />;
    case 3:
      return <DriftCurveVisual locale={locale} />;
    case 4:
      return <VerificationTiersFlowVisual />;
    case 5:
    case 6:
    case 7:
      return <VerificationBoundariesVisual locale={locale} />;
    default:
      return null;
  }
}

function resolveMaintainMarkdownPart2(num: number, locale: LocaleCode) {
  switch (num) {
    case 8:
      return <OkfSchemaVisual locale={locale} />;
    case 9:
    case 10:
      return <DeterministicCoreVisual locale={locale} />;
    case 11:
      return <LiveDemoTerminalVisual locale={locale} />;
    case 12:
      return <RoadmapVisual locale={locale} />;
    case 13:
      return <VerificationInversionVisual locale={locale} />;
    default:
      return null;
  }
}

function resolveMaintainMarkdown(num: number, locale: LocaleCode) {
  const p1 = resolveMaintainMarkdownPart1(num, locale);
  if (p1) return p1;
  return resolveMaintainMarkdownPart2(num, locale);
}

function resolveFallbackVisual(slide: SlideData, locale: LocaleCode) {
  switch (slide.visualType) {
    case 'contrast':
      return <DefaultContrastVisual locale={locale} />;
    case 'metric':
      return <DefaultMetricVisual slide={slide} locale={locale} />;
    case 'hierarchy':
      return <DefaultHierarchyVisual slide={slide} locale={locale} />;
    default:
      return <DefaultFlowVisual locale={locale} />;
  }
}

export function DeckVisual({ deckSlug, slide, locale }: { deckSlug?: string; slide: SlideData; locale: LocaleCode }) {
  if (deckSlug === 'ai-token-economy') {
    const p1 = resolveAiTokenPart1(slide.number, locale);
    if (p1) return p1;
    const p2 = resolveAiTokenPart2(slide.number, locale);
    if (p2) return p2;
  }

  if (deckSlug === 'maintain-markdown-for-ai') {
    const md = resolveMaintainMarkdown(slide.number, locale);
    if (md) return md;
  }

  return resolveFallbackVisual(slide, locale);
}
