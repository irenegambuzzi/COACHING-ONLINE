# Armonia Online — Landing coaching

Pagina statica (`index.html`, nessuna build). Da configurare nell'oggetto `CONFIG` in fondo al file:

- `formEndpoint` — dove arriva il questionario (es. Formspree). Vuoto = modalità demo.
- `paymentLinks` — link di pagamento (es. Stripe Payment Links) per ogni percorso e durata.
- `reservioUrl`, `studioAddress` — prenotazione e indirizzo della nuova sede (Mirandola).
- `reservioBooking` — link Reservio a cui porta il tasto "Prenota" dopo il questionario, per percorso. Se `paymentLinks` è vuoto il pagamento avviene su Reservio.
- Colori: tutte le variabili in `:root` all'inizio del file.
- `whatsappUrl`, `privacyUrl`.

Flusso: scelta percorso → questionario (obbligatorio completo per Essenza) → pagamento → prenotazione su Reservio. Sinergia è il percorso evidenziato e consigliato.
Foto del team: sostituire i `<div class="ph">` con `<img>`.
