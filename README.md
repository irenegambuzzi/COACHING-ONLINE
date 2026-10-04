# Armonia Online — Landing coaching

Pagina statica (`index.html` + cartella `img/`, nessuna build). Grafica allineata a alelosciale.it:
sabbia `#EAE1CB`, bronzo `#9A5E20`, blu notte `#23374C`, titoli Bodoni Moda, testo Montserrat.
Tutti i colori sono variabili in `:root` all'inizio del file.

## Flusso cliente
Scelta percorso (Sinergia in evidenza) → questionario (completo e obbligatorio per Essenza)
→ codice `ARM-XXXX` → prenotazione e pagamento su Reservio, con il codice nelle note.

## Questionari
Arrivano in un Google Sheet + email ad armonia.mirandola@gmail.com tramite Google Apps Script.
Installazione in 5 minuti: [`google-apps-script/ISTRUZIONI.md`](google-apps-script/ISTRUZIONI.md).

## Configurazione (`CONFIG` in fondo a `index.html`)
- `formEndpoint` — URL della Web App Google. Vuoto = modalità demo (non invia nulla).
- `reservioBooking` — link Reservio per percorso. Ora tutti al Reservio generale di Armonia;
  da aggiornare quando Ale crea la "sede" dei percorsi online.
- `reservioUrl`, `studioAddress`, `whatsappUrl`, `privacyUrl` — dati del sito attuale.
