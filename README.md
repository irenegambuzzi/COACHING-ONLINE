# Armonia Online — Landing coaching

Pagina statica (`index.html` + cartella `img/`, nessuna build). Grafica allineata a alelosciale.it:
sabbia `#EAE1CB`, bronzo `#9A5E20`, blu notte `#23374C`, titoli Bodoni Moda, testo Montserrat.
Tutti i colori sono variabili in `:root` all'inizio del file.

Da configurare nell'oggetto `CONFIG` in fondo al file:

- `formEndpoint` — dove arriva il questionario (es. Formspree). Vuoto = modalità demo.
- `paymentLinks` — link di pagamento (es. Stripe Payment Links) per percorso e durata. Vuoto (`{}`) = si paga su Reservio.
- `reservioBooking` — link Reservio del tasto "Prenota" dopo il questionario, per percorso (ora punta a `/services`).
- `reservioUrl`, `studioAddress`, `whatsappUrl`, `privacyUrl` — già compilati con i dati del sito.

Flusso: scelta percorso → questionario (completo e obbligatorio per Essenza) → pagamento → prenotazione su Reservio.
Sinergia è il percorso evidenziato e consigliato.
Foto del team: sostituire i `<div class="ph">` con `<img>`.
