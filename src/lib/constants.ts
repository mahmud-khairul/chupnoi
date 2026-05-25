export const CRIME_TYPES = [
  'Child sexual abuse',
  'Rape',
  'Gang rape',
  'Attempted rape',
  'Sexual molestation',
  'Child trafficking',
  'Murder (resulting from sexual assault)',
  'Other',
]

export const VICTIM_AGE_RANGES = [
  'Under 5 years',
  '5-10 years',
  '11-15 years',
  '16-17 years',
  '18+ years',
  'Unknown',
]

export const CONVICTION_STATUSES = [
  'Convicted (Court verdict delivered)',
  'Arrested (In police custody/jail)',
  'Charged (Case filed, awaiting trial)',
  'Accused (Suspected, not yet arrested)',
  'Absconded (Suspect at large)',
  'Released (Was convicted but released)',
  'Outside court settlement',
]

export const CURRENT_LOCATIONS = [
  'In jail/prison',
  'Out on bail',
  'Absconded/At large',
  'Released (sentence completed)',
  'Died',
  'Unknown',
]

export const KNOWLEDGE_SOURCES = [
  'Personal knowledge (family/friend affected)',
  'News media report',
  'NGO/Human rights organization',
  'Police records',
  'Court documents',
  'Social media',
  'Other',
]

export const TIERS = ['green', 'yellow', 'red'] as const
export type Tier = typeof TIERS[number]
