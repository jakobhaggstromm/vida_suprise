# Får jag chans på dig?

En liten statisk sida — ett kort, en fråga, två knappar.

## Filer

- `index.html` — sidan.
- `styles.css` — allt utseende.
- `script.js` — "Nej"-knappen som glider undan, och svaret på "Ja".
- `assets/dusk.jpg` — bilden i kortet.
- `assets/dusk-blur.jpg` — samma bild, liten och suddig, som bakgrund.
- `assets/hero.png` — originalbilden som `dusk.jpg` är beskuren ur. Behövs inte
  av sidan och kan tas bort.

## Byta bild

Lägg din egen bild som `assets/dusk.jpg` (liggande, gärna ca 1200×615). Vill du
att bakgrunden ska matcha, gör en liten suddig kopia och spara som
`assets/dusk-blur.jpg`.

## Mejl när hon trycker ja

`script.js` postar en notis till [FormSubmit](https://formsubmit.co) när "Ja"
klickas. FormSubmit kräver inget konto, men adressen måste aktiveras en gång:

1. Öppna sidan och tryck **Ja**.
2. Du får ett mejl från FormSubmit med en aktiveringslänk — klicka den.
3. Därefter landar varje "ja" i inkorgen.

Aktiveringsmejlet innehåller också ett slumpat alias
(`https://formsubmit.co/ajax/xxxxxxxx`). Byt ut adressen i `NOTIFY_ENDPOINT`
mot aliaset — annars ligger mejladressen läsbar i `script.js` för vem som helst
som tittar i källkoden.

Sidan sparar ett flag i `localStorage` så att en omladdning inte skickar fler
mejl. Blockeras `fetch` (adblock, ingen uppkoppling) syns inget för henne —
svaret visas ändå.

## Publicera på GitHub Pages

1. Pusha repo:t till GitHub.
2. `Settings` → `Pages`.
3. Under `Build and deployment`: `Deploy from a branch`.
4. Branch `main`, folder `/root`. Spara.
