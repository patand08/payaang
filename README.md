# Páyaang

Páyaang (พยางค์, “syllable”) is a Thai reading trainer. You get a random syllable, tap it to check the answer, and mark yourself right or wrong.

Fifty items wins. Three misses ends the game.

## How it works

Each syllable is built from a starting consonant, a vowel, an optional tone mark, and an optional final. The answer shows Paiboon romanization, IPA, consonant class, and the spoken tone.

**Options before you start**

- **Allow tone marks** — include ่ ้ ๊ ๋ (half the time there is no mark)
- **Allow different fonts** — rotate Thai typefaces; off uses Sarabun
- **Consonant only** — quiz letter names and class instead of full syllables

## Run

```bash
npm i
npm run dev
```

```bash
npm test          # Vitest
npm run build     # production web build
npm run cap:sync  # build + Capacitor sync
```

Android is set up with Capacitor (`com.payaang.app`). After `cap:sync`, open the project in Android Studio or run it on a device.
