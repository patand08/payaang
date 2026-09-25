export const DEFAULT_THAI_FONT = 'Sarabun'

export const THAI_FONTS = [
  'Noto Sans Thai',
  'Sarabun',
  'Prompt',
  'Charm',
] as const

export type ThaiFont = (typeof THAI_FONTS)[number]
