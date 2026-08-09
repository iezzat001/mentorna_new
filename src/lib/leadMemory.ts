/**
 * Remembers a visitor who already gave us their contact details, so we never
 * ask the same person twice across the episode series.
 *
 * Stored in localStorage, which is per browser. Someone who opens episode 1 in
 * the Instagram in-app browser and episode 2 in Safari will be asked again.
 * Solving that properly needs accounts, which is far too much friction for a
 * free canvas, so this is a deliberate trade-off.
 */

const KEY = 'mentorna_lead_v1';

export type ContactMethod = 'email' | 'whatsapp';

export type Enrichment = {
  /** Which stage the founder says they're at */
  stage?: string;
  /** Their biggest current blocker */
  blocker?: string;
};

export type LeadMemory = {
  contactMethod: ContactMethod;
  contactValue: string;
  capturedAt: string;
  /** Episode numbers whose canvas they've collected */
  downloaded: number[];
  enrichment?: Enrichment;
};

const isBrowser = () => typeof window !== 'undefined' && !!window.localStorage;

export function getLead(): LeadMemory | null {
  if (!isBrowser()) return null;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as LeadMemory;
    if (!parsed?.contactValue || !parsed?.contactMethod) return null;
    return { ...parsed, downloaded: parsed.downloaded ?? [] };
  } catch {
    return null;
  }
}

function write(lead: LeadMemory) {
  if (!isBrowser()) return;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(lead));
  } catch {
    /* storage full or blocked, recognition simply won't persist */
  }
}

/** Called after a first successful capture */
export function saveLead(
  contactMethod: ContactMethod,
  contactValue: string,
  episodeNumber: number
): LeadMemory {
  const lead: LeadMemory = {
    contactMethod,
    contactValue: contactValue.trim(),
    capturedAt: new Date().toISOString(),
    downloaded: [episodeNumber],
  };
  write(lead);
  return lead;
}

/** Records that this visitor collected another episode's canvas */
export function addDownload(episodeNumber: number): LeadMemory | null {
  const lead = getLead();
  if (!lead) return null;
  if (!lead.downloaded.includes(episodeNumber)) {
    lead.downloaded = [...lead.downloaded, episodeNumber].sort((a, b) => a - b);
    write(lead);
  }
  return lead;
}

export function saveEnrichment(patch: Enrichment): LeadMemory | null {
  const lead = getLead();
  if (!lead) return null;
  lead.enrichment = { ...(lead.enrichment ?? {}), ...patch };
  write(lead);
  return lead;
}

/** "Not you?" escape hatch, e.g. a shared device */
export function clearLead() {
  if (!isBrowser()) return;
  try {
    window.localStorage.removeItem(KEY);
  } catch {
    /* ignore */
  }
}

export const hasDownloaded = (lead: LeadMemory | null, n: number) =>
  !!lead?.downloaded.includes(n);

/**
 * Occasional enrichment: after they've collected a few canvases, ask ONE
 * optional question. Never asks for something already answered, and never
 * blocks the download.
 */
export type EnrichmentQuestion = {
  field: keyof Enrichment;
  question: string;
  options: string[];
};

export const ENRICHMENT_QUESTIONS: EnrichmentQuestion[] = [
  {
    field: 'stage',
    question: 'أنت دلوقتي في أنهي مرحلة؟',
    options: [
      'لسه بدور على فكرة',
      'عندي فكرة ومحتاج أتأكد منها',
      'بنيت نسخة أولى (Prototype)',
      'عندي عملاء فعلاً',
    ],
  },
  {
    field: 'blocker',
    question: 'إيه أكبر حاجة واقفة قدامك دلوقتي؟',
    options: ['مش عارف أبدأ منين', 'الوقت', 'الجانب التقني', 'إيجاد عملاء', 'التمويل'],
  },
];

/**
 * Returns a question to ask, or null. Asks on the 2nd collected canvas onward,
 * one question at a time, skipping anything already answered.
 */
export function nextEnrichmentQuestion(lead: LeadMemory | null): EnrichmentQuestion | null {
  if (!lead) return null;
  if (lead.downloaded.length < 2) return null;
  return ENRICHMENT_QUESTIONS.find((q) => !lead.enrichment?.[q.field]) ?? null;
}
