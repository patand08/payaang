import type { Consonant, ConsonantClass, FinalSound } from './types.ts'

function letter(
  thai: string,
  consonantClass: ConsonantClass,
  nameThai: string,
  nameRoman: string,
  nameIpa: string,
  initialIpa: string,
  initialRoman: string,
  finalSound: FinalSound | null,
): Consonant {
  return {
    thai,
    class: consonantClass,
    nameThai,
    nameRoman,
    nameIpa,
    initialIpa,
    initialRoman,
    canBeInitial: true,
    canBeFinal: finalSound !== null,
    finalSound,
  }
}

export const CONSONANTS: readonly Consonant[] = [
  letter('ก', 'mid', 'กอ ไก่', 'ko kai', 'kɔː kàj', 'k', 'k', 'k'),
  letter('ข', 'high', 'ขอ ไข่', 'kho khai', 'kʰɔː kʰàj', 'kʰ', 'kh', 'k'),
  letter('ฃ', 'high', 'ขอ ขวด', 'kho khuat', 'kʰɔː kʰùat', 'kʰ', 'kh', 'k'),
  letter('ค', 'low', 'คอ ควาย', 'kho khwai', 'kʰɔː kʰwaːj', 'kʰ', 'kh', 'k'),
  letter('ฅ', 'low', 'คอ คน', 'kho khon', 'kʰɔː kʰon', 'kʰ', 'kh', 'k'),
  letter('ฆ', 'low', 'ฆอ ระฆัง', 'kho rakhang', 'kʰɔː rá.kʰaŋ', 'kʰ', 'kh', 'k'),
  letter('ง', 'low', 'งอ งู', 'ngo ngu', 'ŋɔː ŋuː', 'ŋ', 'ng', 'ng'),
  letter('จ', 'mid', 'จอ จาน', 'cho chan', 'tɕɔː tɕaːn', 'tɕ', 'j', 't'),
  letter('ฉ', 'high', 'ฉอ ฉิ่ง', 'cho ching', 'tɕʰɔː tɕʰìŋ', 'tɕʰ', 'ch', null),
  letter('ช', 'low', 'ชอ ช้าง', 'cho chang', 'tɕʰɔː tɕʰáːŋ', 'tɕʰ', 'ch', 't'),
  letter('ซ', 'low', 'ซอ โซ่', 'so so', 'sɔː sôː', 's', 's', 't'),
  letter('ฌ', 'low', 'ฌอ เฌอ', 'cho choe', 'tɕʰɔː tɕʰɤː', 'tɕʰ', 'ch', 't'),
  letter('ญ', 'low', 'ญอ หญิง', 'yo ying', 'jɔː jǐŋ', 'j', 'y', 'n'),
  letter('ฎ', 'mid', 'ฎอ ชฎา', 'do chada', 'dɔː tɕʰá.daː', 'd', 'd', 't'),
  letter('ฏ', 'mid', 'ฏอ ปฏัก', 'to patak', 'tɔː pà.tàk', 't', 't', 't'),
  letter('ฐ', 'high', 'ฐอ ฐาน', 'tho than', 'tʰɔː tʰǎːn', 'tʰ', 'th', 't'),
  letter('ฑ', 'low', 'ฑอ มณโฑ', 'tho montho', 'tʰɔː mon.tʰoː', 'tʰ', 'th', 't'),
  letter('ฒ', 'low', 'ฒอ ผู้เฒ่า', 'tho phuthao', 'tʰɔː pʰûː.tʰâw', 'tʰ', 'th', 't'),
  letter('ณ', 'low', 'ณอ เณร', 'no nen', 'nɔː neːn', 'n', 'n', 'n'),
  letter('ด', 'mid', 'ดอ เด็ก', 'do dek', 'dɔː dèk', 'd', 'd', 't'),
  letter('ต', 'mid', 'ตอ เต่า', 'to tao', 'tɔː tàw', 't', 't', 't'),
  letter('ถ', 'high', 'ถอ ถุง', 'tho thung', 'tʰɔː tʰǔŋ', 'tʰ', 'th', 't'),
  letter('ท', 'low', 'ทอ ทหาร', 'tho thahan', 'tʰɔː tʰá.hǎːn', 'tʰ', 'th', 't'),
  letter('ธ', 'low', 'ธอ ธง', 'tho thong', 'tʰɔː tʰoŋ', 'tʰ', 'th', 't'),
  letter('น', 'low', 'นอ หนู', 'no nu', 'nɔː nǔː', 'n', 'n', 'n'),
  letter('บ', 'mid', 'บอ ใบไม้', 'bo baimai', 'bɔː baj.máːj', 'b', 'b', 'p'),
  letter('ป', 'mid', 'ปอ ปลา', 'po pla', 'pɔː plaː', 'p', 'p', 'p'),
  letter('ผ', 'high', 'ผอ ผึ้ง', 'pho phueng', 'pʰɔː pʰɯ̂ŋ', 'pʰ', 'ph', null),
  letter('ฝ', 'high', 'ฝอ ฝา', 'fo fa', 'fɔː fǎː', 'f', 'f', null),
  letter('พ', 'low', 'พอ พาน', 'pho phan', 'pʰɔː pʰaːn', 'pʰ', 'ph', 'p'),
  letter('ฟ', 'low', 'ฟอ ฟัน', 'fo fan', 'fɔː fan', 'f', 'f', 'p'),
  letter('ภ', 'low', 'ภอ สำเภา', 'pho samphao', 'pʰɔː sǎm.pʰaw', 'pʰ', 'ph', 'p'),
  letter('ม', 'low', 'มอ ม้า', 'mo ma', 'mɔː máː', 'm', 'm', 'm'),
  letter('ย', 'low', 'ยอ ยักษ์', 'yo yak', 'jɔː ják', 'j', 'y', 'y'),
  letter('ร', 'low', 'รอ เรือ', 'ro ruea', 'rɔː rɯa', 'r', 'r', 'n'),
  letter('ล', 'low', 'ลอ ลิง', 'lo ling', 'lɔː liŋ', 'l', 'l', 'n'),
  letter('ว', 'low', 'วอ แหวน', 'wo waen', 'wɔː wɛ̌ːn', 'w', 'w', 'w'),
  letter('ศ', 'high', 'ศอ ศาลา', 'so sala', 'sɔː sǎː.laː', 's', 's', 't'),
  letter('ษ', 'high', 'ษอ ฤๅษี', 'so ruesi', 'sɔː rɯː.sǐː', 's', 's', 't'),
  letter('ส', 'high', 'สอ เสือ', 'so suea', 'sɔː sɯ̌a', 's', 's', 't'),
  letter('ห', 'high', 'หอ หีบ', 'ho hip', 'hɔː hìːp', 'h', 'h', null),
  letter('ฬ', 'low', 'ฬอ จุฬา', 'lo chula', 'lɔː tɕù.laː', 'l', 'l', 'n'),
  letter('อ', 'mid', 'ออ อ่าง', 'o ang', 'ʔɔː ʔàːŋ', 'ʔ', '', null),
  letter('ฮ', 'low', 'ฮอ นกฮูก', 'ho nokhuk', 'hɔː nók.hûːk', 'h', 'h', null),
]

export const INITIALS: readonly Consonant[] = CONSONANTS.filter(
  (consonant) => consonant.canBeInitial,
)

export const FINALS: readonly Consonant[] = CONSONANTS.filter(
  (consonant) => consonant.canBeFinal,
)

const BY_THAI = new Map(CONSONANTS.map((consonant) => [consonant.thai, consonant]))

export function getConsonant(thai: string): Consonant {
  const consonant = BY_THAI.get(thai)
  if (!consonant) {
    throw new Error(`Unknown consonant: ${thai}`)
  }
  return consonant
}
