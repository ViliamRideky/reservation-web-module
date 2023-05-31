# Reservation Web Module

## Odovzdané súbory
- Priečinok `src`, kde sa nachádza celý modul
- `index.html`
- `package-lock.json`
- `package.json`

## Postup pri spustení
1. Najprv je potrebné spustiť príkaz `npm install` na inštaláciu všetkých potrebných závislostí pre spustenie aplikácie.

```bash
npm install
```


2. Po úspešnej inštalácii sa vytvorí priečinok `node_modules`. Jeho prítomnosť značí, že projekt je správne nakonfigurovaný a všetky potrebné závislosti boli nainštalované.

3. Príkazom `npm start` sa vykoná zostavenie (build) webového modulu a potom je možné modul prezrieť na localhoste. V procese sa vytvorí priečinok `dist`, kde sú uložené všetky súbory potrebné pre správne fungovanie modulu na webovej stránke. Tieto súbory sú označené ako `src.[hash].css` a `src.[hash].js`, kde `[hash]` je unikátny identifikátor, ktorý Parcel pridáva k názvu súboru počas jeho tvorby.

```bash
npm start
```

