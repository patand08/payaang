# Páyaang

Páyaang (พยางค์, “syllable”) is a Thai reading trainer. You get a random syllable, tap it to check the answer, and mark yourself right or wrong.

Fifty items wins. Three misses ends the game.

<img width="565" height="687" alt="image" src="https://github.com/user-attachments/assets/004996ef-1791-435a-9b98-15e23f1080ee" />

## How it works

Each syllable is built from a starting consonant, a vowel, an optional tone mark, and an optional final. The answer shows Paiboon romanization, IPA, consonant class, and the spoken tone.

<img width="566" height="685" alt="image" src="https://github.com/user-attachments/assets/a12734b5-f1bb-4b2f-b384-9dbe5c77cbe2" />

**Options before you start**

- **Allow tone marks** — include ่ ้ ๊ ๋ (half the time there is no mark)
- **Allow different fonts** — rotate Thai typefaces; off uses Sarabun
- **Consonant only** — quiz letter names and class instead of full syllables

<img width="559" height="689" alt="image" src="https://github.com/user-attachments/assets/0e478042-263b-470d-8a0a-a37376448835" />

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
