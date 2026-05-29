export const CRIME_TYPES = [
  'শিশু যৌন নির্যাতন',
  'ধর্ষণ',
  'গণধর্ষণ',
  'ধর্ষণের চেষ্টা',
  'যৌন শ্লীলতাহানি',
  'শিশু পাচার',
  'হত্যাকাণ্ড (যৌন নির্যাতনের ফলে সৃষ্ট মৃত্যু)',
  'অন্যান্য',
]

export const CRIME_TYPES_EN = [
  'Child Sexual Abuse',
  'Rape',
  'Gang Rape',
  'Attempted Rape',
  'Sexual Harassment',
  'Child Trafficking',
  'Murder (Death resulting from sexual abuse)',
  'Other',
]

export const VICTIM_AGE_RANGES = [
  '৫ বছরের কম',
  '৫-১০ বছর',
  '১১-১৫ বছর',
  '১৬-১৭ বছর',
  '১৮+ বছর',
  'জানা নেই',
]

export const VICTIM_AGE_RANGES_EN = [
  'Under 5 years',
  '5–10 years',
  '11–15 years',
  '16–17 years',
  '18+ years',
  'Unknown',
]

export const CONVICTION_STATUSES = [
  'কোনো মামলা করা হয়নি',
  'দোষী সাব্যস্ত/দণ্ডপ্রাপ্ত (আদালতের রায় দেওয়া হয়েছে)',
  'গ্রেফতারকৃত (পুলিশি হেফাজতে বা জেলে আছেন)',
  'অভিযুক্ত (মামলা দায়ের করা হয়েছে, বিচার চলছে)',
  'সন্দেহভাজন (সন্দেহ করা হচ্ছে, কিন্তু এখনও গ্রেফতার হননি)',
  'পলাতক (সন্দেহভাজন ব্যক্তি পালিয়ে আছেন)',
  'মুক্ত/খালাসপ্রাপ্ত (দোষী সাব্যস্ত হয়েছিলেন কিন্তু বর্তমানে মুক্ত)',
  'আদালতের বাইরে মীমাংসা করা হয়েছে',
]

export const CONVICTION_STATUSES_EN = [
  'No case filed',
  'Convicted/Sentenced (court verdict delivered)',
  'Arrested (in police custody or prison)',
  'Charged (case filed, trial ongoing)',
  'Suspected (suspected but not yet arrested)',
  'Absconded (suspect is in hiding)',
  'Released/Acquitted (was convicted but currently free)',
  'Out-of-court settlement',
]

export const CURRENT_LOCATIONS = [
  'মুক্ত বা স্বাধীনভাবে ঘুরছেন',
  'জেলে বা কারাগারে আছেন',
  'জামিনে আছেন',
  'পলাতক',
  'খালাস বা মুক্ত (সাজার মেয়াদ শেষ)',
  'মৃত',
  'জানা নেই',
]

export const CURRENT_LOCATIONS_EN = [
  'Free / At large',
  'In jail or prison',
  'On bail',
  'Absconded',
  'Released (sentence served)',
  'Deceased',
  'Unknown',
]

export const KNOWLEDGE_SOURCES = [
  'ব্যক্তিগতভাবে জানি (পরিবার বা বন্ধু ক্ষতিগ্রস্ত হয়েছে)',
  'সংবাদ মাধ্যম বা পত্রিকার খবর',
  'এনজিও (NGO) বা মানবাধিকার সংস্থা',
  'পুলিশের রেকর্ড বা নথি',
  'আদালতের নথিপত্র',
  'সোশ্যাল মিডিয়া (ফেসবুক/অন্যান্য)',
  'অন্যান্য',
]

export const KNOWLEDGE_SOURCES_EN = [
  'Personally know (family or friend affected)',
  'News media or newspaper report',
  'NGO or human rights organization',
  'Police records or documents',
  'Court documents',
  'Social media (Facebook/others)',
  'Other',
]

export const TIERS = ['green', 'yellow', 'red'] as const
export type Tier = typeof TIERS[number]
