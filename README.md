# Armonia Online — Landing coaching

Pagina statica (`index.html`, nessuna build). Da configurare nell'oggetto `CONFIG` in fondo al file:

- `formEndpoint` — dove arriva il questionario (es. Formspree). Vuoto = modalità demo.
- `paymentLinks` — link di pagamento (es. Stripe Payment Links) per ogni percorso e durata.
- `reservioUrl`, `studioAddress` — prenotazione e indirizzo della nuova sede.
- `whatsappUrl`, `privacyUrl`.

Flusso: scelta percorso → questionario (obbligatorio completo per Essenza) → solo dopo l'invio compare il pulsante di pagamento.
Foto del team: sostituire i `<div class="ph">` con `<img>`.
