# Checklist conformità — Armonia Online

| Elemento | Presente nel progetto | Riferimento normativo | Dove / note |
|---|---|---|---|
| Partita IVA e dati societari nel footer | ☑ (da completare) | Art. 2250 Cod. Civ. / D.P.R. 633/72 | Footer di tutte le pagine: ragione sociale, sede legale, P.IVA/C.F. **Mancano n. REA, capitale sociale i.v. e PEC** (segnati con `TODO` in `index.html`). |
| Pagina Privacy Policy aggiornata | ☑ (bozza) | Art. 13 GDPR (UE 2016/679) | `privacy.html`: titolare, dati trattati (inclusi dati sanitari), basi giuridiche, fornitori (Google, Reservio, WhatsApp), trasferimenti extra-UE, conservazione, diritti. **Da far verificare a un consulente** e completare nome dell'app di allenamento, hosting e PEC. |
| Pagina Cookie Policy autonoma | ☑ | Dir. ePrivacy 2002/58/CE | `cookie.html`, separata dalla privacy, con tabella degli strumenti usati e link per riaprire le preferenze. |
| Banner Cookie con blocco preventivo dei Pixel | ☑ | Linee Guida Garante Privacy 2021 | `cookie-consent.js` su tutte le pagine: "Rifiuta" e "Accetta" con pari evidenza, X = rifiuto, scelta per categorie, durata 6 mesi, link "Preferenze cookie" nel footer. Gli script di tracciamento partono solo dopo il consenso se inseriti come `<script type="text/plain" data-cookie-category="marketing">` (istruzioni in `index.html`). Font ospitati in locale: nessuna connessione a Google al caricamento. |
| Checkbox Privacy sui Form (senza spunta preimpostata) | ☑ | Art. 7 GDPR | Questionario: presa visione informativa + maggiore età (obbligatoria), consenso esplicito dati sanitari art. 9 (obbligatoria), tutte non spuntate. I consensi e la versione dell'informativa vengono salvati nel Google Sheet con data e ora. |
| Consenso Marketing separato per Newsletter | ☑ | Linee Guida Marketing Garante Privacy | Casella facoltativa e distinta nel questionario, non spuntata; colonna "Consenso marketing" nel foglio per sapere a chi si può scrivere. |
| Certificato di Sicurezza SSL (HTTPS attivi) | ☐ lato hosting | Art. 32 GDPR | La pagina reindirizza a HTTPS e forza le risorse in HTTPS (`upgrade-insecure-requests`), ma **il certificato va attivato sull'hosting** (gratuito e automatico su Netlify, Vercel, GitHub Pages, Cloudflare; su Aruba/SiteGround va attivato Let's Encrypt dal pannello). |

## Da fare prima della pubblicazione
1. Completare REA, capitale sociale e PEC nel footer (`index.html`) e nella privacy.
2. Indicare in `privacy.html` il nome dell'app di allenamento e il fornitore di hosting.
3. Far rileggere `privacy.html` e `cookie.html` a un consulente privacy.
4. Attivare HTTPS sul dominio scelto.
5. Se si aggiunge Meta Pixel / Google Analytics: inserirli bloccati come indicato e aggiungerli alla tabella in `cookie.html`.
